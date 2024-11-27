import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { PortfolioManager } from '@/components/PortfolioManager';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from '@/services/ProfileService';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

export default function Portfolio() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('portfolio')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        if (data?.portfolio) {
          setPortfolioItems(data.portfolio);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        toast({
          title: "Error",
          description: "Failed to load your portfolio. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [user, toast]);

  const handlePortfolioUpdate = async () => {
    try {
      if (!user) throw new Error('No user found');
      
      await updateProfile(user.id, {
        portfolio: portfolioItems
      });
      
      navigate('/journey/risk');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save portfolio. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-white/60">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <Logo />
      </div>

      <div className="relative min-h-screen pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Your Portfolio</h1>
            <p className="text-lg text-gray-400">Let's start by understanding your current investments</p>
          </motion.div>

          <PortfolioManager 
            initialAssets={portfolioItems} 
            onUpdate={setPortfolioItems} 
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <Button
              onClick={handlePortfolioUpdate}
              className="group relative px-8 py-6 bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
            >
              <span className="flex items-center">
                Continue to Risk Assessment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}