import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function SignUpButton() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={() => navigate('/auth')}
        className="bg-white text-black hover:bg-white/90 font-semibold"
      >
        Sign Up
      </Button>
    </div>
  );
} 