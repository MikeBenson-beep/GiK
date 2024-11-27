import { motion } from 'framer-motion';
import { Brain, Cpu, Network, Workflow } from 'lucide-react';
import { SectorSplit } from '@/components/SectorSplit';
import Logo from '@/components/Logo';
import { ServiceCard } from '@/components/ServiceCard';

export default function Quant() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
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
                Quantum
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-white/60">
                Intelligence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto">
              Experience the future of trading with our quantum-powered AI algorithms. Institutional-grade strategies, now accessible to everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceCard
              Icon={Brain}
              title="AI Analysis"
              description="Neural networks processing market data in real-time"
            />
            <ServiceCard
              Icon={Cpu}
              title="Quantum Computing"
              description="Next-gen algorithms optimizing trade execution"
            />
            <ServiceCard
              Icon={Network}
              title="Network Intelligence"
              description="Distributed systems ensuring optimal performance"
            />
            <ServiceCard
              Icon={Workflow}
              title="Automated Strategies"
              description="Self-evolving trading algorithms"
            />
          </div>
        </div>
      </div>
    </div>
  );
}