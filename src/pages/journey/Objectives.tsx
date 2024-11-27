import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const objectives = [
  {
    id: 'wealth-growth',
    title: 'Wealth Growth',
    description: 'Focus on long-term capital appreciation',
  },
  {
    id: 'retirement',
    title: 'Retirement Planning',
    description: 'Build a secure retirement nest egg',
  },
  {
    id: 'passive-income',
    title: 'Passive Income',
    description: 'Generate regular income from investments',
  },
  {
    id: 'specific-goal',
    title: 'Specific Goal',
    description: 'Save for a specific financial objective',
  },
];

export default function Objectives() {
  const navigate = useNavigate();
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);

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
            <h1 className="text-4xl font-bold mb-4">Investment Goals</h1>
            <p className="text-lg text-gray-400">What are you looking to achieve with your investments?</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {objectives.map((objective, index) => (
              <motion.div
                key={objective.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`relative p-6 cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 border-white/10 ${
                    selectedObjective === objective.id ? 'border-blue-500/50 bg-white/10' : ''
                  }`}
                  onClick={() => setSelectedObjective(objective.id)}
                >
                  <h3 className="text-xl font-semibold mb-2 text-white">{objective.title}</h3>
                  <p className="text-white/60">{objective.description}</p>
                  {selectedObjective === objective.id && (
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
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => navigate('/journey/timeline')}
              disabled={!selectedObjective}
              className="group relative px-8 py-6 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center">
                Continue to Time Horizon
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}