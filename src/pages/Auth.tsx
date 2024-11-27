import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="relative z-10 space-y-12 text-center">
        <Logo />
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Begin Your Journey</h1>
          <p className="text-white/60 max-w-md mx-auto">
            Join us to start building your personalized investment strategy combining traditional wisdom with quantum innovation.
          </p>
        </div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => navigate('/signup')}
            className="w-64 h-12 bg-white text-black hover:bg-white/90"
          >
            Create Account
          </Button>
          
          <div className="flex items-center gap-2 justify-center">
            <span className="text-white/60">Already have an account?</span>
            <Button
              variant="link"
              onClick={() => navigate('/signin')}
              className="text-white hover:text-white/90"
            >
              Sign In
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 