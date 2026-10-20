import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DiagnosticResults from './pages/diagnostic-results';
import Dashboard from './pages/dashboard';
import NewPatientAnalysis from './pages/new-patient-analysis';
import PatientHistory from './pages/patient-history';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/diagnostic-results" element={<DiagnosticResults />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-patient-analysis" element={<NewPatientAnalysis />} />
        <Route path="/patient-history" element={<PatientHistory />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
