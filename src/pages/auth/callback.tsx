import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const createUserProfile = async (user: any) => {
      try {
        // First check if profile exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id, completed_journey')
          .eq('id', user.id)
          .single();

        if (existingProfile) {
          // If profile exists and journey is completed, go to landing
          if (existingProfile.completed_journey) {
            navigate('/');
            return;
          }
          // If profile exists but journey not completed, continue to journey
          navigate('/journey');
          return;
        }

        // Profile doesn't exist, create new profile
        const userNickname = localStorage.getItem('userNickname');
        if (!userNickname) {
          navigate('/signup');
          return;
        }

        const nickname = localStorage.getItem('userNickname') || user.email?.split('@')[0];
        
        const { error } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              name: nickname,
              portfolio: [],
              completed_journey: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          ]);

        if (error && error.code !== '23505') { // Ignore duplicate key errors
          throw error;
        }

        // Clean up localStorage
        localStorage.removeItem('userNickname');

        // New user, redirect to journey
        navigate('/journey');
      } catch (error) {
        console.error('Error in createUserProfile:', error);
        navigate('/');
      }
    };

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