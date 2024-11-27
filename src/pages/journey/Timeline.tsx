import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { JourneyProgress } from '@/components/JourneyProgress';
import { CustomOption } from '@/components/CustomOption';
import { JourneySummary } from '@/components/JourneySummary';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { updateProfile } from '@/services/ProfileService';

const timeframes = [
  {
    id: 'short-term',
    title: 'Short Term',
    description: '1-3 years',
    details: 'Quick access to funds with lower risk exposure',
  },
  {
    id: 'medium-term',
    title: 'Medium Term',
    description: '3-7 years',
    details: 'Balanced approach for moderate growth',
  },
  {
    id: 'long-term',
    title: 'Long Term',
    description: '7-15 years',
    details: 'Extended growth period with higher return potential',
  },
  {
    id: 'very-long-term',
    title: 'Very Long Term',
    description: '15+ years',
    details: 'Maximum growth potential over extended period',
  },
];

export default function Timeline() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleTimelineSelection = async () => {
    try {
      if (!user || !selectedTimeframe) throw new Error('No user or timeframe selected');
      
      await updateProfile(user.id, {
        time_horizon: selectedTimeframe
      });
      
      setShowSummary(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save timeline. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCustomOption = (value: string) => {
    setSelectedTimeframe(value);
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <Logo />
        </div>

        <div className="relative min-h-screen pt-32 pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold mb-4">Journey Complete</h1>
              <p className="text-lg text-gray-400">Here's a summary of your preferences</p>
            </motion.div>

            <JourneySummary
              portfolio={['AAPL - 100 shares', 'GOOGL - 50 shares']}
              riskLevel="Aggressive"
              objective="Wealth Growth"
              timeline={selectedTimeframe || ''}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mt-12"
            >
              <Button
                onClick={() => navigate('/')}
                className="group relative px-8 py-6 bg-white text-black hover:bg-gray-100 transition-all duration-300"
              >
                <span className="flex items-center">
                  Return to Home
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <Logo />
      </div>

      <JourneyProgress />

      <div className="relative min-h-screen pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Investment Timeline</h1>
            <p className="text-lg text-gray-400">How long do you plan to keep your investments?</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {timeframes.map((timeframe, index) => (
              <motion.div
                key={timeframe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card
                  className={`relative p-6 h-full cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 border-white/10 ${
                    selectedTimeframe === timeframe.id ? 'border-blue-500/50 bg-white/10' : ''
                  }`}
                  onClick={() => setSelectedTimeframe(timeframe.id)}
                >
                  <h3 className="text-xl font-semibold mb-2 text-white">{timeframe.title}</h3>
                  <p className="text-blue-400 font-mono mb-2">{timeframe.description}</p>
                  <p className="text-gray-400">{timeframe.details}</p>
                  {selectedTimeframe === timeframe.id && (
                    <motion.div
                      layoutId="selected-border"
                      className="absolute inset-0 border-2 border-blue-500/50 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Card>
              </motion.div>
            ))}
            <div className="md:col-span-2">
              <CustomOption onSelect={handleCustomOption} placeholder="Different timeline?" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Button
              onClick={handleTimelineSelection}
              disabled={!selectedTimeframe}
              className="group relative px-8 py-6 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center">
                Complete Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}