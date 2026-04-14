
import { Accessibility, Keyboard, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const AccessibilityPanel = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex flex-col gap-3 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 text-yellow-500">
        <Accessibility className="w-5 h-5" />
        <h3 className="font-semibold text-slate-100 uppercase tracking-wider text-sm">Accessibility</h3>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-300"><Keyboard className="w-4 h-4 text-yellow-500" /> Keyboard Nav</span>
          <span className="text-emerald-400 font-mono text-xs bg-emerald-400/10 px-2 py-1 rounded">PASS</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-300"><Eye className="w-4 h-4 text-yellow-500" /> ARIA Tags</span>
          <span className="text-emerald-400 font-mono text-xs bg-emerald-400/10 px-2 py-1 rounded">PASS</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-300"><div className="w-4 h-4 flex"><div className="w-2 h-4 bg-white"></div><div className="w-2 h-4 bg-black"></div></div> Contrast (WCAG)</span>
          <span className="text-emerald-400 font-mono text-xs bg-emerald-400/10 px-2 py-1 rounded">AAA</span>
        </div>
      </div>
    </motion.div>
  );
};
