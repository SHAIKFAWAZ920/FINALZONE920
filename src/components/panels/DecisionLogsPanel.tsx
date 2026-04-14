import { useEffect, useState } from 'react';
import { BrainCircuit, AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToDecisions } from '../../services/db';
import type { Decision } from '../../services/db';

export const DecisionLogsPanel = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    return subscribeToDecisions(setDecisions);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-slate-900/80 border border-purple-500/30 rounded-2xl flex flex-col gap-4 shadow-2xl backdrop-blur-md w-full h-full">
      <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
        <div className="flex items-center gap-3 text-purple-400">
          <BrainCircuit className="w-6 h-6 animate-pulse" />
          <h2 className="font-bold text-white uppercase tracking-widest text-lg flex items-center gap-2">
            AI Transparency Engine
            <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded border border-purple-500/30 font-mono">AUTONOMOUS</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10 pointer-events-none" style={{ height: '30px', bottom: 0, top: 'auto'}} />
        
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 max-h-[400px] pb-8">
          <AnimatePresence>
            {decisions.length === 0 ? (
              <div className="text-slate-500 font-mono text-sm text-center py-8">Awaiting autonomous events...</div>
            ) : (
              decisions.map((d) => (
                <motion.div 
                  key={d.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <div className="font-mono text-xs text-slate-400">ID: {d.id}</div>
                    <div className="text-xs font-bold font-mono px-2 py-0.5 rounded flex items-center gap-1 bg-slate-900">
                      CONFIDENCE: <span className={d.confidence && d.confidence > 90 ? 'text-emerald-400' : 'text-yellow-400'}>{d.confidence || 95}%</span>
                    </div>
                  </div>
                  
                  <div className="text-slate-100 font-medium text-sm border-l-2 pl-3 py-1 border-purple-500">
                    {d.message}
                  </div>

                  <div className="flex items-center gap-4 mt-2 pt-2 border-t border-slate-700/50">
                     <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                        {d.riskLevel === 'low' ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : 
                         d.riskLevel === 'medium' ? <AlertTriangle className="w-3 h-3 text-yellow-400" /> : 
                         <ShieldAlert className="w-3 h-3 text-red-400" />}
                        RISK: <span className="uppercase text-slate-300">{d.riskLevel || 'LOW'}</span>
                     </div>
                     <div className="text-xs text-slate-500 font-mono truncate flex-1" title={d.reasoning}>
                        WHY: {d.reasoning || "Optimizing global flow"}
                     </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
