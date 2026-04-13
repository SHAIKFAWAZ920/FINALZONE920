// React 18 auto imports
import { Dashboard } from './components/Dashboard';
import { AssistantChat } from './components/AssistantChat';

function App() {
  return (
    <div className="min-h-screen bg-dark flex flex-col font-sans">
      <header className="w-full p-4 bg-slate-900 border-b border-slate-700 shadow-md sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-2xl font-black text-primary tracking-tighter">
          Event<span className="text-accent">IQ</span>
        </h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-slate-400 font-medium">Live Server</span>
        </div>
      </header>

      <main className="flex-1 w-full bg-slate-950 p-4 md:p-8">
        <Dashboard />
      </main>

      <AssistantChat />
    </div>
  );
}

export default App;
