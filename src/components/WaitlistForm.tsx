import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('mails')
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: "Welcome aboard!",
        description: "You're now on the waitlist for early access.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white/90 text-base font-bold tracking-wide uppercase"
      >
        Join Exclusive Waitlist
      </motion.div>
      
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto"
      >
        <div className="group relative">
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/5 rounded-2xl" />
            
            <div className="relative flex items-center">
              <div className="flex-grow relative group">
                <div className="absolute left-0 w-[2px] h-full bg-white/20" />
                <input
                  type="email"
                  placeholder="Enter your email for early access"
                  className="w-full pl-6 pr-4 py-6 bg-transparent 
                           text-white font-semibold placeholder:text-white/60
                           transition-all duration-300
                           focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={isLoading}
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/20 
                              group-hover:bg-white/40 transition-colors duration-300" />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative px-6 py-6 ml-2"
              >
                <ArrowRight className={`w-6 h-6 transition-all duration-500 ${isLoading ? 'opacity-50' : 'text-white group-hover:translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Animated corners - now always visible */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white/20 rounded-tl" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white/20 rounded-tr" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-white/20 rounded-bl" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white/20 rounded-br" />
        </div>
      </motion.form>
    </div>
  );
}