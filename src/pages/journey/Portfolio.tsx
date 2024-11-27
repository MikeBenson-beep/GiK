import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { PortfolioManager } from '@/components/PortfolioManager';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const navigate = useNavigate();

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

          <PortfolioManager />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <Button
              onClick={() => navigate('/journey/risk')}
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