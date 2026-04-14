
import { Beaker, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const TestingPanel = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.0 }} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex flex-col gap-3 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-10"><Beaker className="w-24 h-24" /></div>
      <div className="flex items-center gap-2 text-primary">
         <Beaker className="w-5 h-5 text-purple-400" />
         <h3 className="font-semibold text-slate-100 uppercase tracking-wider text-sm">Testing Coverage</h3>
      </div>
      <div className="flex justify-between items-end relative z-10">
         <div className="text-4xl font-black text-emerald-400">98%</div>
         <div className="text-right">
           <div className="flex items-center gap-1 text-emerald-400/80 text-sm">
             <CheckCircle2 className="w-4 h-4" /> 15/15 Passed
           </div>
           <div className="text-xs text-slate-400">Zero failed tests.</div>
         </div>
      </div>
      <div className="w-full bg-slate-900 rounded-full h-2 mt-2 relative z-10">
         <div className="bg-gradient-to-r from-purple-500 to-emerald-400 h-2 rounded-full" style={{ width: '98%' }}></div>
      </div>
    </motion.div>
  );
};
