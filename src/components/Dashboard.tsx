import React from 'react';
import { HeroSection } from './HeroSection';
import { Heatmap } from './Heatmap';
import { WaitTimes } from './WaitTimes';
import { AlertsPanel } from './AlertsPanel';
import { SmartNavigation } from './SmartNavigation';
import { LiveDecisions } from './LiveDecisions';

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-6xl mx-auto w-full">
      <HeroSection />
      
      <div className="w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Venue Overview</h2>
        <SmartNavigation />
        <AlertsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Heatmap />
          <WaitTimes />
        </div>
        <div className="lg:col-span-1">
          <LiveDecisions />
        </div>
      </div>
    </div>
  );
};
