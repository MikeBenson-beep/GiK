import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const location = useLocation();

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

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
      <span className="text-sm font-medium text-white/80 tracking-wide px-4 backdrop-blur-sm bg-white/5 py-1 rounded-full">
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