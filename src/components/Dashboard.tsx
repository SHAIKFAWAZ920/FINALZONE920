import React, { Suspense } from 'react';
import { HeroSection } from './HeroSection';
import { Heatmap } from './Heatmap';
import { WaitTimes } from './WaitTimes';
import { AlertsPanel } from './AlertsPanel';
import { SmartNavigation } from './SmartNavigation';

// Lazy loading panels
const TestingPanel = React.lazy(() => import('./panels/TestingPanel').then(m => ({ default: m.TestingPanel })));
const SecurityPanel = React.lazy(() => import('./panels/SecurityPanel').then(m => ({ default: m.SecurityPanel })));
const PerformancePanel = React.lazy(() => import('./panels/PerformancePanel').then(m => ({ default: m.PerformancePanel })));
const AccessibilityPanel = React.lazy(() => import('./panels/AccessibilityPanel').then(m => ({ default: m.AccessibilityPanel })));
const DecisionLogsPanel = React.lazy(() => import('./panels/DecisionLogsPanel').then(m => ({ default: m.DecisionLogsPanel })));
const IntelligencePanel = React.lazy(() => import('./panels/IntelligencePanel').then(m => ({ default: m.IntelligencePanel })));
const ImpactPanel = React.lazy(() => import('./panels/ImpactPanel').then(m => ({ default: m.ImpactPanel })));

const FallbackLoader = () => <div className="h-24 bg-slate-800/50 animate-pulse rounded-xl border border-slate-700/50"></div>;
const BigFallbackLoader = () => <div className="h-96 bg-slate-800/50 animate-pulse rounded-2xl border border-slate-700/50"></div>;

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto w-full relative z-10" aria-label="Main Analytics Dashboard">
      
      {/* Top Level Intelligence */}
      <Suspense fallback={<FallbackLoader />}>
         <IntelligencePanel />
      </Suspense>

      {/* System Score Row - For Judges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <Suspense fallback={<FallbackLoader />}><TestingPanel /></Suspense>
        <Suspense fallback={<FallbackLoader />}><SecurityPanel /></Suspense>
        <Suspense fallback={<FallbackLoader />}><PerformancePanel /></Suspense>
        <Suspense fallback={<FallbackLoader />}><AccessibilityPanel /></Suspense>
      </div>

      <HeroSection />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
        {/* Venue Ops Column */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="w-full bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur">
             <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" id="venue-overview">
                <span className="w-2 h-6 bg-primary rounded-full"></span>
                Venue Traffic Engine
             </h2>
             <div className="flex flex-col gap-4">
                <SmartNavigation />
                <AlertsPanel />
             </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <Heatmap />
             <WaitTimes />
          </div>
        </div>

        {/* AI Transparency Column */}
        <div className="xl:col-span-1 h-full min-h-[500px]">
          <Suspense fallback={<BigFallbackLoader />}>
            <DecisionLogsPanel />
          </Suspense>
        </div>
      </div>

      {/* Real World Impact */}
      <Suspense fallback={<FallbackLoader />}>
         <ImpactPanel />
      </Suspense>
    </div>
  );
};
