import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function SignOutButton() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          setDisplayName(data.name);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Only show on landing page when user is logged in
  if (!user || location.pathname !== '/') return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2">
      <span className="text-sm font-medium text-white/80 tracking-wide px-4 backdrop-blur-sm bg-white/5 py-1 rounded-full text-center min-w-[120px]">
        {displayName}
      </span>
      <Button
        onClick={handleSignOut}
        variant="ghost"
        className="group relative px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-full transition-all duration-300"
      >
        <div className="relative flex items-center gap-3">
          <span className="text-sm font-medium text-white/90 group-hover:text-white tracking-wide transition-colors">
            Sign Out
          </span>
          <LogOut className="w-4 h-4 text-white/90 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
    </div>
  );
} 