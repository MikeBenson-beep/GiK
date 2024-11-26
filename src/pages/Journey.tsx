import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChartBar, Shield, Target, Clock } from 'lucide-react';
import Logo from '@/components/Logo';

const steps = [
  {
    icon: ChartBar,
    title: 'Portfolio Setup',
    description: 'Tell us about your current investments',
    path: '/journey/portfolio'
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Define your risk tolerance level',
    path: '/journey/risk'
  },
  {
    icon: Target,
    title: 'Investment Goals',
    description: 'Share your financial objectives',
    path: '/journey/objectives'
  },
  {
    icon: Clock,
    title: 'Time Horizon',
    description: 'Set your investment timeline',
    path: '/journey/timeline'
  }
];

export default function Journey() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <Logo />
      </div>

      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4 text-white">Your Investment Journey</h1>
            <p className="text-lg text-gray-400">Complete these steps to receive your personalized strategy</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(step.path)}
                className="group relative p-6 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                <div className="relative flex items-start gap-4">
                  <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/50 to-purple-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}