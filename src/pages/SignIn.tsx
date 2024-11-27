import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { useToast } from '@/components/ui/use-toast';

export default function SignIn() {
  const { signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign in with Google",
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
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
          
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-100 text-black py-6 flex items-center justify-center gap-3 transition-all duration-300"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-white/60">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}