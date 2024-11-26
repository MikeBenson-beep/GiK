import { motion } from 'framer-motion';
import { Building2, TrendingUp, LineChart, BookOpen, Plus, Briefcase } from 'lucide-react';
import { SectorSplit } from '@/components/SectorSplit';
import Logo from '@/components/Logo';
import { ServiceCard } from '@/components/ServiceCard';
import { PortfolioManager } from '@/components/PortfolioManager';

export default function Traditional() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <Logo />
        </div>

        <SectorSplit />

        <div className="relative z-10 flex-grow flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Traditional
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-white/60">
                Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto">
              Time-tested strategies meet modern execution. Experience the power of traditional trading wisdom enhanced by cutting-edge technology.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Management Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio Management</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Track and analyze your investments with our cutting-edge portfolio management tools.
              </p>
            </motion.div>
          </div>
          
          <PortfolioManager />
        </div>
      </div>

      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceCard
              Icon={Building2}
              title="Institutional Grade"
              description="Access professional-level trading tools and analysis"
            />
            <ServiceCard
              Icon={TrendingUp}
              title="Technical Analysis"
              description="Advanced charting and pattern recognition"
            />
            <ServiceCard
              Icon={LineChart}
              title="Risk Management"
              description="Sophisticated portfolio balancing techniques"
            />
            <ServiceCard
              Icon={BookOpen}
              title="Market Research"
              description="Comprehensive fundamental analysis and insights"
            />
          </div>
        </div>
      </div>
    </div>
  );
}