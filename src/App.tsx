import { Routes, Route } from 'react-router-dom';
import { ServiceCard } from "@/components/ServiceCard"
import { ArticleCard } from "@/components/ArticleCard"
import { Brain, ChartBar, TrendingUp, Building2 } from 'lucide-react';
import Logo from '@/components/Logo';
import { Toaster } from "./components/ui/toaster"
import { SectorSplit } from '@/components/SectorSplit';
import { WaitlistForm } from '@/components/WaitlistForm';
import Traditional from '@/pages/Traditional';
import Quant from '@/pages/Quant';

function Home() {
  const articles = [
    {
      title: "Traditional Meets Innovation",
      preview: "How traditional finance principles enhance AI-driven strategies...",
      date: "Mar 15, 2024"
    },
    {
      title: "The Quant Revolution",
      preview: "Bridging classical trading with cutting-edge algorithms...",
      date: "Mar 12, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        
        {/* GiK Logo */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <Logo />
        </div>

        {/* Sector Split */}
        <SectorSplit />

        <div className="relative z-10 flex-grow flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Where Traditional
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-white/60">
                Meets Quantum
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto">
              Join the future of trading. Get early access to our revolutionary platform that combines traditional wisdom with quantum computing.
            </p>

            <WaitlistForm />
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Traditional Excellence</h2>
              <ServiceCard
                Icon={Building2}
                title="Classical Trading"
                description="Time-tested strategies refined over decades"
              />
              <ServiceCard
                Icon={TrendingUp}
                title="Market Analysis"
                description="Deep fundamental and technical analysis"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Quantum Innovation</h2>
              <ServiceCard
                Icon={Brain}
                title="AI Analysis"
                description="Neural networks analyzing market patterns in real-time"
              />
              <ServiceCard
                Icon={ChartBar}
                title="Quantum Computing"
                description="Advanced algorithms optimizing portfolio allocation"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Preview */}
      <div className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Latest Insights</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Discover how traditional finance and quantum computing converge
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/traditional" element={<Traditional />} />
      <Route path="/quant" element={<Quant />} />
    </Routes>
  );
}