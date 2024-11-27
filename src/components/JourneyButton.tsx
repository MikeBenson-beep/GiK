import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function JourneyButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/journey')}
      className="group relative px-12 py-4 bg-white text-black rounded-full overflow-hidden transition-all duration-500"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center gap-3">
        <span className="text-lg font-bold tracking-wider">
          START YOUR JOURNEY
        </span>
        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </motion.button>
  );
}