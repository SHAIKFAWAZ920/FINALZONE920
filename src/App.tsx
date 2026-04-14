// React 18 auto imports
import { Suspense } from 'react';
import { Dashboard } from './components/Dashboard';
import { AssistantChat } from './components/AssistantChat';

const MainLoader = () => (
  <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
    <div className="w-12 h-12 border-4 border-slate-700 border-t-purple-500 rounded-full animate-spin"></div>
    <div className="text-purple-400 font-mono tracking-widest text-sm animate-pulse">INITIALIZING CORE...</div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-[#060B14] flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200" aria-label="EventIQ Application Wrapper">
      <header className="w-full p-4 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#FFD700]/30 shadow-[0_4px_30px_rgba(255,215,0,0.05)] sticky top-0 z-50 flex justify-between items-center" role="banner">
        <h1 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
          Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">IQ</span>
        </h1>
        <div className="flex items-center gap-6" role="status" aria-live="polite">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/50 rounded border border-[#1A1A1A]">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">🧠 Autonomous Mode:</span>
            <span className="text-xs text-[#FFD700] font-mono glow-gold">ACTIVE</span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/50 rounded border border-[#1A1A1A]">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">🛡 Security:</span>
            <span className="text-xs text-emerald-400 font-mono">PROTECTED</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/50 rounded border border-[#1A1A1A]">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">🧪 Tests:</span>
            <span className="text-xs text-emerald-400 font-mono">PASSED</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/50 rounded border border-[#1A1A1A]">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">⚡ Performance:</span>
            <span className="text-xs text-cyan-400 font-mono">FAST</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative overflow-hidden" role="main">
        {/* Abstract background elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none"></div>
        
        <Suspense fallback={<MainLoader />}>
          <Dashboard />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <AssistantChat />
      </Suspense>
    </div>
  );
}

export default App;
