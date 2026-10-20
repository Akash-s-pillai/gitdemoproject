import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricsCard from './components/MetricsCard';
import RecentAnalysesTable from './components/RecentAnalysesTable';
import SystemStatusCard from './components/SystemStatusCard';
import QuickActionsSidebar from './components/QuickActionsSidebar';

const Dashboard = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState(new Date('2025-01-10T08:30:00'));
  const [pendingSync, setPendingSync] = useState(0);

  // Mock data for dashboard metrics
  const todayMetrics = {
    patientsAnalyzed: 12,
    urgentReferrals: 3,
    completedAnalyses: 9,
    systemHealth: 'good'
  };

  // Mock data for recent analyses
  const recentAnalyses = [
    {
      id: 'A001',
      patientId: 'P12345',
      patientName: 'Sarah Johnson',
      analysisDate: '2025-01-10T08:15:00',
      diagnosis: 'Acute Upper Respiratory Infection',
      confidence: 87,
      urgency: 'medium',
      requiresReferral: false
    },
    {
      id: 'A002',
      patientId: 'P12346',
      patientName: 'Michael Chen',
      analysisDate: '2025-01-10T07:45:00',
      diagnosis: 'Hypertensive Crisis',
      confidence: 94,
      urgency: 'critical',
      requiresReferral: true
    },
    {
      id: 'A003',
      patientId: 'P12347',
      patientName: 'Emily Rodriguez',
      analysisDate: '2025-01-10T07:20:00',
      diagnosis: 'Type 2 Diabetes - Uncontrolled',
      confidence: 91,
      urgency: 'high',
      requiresReferral: true
    },
    {
      id: 'A004',
      patientId: 'P12348',
      patientName: 'David Thompson',
      analysisDate: '2025-01-09T16:30:00',
      diagnosis: 'Seasonal Allergic Rhinitis',
      confidence: 78,
      urgency: 'low',
      requiresReferral: false
    },
    {
      id: 'A005',
      patientId: 'P12349',
      patientName: 'Lisa Wang',
      analysisDate: '2025-01-09T15:15:00',
      diagnosis: 'Acute Gastroenteritis',
      confidence: 83,
      urgency: 'medium',
      requiresReferral: false
    }
  ];

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        setLastSync(new Date());
        setPendingSync(0);
      } else {
        setPendingSync(3);
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleViewReport = (analysisId) => {
    window.location.href = `/diagnostic-results?id=${analysisId}`;
  };

  const handleNewAnalysis = () => {
    window.location.href = '/new-patient-analysis';
  };

  const handleEmergencyReferral = () => {
    console.log('Emergency referral initiated');
    // In a real app, this would open an emergency referral form
  };

  const handlePatientSearch = (patient) => {
    console.log('Selected patient:', patient);
    // In a real app, this would navigate to patient details
  };

  const handleSyncNow = () => {
    if (isOnline) {
      setLastSync(new Date());
      setPendingSync(0);
      console.log('Data sync initiated');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        isOffline={!isOnline}
        userName="Dr. Sarah Mitchell"
        clinicName="HealthInsights Clinic"
        urgentAlerts={todayMetrics?.urgentReferrals}
        onProfileClick={() => console.log('Profile clicked')}
        onNotificationClick={() => console.log('Notification clicked')}
      />
      {/* Primary Navigation */}
      <PrimaryNavigation />
      {/* Breadcrumb Trail */}
      <BreadcrumbTrail />
      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Dr. Mitchell. Here's your clinic overview for today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricsCard
                  title="Patients Analyzed Today"
                  value={todayMetrics?.patientsAnalyzed}
                  icon="Users"
                  trend="+3"
                  trendDirection="up"
                  color="primary"
                  description="Diagnostic analyses completed"
                  onClick={() => window.location.href = '/diagnostic-results'}
                />
                <MetricsCard
                  title="Urgent Referrals"
                  value={todayMetrics?.urgentReferrals}
                  icon="AlertTriangle"
                  trend="+1"
                  trendDirection="up"
                  color="error"
                  description="Requiring immediate attention"
                />
                <MetricsCard
                  title="Completed Analyses"
                  value={todayMetrics?.completedAnalyses}
                  icon="CheckCircle"
                  trend="+2"
                  trendDirection="up"
                  color="success"
                  description="Successfully processed"
                />
              </div>

              {/* Recent Analyses Table */}
              <RecentAnalysesTable
                analyses={recentAnalyses}
                onViewReport={handleViewReport}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <QuickActionsSidebar
                urgentPatients={todayMetrics?.urgentReferrals}
                isOnline={isOnline}
                onNewAnalysis={handleNewAnalysis}
                onEmergencyReferral={handleEmergencyReferral}
                onPatientSearch={handlePatientSearch}
              />

              {/* System Status */}
              <SystemStatusCard
                isOnline={isOnline}
                lastSync={lastSync}
                pendingSync={pendingSync}
                systemHealth={todayMetrics?.systemHealth}
                onSyncNow={handleSyncNow}
              />
            </div>
          </div>

          {/* Mobile Quick Actions (Tablet and below) */}
          <div className="lg:hidden mt-6">
            <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleNewAnalysis}
                  className="flex items-center justify-center space-x-2 p-4 bg-primary text-primary-foreground rounded-lg clinical-transition hover:bg-primary/90"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                  <span className="text-sm font-medium">New Analysis</span>
                </button>
                <button
                  onClick={() => window.location.href = '/diagnostic-results'}
                  className="flex items-center justify-center space-x-2 p-4 bg-muted text-foreground rounded-lg clinical-transition hover:bg-muted/80"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  <span className="text-sm font-medium">View Results</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;