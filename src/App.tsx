import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardProvider } from './hooks/useDashboardData';
import { AppShell } from './components/layout/AppShell';
import { OverviewPage } from './pages/OverviewPage';
import { MapPage } from './pages/MapPage';
import { VegetationPage } from './pages/VegetationPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { PriorityZonesPage } from './pages/PriorityZonesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { MethodologyPage } from './pages/MethodologyPage';

export const App: React.FC = () => {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<OverviewPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="vegetation" element={<VegetationPage />} />
            <Route path="accessibility" element={<AccessibilityPage />} />
            <Route path="priority-zones" element={<PriorityZonesPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="methodology" element={<MethodologyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DashboardProvider>
  );
};

export default App;
