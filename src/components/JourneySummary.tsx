import { motion } from 'framer-motion';
import { Share2, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface JourneySummaryProps {
  portfolio: string[];
  riskLevel: string;
  objective: string;
  timeline: string;
}

export function JourneySummary({ portfolio, riskLevel, objective, timeline }: JourneySummaryProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My GiK Investment Profile',
        text: `Risk Level: ${riskLevel}\nObjective: ${objective}\nTimeline: ${timeline}`,
        url: window.location.href,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="relative overflow-hidden border border-white/10 bg-black">
        {/* Header */}
        <div className="relative border-b border-white/10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1 w-1 rounded-full bg-emerald-500" />
                  <p className="text-sm text-white/60 font-mono uppercase tracking-wider">Analysis Complete</p>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Investment Profile</h2>
              </div>
              <Button
                onClick={handleShare}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full p-2"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Key Metrics */}
            <div className="space-y-6">
              <MetricCard
                label="Risk Profile"
                value={riskLevel}
                subValue="8-12% Expected Return"
                color="emerald"
              />
              <MetricCard
                label="Investment Horizon"
                value={timeline}
                subValue="Quarterly Review Cycle"
                color="blue"
              />
              <MetricCard
                label="Primary Objective"
                value={objective}
                subValue="Growth-focused Strategy"
                color="purple"
              />
            </div>

            {/* Right Column - Portfolio & Indicators */}
            <div className="space-y-6">
              <div className="bg-white/[0.02] rounded-lg p-6 border border-white/5">
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
                  Portfolio Composition
                </h3>
                <div className="space-y-2">
                  {portfolio.map((asset, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 group cursor-pointer"
                    >
                      <span className="text-white/80 font-mono text-sm">{asset}</span>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Indicator label="Sharpe" value="1.8" />
                <Indicator label="Beta" value="0.85" />
                <Indicator label="Alpha" value="2.4%" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/40 font-mono">
              GEN: {new Date().toISOString().split('T')[0].replace(/-/g, '')}_{Math.random().toString(36).substring(2, 7).toUpperCase()}
            </p>
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-1 w-6 rounded-full bg-gradient-to-r from-emerald-500/50 to-blue-500/50"
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function MetricCard({ label, value, subValue, color }: { 
  label: string; 
  value: string; 
  subValue: string;
  color: 'emerald' | 'blue' | 'purple';
}) {
  const gradients = {
    emerald: 'from-emerald-500/10 to-emerald-500/5',
    blue: 'from-blue-500/10 to-blue-500/5',
    purple: 'from-purple-500/10 to-purple-500/5'
  };

  return (
    <div className={`bg-gradient-to-br ${gradients[color]} rounded-lg p-6 border border-white/5`}>
      <p className="text-sm text-white/60 uppercase tracking-wider mb-2">{label}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-white/40">{subValue}</p>
    </div>
  );
}

function Indicator({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.02] rounded-lg p-4 border border-white/5">
      <p className="text-sm text-white/40 mb-1">{label}</p>
      <p className="text-lg font-mono text-white">{value}</p>
    </div>
  );
}