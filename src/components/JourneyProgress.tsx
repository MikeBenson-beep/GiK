import { useLocation } from 'react-router-dom';

const steps = [
  { path: '/journey/portfolio', label: 'Portfolio' },
  { path: '/journey/risk', label: 'Risk' },
  { path: '/journey/objectives', label: 'Goals' },
  { path: '/journey/timeline', label: 'Timeline' }
];

export function JourneyProgress() {
  const location = useLocation();
  const currentIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <div className="fixed top-32 right-8 z-30">
      <div className="relative">
        <div className="text-center">
          <span className="text-4xl font-bold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            {currentIndex + 1}
          </span>
          <div className="flex items-center gap-1 justify-center mt-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-[2px] w-2 rounded-full transition-all duration-300 ${
                  index <= currentIndex ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}