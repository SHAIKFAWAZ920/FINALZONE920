import { BrainCircuit, LineChart, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const IntelligencePanel = () => {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-[#0A0A0A]/90 border border-[#FFD700]/30 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-[0_0_30px_rgba(255,215,0,0.05)] backdrop-blur-md w-full relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl group-hover:bg-[#FFD700]/10 transition-colors duration-500 pointer-events-none"></div>
      
      <div className="flex items-center gap-4 border-r border-[#1A1A1A] pr-6">
        <div className="p-3 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/20">
          <BrainCircuit className="w-8 h-8 text-[#FFD700] animate-pulse glow-gold" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-widest uppercase">System Intelligence</h2>
          <span className="text-xs text-[#FFD700] font-mono bg-[#FFD700]/10 px-2 py-0.5 rounded border border-[#FFD700]/20 mt-1 inline-block">AUTONOMOUS ENGINE ACTIVE</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="flex items-center gap-3">
           <LineChart className="w-5 h-5 text-emerald-400" />
           <div>
             <div className="text-sm font-bold text-white">95.4%</div>
             <div className="text-xs text-slate-400 font-mono">ACCURACY</div>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <Shield className="w-5 h-5 text-emerald-400" />
           <div>
             <div className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Optimal Flow Maintained</div>
             <div className="text-xs text-slate-400 font-mono">STABILITY</div>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <Zap className="w-5 h-5 text-[#FFD700]" />
           <div>
             <div className="text-sm font-bold text-white">±2.1%</div>
             <div className="text-xs text-slate-400 font-mono">CONFIDENCE VARIANCE</div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
