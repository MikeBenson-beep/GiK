import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const createUserProfile = async (user: any) => {
      try {
        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        if (!existingProfile) {
          // Create new profile if it doesn't exist
          const { error } = await supabase
            .from('profiles')
            .insert([
              {
                id: user.id,
                email: user.email,
                name: user.user_metadata.full_name || user.email?.split('@')[0],
                portfolio: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }
            ]);

          if (error) throw error;
        }

        // Redirect to journey page after profile is created/verified
        navigate('/journey');
      } catch (error) {
        console.error('Error in createUserProfile:', error);
        navigate('/');
      }
    };

    // Handle the OAuth callback
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          await createUserProfile(session.user);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error in handleCallback:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg text-white/60">Setting up your account...</p>
      </div>
    </div>
  );
}