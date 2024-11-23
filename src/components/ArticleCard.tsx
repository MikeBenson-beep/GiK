import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ArticleCardProps {
  title: string;
  preview: string;
  date: string;
}

export function ArticleCard({ title, preview, date }: ArticleCardProps) {
  return (
    <Card className="relative p-6 bg-black border-white/10 hover:border-white/20 transition-all duration-500 group cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <p className="text-sm text-white/60 mb-2 font-mono">{date}</p>
        <h3 className="text-xl font-semibold mb-3 text-white/90 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-white/60 mb-4 line-clamp-2 group-hover:text-white/80">{preview}</p>
        <div className="flex items-center text-sm text-white/60 group-hover:text-white">
          Read More 
          <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Card>
  );
}