
import { ShieldCheck, Lock, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

export const SecurityPanel = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex flex-col gap-3 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-10"><ShieldCheck className="w-24 h-24" /></div>
      <div className="flex items-center gap-2 text-emerald-400">
        <ShieldCheck className="w-5 h-5" />
        <h3 className="font-semibold text-slate-100 uppercase tracking-wider text-sm">Security Status</h3>
      </div>
      <div className="flex flex-col gap-2 relative z-10 mt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-300"><Lock className="w-4 h-4 text-emerald-400" /> Auth JWT</span>
          <span className="text-emerald-400 font-mono text-xs bg-emerald-400/10 px-2 py-1 rounded">ACTIVE</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-300"><Fingerprint className="w-4 h-4 text-emerald-400" /> Zod Validation</span>
          <span className="text-emerald-400 font-mono text-xs bg-emerald-400/10 px-2 py-1 rounded">ENFORCED</span>
        </div>
      </div>
    </motion.div>
  );
};
