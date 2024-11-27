import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ConsultingCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function ConsultingCard({ Icon, title, description, className }: ConsultingCardProps) {
  return (
    <Card className={cn(
      "group relative p-8 bg-black border-white/10 hover:border-white/20 transition-all duration-500",
      "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500",
      className
    )}>
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-6 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
          <Icon className="h-8 w-8 text-white/80 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-white/60 group-hover:text-white/80">{description}</p>
      </div>
    </Card>
  );
}