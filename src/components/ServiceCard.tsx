import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ Icon, title, description, className }: ServiceCardProps) {
  return (
    <Card className={cn(
      "group relative p-6 bg-black border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent before:translate-x-[-200%] before:hover:translate-x-[200%] before:transition-transform before:duration-700",
      className
    )}>
      <div className="relative z-10">
        <Icon className="h-12 w-12 mb-4 text-white/80 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
        <h3 className="text-xl font-semibold mb-2 text-white/90 group-hover:text-white">{title}</h3>
        <p className="text-white/60 group-hover:text-white/80">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
}