import { TrendingDown, Timer, Target, Radar } from 'lucide-react';
import { motion } from 'framer-motion';

export const ImpactPanel = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-[#0A0A0A]/90 border border-[#1A1A1A] hover:border-[#FFD700]/40 transition-colors duration-300 rounded-2xl flex flex-col shadow-xl backdrop-blur-md w-full relative">
      <div className="flex items-center gap-2 text-white mb-4 border-b border-[#1A1A1A] pb-3">
        <Radar className="w-5 h-5 text-[#FFD700]" />
        <h3 className="font-semibold uppercase tracking-widest text-sm">Real-World Impact</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl border border-[#1A1A1A]">
           <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2"><TrendingDown className="w-4 h-4 text-emerald-400"/> CONGESTION RISK</div>
           <div className="text-2xl font-black text-white">Reduced ~30%</div>
        </div>
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl border border-[#1A1A1A]">
           <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2"><Timer className="w-4 h-4 text-emerald-400"/> LATENCY</div>
           <div className="text-2xl font-black text-white">Improved ~40%</div>
        </div>
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl border border-[#1A1A1A]">
           <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2"><Target className="w-4 h-4 text-[#FFD700]"/> DECISION ACCURACY</div>
           <div className="text-2xl font-black text-[#FFD700]">~94%</div>
        </div>
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl border border-[#1A1A1A] flex flex-col justify-center">
            <span className="text-xs text-emerald-400 font-mono bg-emerald-400/10 px-2 py-1 rounded inline-block text-center border border-emerald-400/20">REAL-TIME ANOMALY DETECTION ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
};
