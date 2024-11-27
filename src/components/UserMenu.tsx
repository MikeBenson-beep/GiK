import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function UserMenu() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on the landing page
  if (!user || location.pathname === '/') return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={handleSignOut}
        variant="ghost"
        className="text-white hover:bg-white/10 gap-2"
      >
        <span className="text-sm">Sign Out</span>
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
} 