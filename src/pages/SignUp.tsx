import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const { signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  const handleGoogleSignUp = async () => {
    try {
      if (!nickname.trim()) {
        toast({
          title: "Nickname Required",
          description: "Please enter a nickname to continue.",
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem('userNickname', nickname);
      await signInWithGoogle();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign up with Google",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Logo />
        </div>

        <div className="bg-white/5 p-8 rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
          
          <div className="space-y-6">
            <Input
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />

            <Button
              onClick={handleGoogleSignUp}
              className="w-full bg-white hover:bg-gray-100 text-black py-6 flex items-center justify-center gap-3 transition-all duration-300"
            >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-white/60 text-sm">Already have an account? </span>
            <Button
              variant="link"
              onClick={() => navigate('/signin')}
              className="text-white hover:text-white/90"
            >
              Sign In
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-white/60">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}