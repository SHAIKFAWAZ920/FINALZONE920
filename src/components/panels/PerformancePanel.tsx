import { Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const PerformancePanel = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex flex-col gap-3 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 text-cyan-400">
        <Activity className="w-5 h-5" />
        <h3 className="font-semibold text-slate-100 uppercase tracking-wider text-sm">Performance Metrics</h3>
      </div>
      <div className="flex justify-between items-end mt-2">
        <div className="text-3xl font-black text-cyan-400 flex items-baseline gap-1">
          42<span className="text-sm font-medium text-slate-400">ms</span>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-cyan-400/80 text-sm">
            <Zap className="w-4 h-4" /> Load Time
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
         <div className="bg-slate-900 rounded p-2 text-center text-xs text-slate-300">
           <span className="block text-emerald-400 font-mono font-bold">Enabled</span>
           Lazy Loading
         </div>
         <div className="bg-slate-900 rounded p-2 text-center text-xs text-slate-300">
           <span className="block text-emerald-400 font-mono font-bold">Active</span>
           API Caching
         </div>
      </div>
    </motion.div>
  );
};
