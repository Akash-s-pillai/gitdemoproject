import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import PatientHeaderCard from './components/PatientHeaderCard';
import TimelineEntry from './components/TimelineEntry';
import PatientSummaryStats from './components/PatientSummaryStats';
import FilterableTable from './components/FilterableTable';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PatientHistory = () => {
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'table'
  const [isOffline, setIsOffline] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientAnalyses, setPatientAnalyses] = useState([]);

  // Mock patient data
  const mockPatient = {
    id: "PAT-2024-001",
    name: "Sarah Johnson",
    dateOfBirth: "1985-03-15",
    gender: "female",
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Rural Route 1, Meadowbrook, TX 75001",
    emergencyContact: "John Johnson (Husband) - (555) 987-6543",
    bloodType: "A+",
    allergies: ["Penicillin", "Shellfish"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"]
  };

  // Mock analysis history
  const mockAnalyses = [
    {
      date: "2025-01-08T14:30:00Z",
      primaryDiagnosis: "Upper Respiratory Infection",
      symptoms: ["Cough", "Sore throat", "Mild fever", "Congestion"],
      confidence: 85,
      status: "ongoing",
      urgency: "medium",
      diagnosisSummary: `Patient presents with classic symptoms of viral upper respiratory infection. Symptoms began 3 days ago with gradual onset. No signs of bacterial infection at this time.`,
      alternativeDiagnoses: [
        { diagnosis: "Allergic Rhinitis", confidence: 15 },
        { diagnosis: "Strep Throat", confidence: 10 }
      ],
      treatmentPlan: [
        "Rest and increased fluid intake",
        "Over-the-counter pain relievers as needed",
        "Throat lozenges for comfort",
        "Return if symptoms worsen or persist beyond 7 days"
      ],
      followUp: {
        date: "2025-01-15",
        type: "Phone check-in"
      }
    },
    {
      date: "2024-12-15T10:15:00Z",
      primaryDiagnosis: "Diabetes Management Review",
      symptoms: ["Routine check-up", "Blood sugar monitoring"],
      confidence: 92,
      status: "resolved",
      urgency: "low",
      diagnosisSummary: `Routine diabetes management review shows good glycemic control. HbA1c levels within target range. Patient demonstrates good understanding of medication regimen and dietary management.`,
      treatmentPlan: [
        "Continue current medication regimen",
        "Maintain current diet and exercise plan",
        "Regular blood glucose monitoring",
        "Schedule next review in 3 months"
      ],
      followUp: {
        date: "2025-03-15",
        type: "In-person visit"
      }
    },
    {
      date: "2024-11-22T16:45:00Z",
      primaryDiagnosis: "Hypertension Follow-up",
      symptoms: ["Elevated blood pressure", "Mild headaches"],
      confidence: 88,
      status: "resolved",
      urgency: "medium",
      diagnosisSummary: `Blood pressure readings consistently elevated over past week. Patient reports mild headaches and some dizziness. Current medication may need adjustment.`,
      alternativeDiagnoses: [
        { diagnosis: "Medication Non-compliance", confidence: 20 },
        { diagnosis: "Secondary Hypertension", confidence: 5 }
      ],
      treatmentPlan: [
        "Increase ACE inhibitor dosage",
        "Daily blood pressure monitoring",
        "Reduce sodium intake",
        "Follow-up in 2 weeks"
      ],
      followUp: {
        date: "2024-12-06",
        type: "Blood pressure check"
      }
    },
    {
      date: "2024-10-08T11:20:00Z",
      primaryDiagnosis: "Acute Gastroenteritis",
      symptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal cramps"],
      confidence: 90,
      status: "resolved",
      urgency: "high",
      diagnosisSummary: `Patient presents with acute onset of gastrointestinal symptoms consistent with viral gastroenteritis. Symptoms began 24 hours ago after attending community event. No signs of dehydration at this time.`,
      treatmentPlan: [
        "Clear fluids and electrolyte replacement",
        "BRAT diet when tolerated",
        "Anti-nausea medication as needed",
        "Return if signs of dehydration develop"
      ],
      followUp: {
        date: "2024-10-12",
        type: "Phone check-in"
      }
    },
    {
      date: "2024-09-03T09:30:00Z",
      primaryDiagnosis: "Contact Dermatitis",
      symptoms: ["Skin rash", "Itching", "Redness", "Swelling"],
      confidence: 78,
      status: "resolved",
      urgency: "low",
      diagnosisSummary: `Patient developed localized skin reaction after gardening activities. Rash pattern consistent with contact dermatitis, likely from poison ivy exposure. No systemic symptoms present.`,
      alternativeDiagnoses: [
        { diagnosis: "Allergic Reaction", confidence: 15 },
        { diagnosis: "Eczema Flare", confidence: 7 }
      ],
      treatmentPlan: [
        "Topical corticosteroid cream",
        "Cool compresses for comfort",
        "Avoid scratching affected area",
        "Antihistamine for itching"
      ]
    }
  ];

  useEffect(() => {
    // Initialize patient data
    setSelectedPatient(mockPatient);
    setPatientAnalyses(mockAnalyses);

    // Check online status
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    handleOnlineStatus();

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handlePatientEdit = (updatedData) => {
    setSelectedPatient(prev => ({
      ...prev,
      ...updatedData
    }));
    console.log('Patient data updated:', updatedData);
  };

  const handleViewAnalysisDetails = (analysis) => {
    console.log('Viewing analysis details:', analysis);
    // In a real app, this would open a detailed view or modal
  };

  const handleQuickAction = (action, data) => {
    console.log('Quick action triggered:', action, data);
    // Handle various quick actions
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    // Handle profile click action
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
    // Handle notification click action
  };

  const handlePatientSave = (updatedData) => {
    handlePatientEdit(updatedData);
  };

  const handlePatientCancel = () => {
    console.log('Patient edit cancelled');
    // Handle cancel action
  };

  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: 'Patient History', path: '/patient-history', icon: 'History', current: true }
  ];

  if (!selectedPatient) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader 
          isOffline={isOffline}
          onProfileClick={handleProfileClick}
          onNotificationClick={handleNotificationClick}
        />
        <PrimaryNavigation />
        <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} />
        
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="mx-auto mb-4 text-primary animate-spin" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Loading Patient Data</h2>
            <p className="text-muted-foreground">Please wait while we retrieve patient information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        isOffline={isOffline} 
        userName="Dr. Smith"
        clinicName="HealthInsights Clinic"
        urgentAlerts={0}
        onProfileClick={handleProfileClick}
        onNotificationClick={handleNotificationClick}
      />
      <PrimaryNavigation />
      <BreadcrumbTrail 
        customBreadcrumbs={customBreadcrumbs}
        patientContext={{
          name: selectedPatient?.name,
          id: selectedPatient?.id,
          age: new Date()?.getFullYear() - new Date(selectedPatient.dateOfBirth)?.getFullYear()
        }}
      />
      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Patient Header */}
          <div className="mb-6">
            <PatientHeaderCard
              patient={selectedPatient}
              onSave={handlePatientSave}
              onEdit={handlePatientEdit}
              onCancel={handlePatientCancel}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Medical History</h2>
                  <p className="text-sm text-muted-foreground">
                    {patientAnalyses?.length} diagnostic analyses on record
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('timeline')}
                  >
                    <Icon name="Clock" size={16} className="mr-1" />
                    Timeline
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                  >
                    <Icon name="Table" size={16} className="mr-1" />
                    Table
                  </Button>
                </div>
              </div>

              {/* Content based on view mode */}
              {viewMode === 'timeline' ? (
                <div className="space-y-6">
                  {patientAnalyses?.map((analysis, index) => (
                    <TimelineEntry
                      key={index}
                      entry={analysis}
                      isLast={index === patientAnalyses?.length - 1}
                    />
                  ))}
                  
                  {patientAnalyses?.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Medical History</h3>
                      <p className="text-muted-foreground mb-4">
                        This patient has no recorded diagnostic analyses yet.
                      </p>
                      <Button variant="default" onClick={() => window.location.href = '/new-patient-analysis'}>
                        <Icon name="Plus" size={16} className="mr-2" />
                        Start First Analysis
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <FilterableTable
                  analyses={patientAnalyses}
                  onViewDetails={handleViewAnalysisDetails}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Patient Summary Stats */}
              <PatientSummaryStats
                patient={selectedPatient}
                analyses={patientAnalyses}
              />

              {/* Quick Actions */}
              <QuickActionsPanel
                patient={selectedPatient}
                onAction={handleQuickAction}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Offline Indicator */}
      {isOffline && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-warning/10 border border-warning/20 rounded-lg p-4 clinical-shadow-md z-1200">
          <div className="flex items-start space-x-3">
            <Icon name="WifiOff" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-warning mb-1">Offline Mode</h4>
              <p className="text-sm text-warning/80">
                Patient data is cached locally. Changes will sync when connection is restored.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;