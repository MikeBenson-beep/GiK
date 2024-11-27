import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function SectorSplit() {
  const navigate = useNavigate();
  const location = useLocation();

  const isTraditional = location.pathname === '/traditional';
  const isQuant = location.pathname === '/quant';

  return (
    <div className="fixed top-8 w-full z-20 px-12">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center">
        {!isTraditional && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onClick={() => navigate('/traditional')}
            className="group cursor-pointer relative"
          >
            <span className="text-sm font-black tracking-[0.2em] text-white/60 group-hover:text-white transition-all duration-300">
              TRADITIONAL
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-500 ease-out" />
          </motion.div>
        )}

        {!isQuant && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onClick={() => navigate('/quant')}
            className="group cursor-pointer relative ml-auto"
          >
            <span className="text-sm font-black tracking-[0.2em] text-white/60 group-hover:text-white transition-all duration-300">
              QUANT
            </span>
            <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-500 ease-out" />
          </motion.div>
        )}
      </div>
    </div>
  );
}