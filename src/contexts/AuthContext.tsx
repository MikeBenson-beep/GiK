import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const registerUserProfile = async (user: User) => {
    try {
      console.log('Attempting to register user profile:', {
        id: user.id,
        email: user.email,
        metadata: user.user_metadata
      });

      // First, check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        console.error('Error checking existing profile:', fetchError);
      }

      if (!existingProfile) {
        console.log('No existing profile found, creating new profile');
        const { data, error } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              name: user.user_metadata.full_name,
              portfolio: [],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          ])
          .select()
          .single();

        if (error) {
          console.error('Error inserting new profile:', error);
          throw error;
        }

        console.log('Successfully created new profile:', data);
      } else {
        console.log('Existing profile found, updating profile');
        const { data, error } = await supabase
          .from('profiles')
          .update({
            email: user.email,
            name: user.user_metadata.full_name,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id)
          .select();

        if (error) {
          console.error('Error updating profile:', error);
          throw error;
        }

        console.log('Successfully updated profile:', data);
      }
    } catch (error) {
      console.error('Error in registerUserProfile:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          return;
        }

        if (session?.user) {
          console.log('Session found, setting user:', session.user);
          setUser(session.user);
          await registerUserProfile(session.user);
        } else {
          console.log('No session found');
          setUser(null);
        }
      } catch (error) {
        console.error('Error in initializeAuth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user);
      
      if (session?.user) {
        setUser(session.user);
        try {
          await registerUserProfile(session.user);
        } catch (error) {
          console.error('Error registering user profile on auth change:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('Initiating Google sign in');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Error signing in with Google:', error);
        throw error;
      }

      console.log('Google sign in initiated:', data);
    } catch (error) {
      console.error('Error in signInWithGoogle:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}