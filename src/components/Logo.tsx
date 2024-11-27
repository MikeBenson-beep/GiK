import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative group cursor-pointer" 
      onClick={() => navigate('/')}
      role="button"
      aria-label="Go to home page"
    >
      <div className="flex items-center justify-center text-4xl font-black tracking-[0.15em]">
        <span className="text-white transition-transform duration-300 group-hover:translate-y-[-2px] mr-2">G</span>
        <div className="relative flex flex-col items-center justify-center mx-2">
          {/* i dot */}
          <div className="absolute -top-1 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 animate-gradient group-hover:scale-125 transition-all duration-300" />
          {/* i stem */}
          <div className="h-10 w-[3px] mt-4 rounded-full bg-white transition-all duration-300 group-hover:h-11" />
        </div>
        <span className="text-white transition-transform duration-300 group-hover:translate-y-[-2px] ml-3.5">K</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-all duration-500 ease-out" />
    </div>
  );
};

export default Logo; 