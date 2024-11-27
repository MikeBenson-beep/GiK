import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { JourneyProgress } from '@/components/JourneyProgress';
import { CustomOption } from '@/components/CustomOption';

const riskLevels = [
  {
    id: 'conservative',
    title: 'Conservative',
    description: 'Prioritize capital preservation with steady, modest returns',
    expectedReturn: '4-6%',
    volatility: 'Low',
  },
  {
    id: 'moderate',
    title: 'Moderate',
    description: 'Balance between growth and stability',
    expectedReturn: '6-8%',
    volatility: 'Medium',
  },
  {
    id: 'aggressive',
    title: 'Aggressive',
    description: 'Maximize potential returns with higher risk tolerance',
    expectedReturn: '8-12%',
    volatility: 'High',
  },
  {
    id: 'very-aggressive',
    title: 'Very Aggressive',
    description: 'Seek maximum growth potential with significant volatility',
    expectedReturn: '12%+',
    volatility: 'Very High',
  },
];

export default function RiskTolerance() {
  const navigate = useNavigate();
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  const handleCustomOption = (value: string) => {
    setSelectedRisk(value);
  };

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
            <h1 className="text-4xl font-bold mb-4">Risk Tolerance</h1>
            <p className="text-lg text-gray-400">Select your preferred investment risk level</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {riskLevels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card
                  className={`relative p-6 h-full cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 border-white/10 ${
                    selectedRisk === level.id ? 'border-blue-500/50 bg-white/10' : ''
                  }`}
                  onClick={() => setSelectedRisk(level.id)}
                >
                  <h3 className="text-xl font-semibold mb-2 text-white">{level.title}</h3>
                  <p className="text-gray-400 mb-4">{level.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Expected Return: <span className="text-white">{level.expectedReturn}</span></span>
                    <span className="text-gray-400">Volatility: <span className="text-white">{level.volatility}</span></span>
                  </div>
                  {selectedRisk === level.id && (
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
              <CustomOption onSelect={handleCustomOption} placeholder="Different risk profile?" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => navigate('/journey/objectives')}
              disabled={!selectedRisk}
              className="group relative px-8 py-6 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center">
                Continue to Investment Goals
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}