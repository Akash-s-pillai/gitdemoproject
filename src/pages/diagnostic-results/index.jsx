import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import PatientSummaryCard from './components/PatientSummaryCard';
import PrimaryDiagnosisCard from './components/PrimaryDiagnosisCard';
import AlternativeDiagnosesList from './components/AlternativeDiagnosesList';
import RiskAssessmentPanel from './components/RiskAssessmentPanel';
import RecommendedNextSteps from './components/RecommendedNextSteps';
import QuickActionsSidebar from './components/QuickActionsSidebar';
import UncertaintyIndicator from './components/UncertaintyIndicator';


const DiagnosticResults = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [urgentAlerts] = useState(1);

  // Mock patient data
  const mockPatient = {
    id: "PT-2025-001",
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    chiefComplaint: "Persistent chest pain and shortness of breath for 3 days",
    vitals: {
      bloodPressure: "145/92 mmHg",
      heartRate: "88 bpm",
      temperature: "98.6°F",
      oxygenSat: "96%"
    }
  };

  // Mock analysis data
  const mockAnalysisData = {
    id: "AN-2025-001-A",
    timestamp: new Date('2025-01-10T08:30:00'),
    urgency: "high"
  };

  // Mock primary diagnosis
  const mockPrimaryDiagnosis = {
    condition: "Acute Coronary Syndrome (Possible)",
    confidence: 75,
    description: `Based on the patient's symptoms of chest pain, shortness of breath, and elevated blood pressure, there is a significant possibility of acute coronary syndrome. This condition involves reduced blood flow to the heart muscle and requires immediate medical attention.`,
    symptoms: ["Chest pain", "Shortness of breath", "Elevated BP", "Fatigue"],
    medicalTerms: {
      "Acute Coronary Syndrome": "A group of conditions caused by sudden, reduced blood flow to the heart muscle",
      "Myocardial Ischemia": "Reduced blood flow to heart muscle tissue",
      "Angina": "Chest pain caused by reduced blood flow to the heart"
    }
  };

  // Mock alternative diagnoses
  const mockAlternativeDiagnoses = [
    {
      condition: "Pulmonary Embolism",
      likelihood: 45,
      description: "Blood clot in the lungs that can cause chest pain and breathing difficulties.",
      keyDifferences: "Would typically present with more severe shortness of breath and possible leg swelling",
      additionalSymptoms: ["Leg swelling", "Coughing up blood", "Sharp chest pain with breathing"],
      suggestedTests: ["D-dimer blood test", "CT pulmonary angiogram", "Chest X-ray"]
    },
    {
      condition: "Anxiety/Panic Disorder",
      likelihood: 30,
      description: "Psychological condition that can mimic cardiac symptoms with chest pain and breathing issues.",
      keyDifferences: "Often associated with stress, rapid onset, and psychological triggers",
      additionalSymptoms: ["Rapid heartbeat", "Sweating", "Feeling of doom", "Trembling"],
      suggestedTests: ["Psychiatric evaluation", "Stress assessment", "Rule out cardiac causes first"]
    },
    {
      condition: "Gastroesophageal Reflux Disease (GERD)",
      likelihood: 25,
      description: "Stomach acid backing up into the esophagus can cause chest pain that mimics heart problems.",
      keyDifferences: "Pain often related to eating, lying down, or certain foods",
      additionalSymptoms: ["Heartburn", "Acid taste", "Pain after eating", "Difficulty swallowing"],
      suggestedTests: ["Upper endoscopy", "pH monitoring", "Trial of acid-blocking medication"]
    }
  ];

  // Mock risk assessment
  const mockRiskAssessment = {
    overallRisk: "high",
    riskDescription: "Patient presents with multiple cardiac risk factors requiring immediate evaluation and monitoring.",
    riskFactors: [
      {
        factor: "Age and Gender",
        description: "45-year-old female approaching higher risk age group",
        severity: "medium"
      },
      {
        factor: "Elevated Blood Pressure",
        description: "BP 145/92 indicates hypertension requiring management",
        severity: "high"
      },
      {
        factor: "Symptom Combination",
        description: "Chest pain with shortness of breath is concerning for cardiac events",
        severity: "high"
      }
    ],
    requiredActions: [
      {
        action: "Immediate ECG and cardiac enzymes",
        priority: "immediate",
        timeframe: "Within 15 minutes"
      },
      {
        action: "Continuous cardiac monitoring",
        priority: "urgent",
        timeframe: "Immediately upon arrival"
      },
      {
        action: "Blood pressure management",
        priority: "urgent",
        timeframe: "Within 1 hour"
      }
    ],
    warningSignsToMonitor: [
      "Worsening chest pain",
      "Severe shortness of breath",
      "Nausea or vomiting",
      "Sweating",
      "Dizziness or fainting",
      "Irregular heartbeat"
    ]
  };

  // Mock recommendations
  const mockRecommendations = {
    tests: [
      {
        title: "12-Lead Electrocardiogram (ECG)",
        description: "Essential test to evaluate heart rhythm and detect signs of heart attack",
        priority: "urgent",
        timeframe: "Immediately",
        notes: "Repeat every 15-30 minutes if symptoms persist"
      },
      {
        title: "Cardiac Enzyme Panel (Troponin)",
        description: "Blood test to detect heart muscle damage",
        priority: "urgent",
        timeframe: "Within 30 minutes",
        notes: "Serial measurements may be needed"
      },
      {
        title: "Chest X-ray",
        description: "Rule out lung problems and assess heart size",
        priority: "high",
        timeframe: "Within 1 hour",
        notes: "Can help differentiate cardiac vs pulmonary causes"
      },
      {
        title: "Complete Blood Count (CBC)",
        description: "Check for anemia or infection that could stress the heart",
        priority: "medium",
        timeframe: "Within 2 hours"
      }
    ],
    lifestyle: [
      {
        title: "Activity Restriction",
        description: "Complete bed rest until cardiac evaluation is complete",
        priority: "urgent",
        timeframe: "Immediate",
        notes: "No physical exertion until cleared by physician"
      },
      {
        title: "Dietary Modifications",
        description: "NPO (nothing by mouth) until evaluation complete",
        priority: "high",
        timeframe: "Immediate",
        notes: "In case emergency procedures are needed"
      },
      {
        title: "Stress Reduction",
        description: "Minimize anxiety and stress during evaluation",
        priority: "medium",
        timeframe: "Ongoing"
      }
    ],
    referrals: [
      {
        title: "Emergency Cardiology Consultation",
        description: "Immediate evaluation by cardiac specialist",
        priority: "urgent",
        timeframe: "Within 1 hour",
        notes: "Consider transfer to facility with cardiac catheterization if not available"
      },
      {
        title: "Emergency Department Transfer",
        description: "Transfer to higher level of care if symptoms worsen",
        priority: "urgent",
        timeframe: "If condition deteriorates",
        notes: "Have transport ready and IV access established"
      }
    ],
    followup: [
      {
        title: "Cardiac Risk Stratification",
        description: "Complete cardiac workup once acute phase resolved",
        priority: "high",
        timeframe: "Within 24-48 hours",
        notes: "May include stress testing or cardiac catheterization"
      },
      {
        title: "Blood Pressure Management",
        description: "Follow-up for hypertension management",
        priority: "medium",
        timeframe: "Within 1 week",
        notes: "May need medication adjustment"
      }
    ]
  };

  // Mock uncertainty data
  const mockUncertaintyData = {
    level: "moderate",
    reasons: [
      "Symptoms could indicate multiple conditions",
      "Limited diagnostic testing available in current setting",
      "Patient history incomplete for some risk factors",
      "Some symptoms are non-specific and could have various causes"
    ],
    recommendations: [
      "Obtain complete medical history including family cardiac history",
      "Perform comprehensive physical examination",
      "Consider additional diagnostic testing as outlined",
      "Maintain high index of suspicion for cardiac causes"
    ]
  };

  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: 'Diagnostic Results', path: '/diagnostic-results', icon: 'FileText', current: true }
  ];

  const patientContext = {
    name: mockPatient?.name,
    id: mockPatient?.id,
    age: mockPatient?.age
  };

  const analysisPhase = {
    phase: "Analysis Complete",
    confidence: mockPrimaryDiagnosis?.confidence,
    progress: 100
  };

  const handleQuickAction = (action, data) => {
    console.log(`Quick action: ${action}`, data);
    
    switch (action) {
      case 'print': console.log('Generating printable report...');
        break;
      case 'save': console.log('Saving to patient history...');
        break;
      case 'referral': console.log('Initiating referral process...');
        break;
      case 'export':
        console.log('Exporting analysis data...');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        isOffline={isOffline}
        userName="Dr. Smith"
        clinicName="HealthInsights Clinic"
        urgentAlerts={urgentAlerts}
        onProfileClick={() => console.log('Profile clicked')}
        onNotificationClick={() => console.log('Notification clicked')}
      />
      <PrimaryNavigation />
      <BreadcrumbTrail 
        customBreadcrumbs={customBreadcrumbs}
        patientContext={patientContext}
        analysisPhase={analysisPhase}
      />
      <main className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Patient Summary */}
              <PatientSummaryCard 
                patient={mockPatient}
                analysisData={mockAnalysisData}
              />

              {/* Uncertainty Indicator */}
              <UncertaintyIndicator uncertaintyData={mockUncertaintyData} />

              {/* Primary Diagnosis */}
              <PrimaryDiagnosisCard diagnosis={mockPrimaryDiagnosis} />

              {/* Alternative Diagnoses */}
              <AlternativeDiagnosesList alternatives={mockAlternativeDiagnoses} />

              {/* Risk Assessment */}
              <RiskAssessmentPanel riskAssessment={mockRiskAssessment} />

              {/* Recommended Next Steps */}
              <RecommendedNextSteps recommendations={mockRecommendations} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <QuickActionsSidebar 
                  patientId={mockPatient?.id}
                  analysisId={mockAnalysisData?.id}
                  onAction={handleQuickAction}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-break {
            page-break-before: always;
          }
          
          body {
            font-size: 12pt;
            line-height: 1.4;
          }
          
          .clinical-shadow-sm,
          .clinical-shadow-md {
            box-shadow: none !important;
            border: 1px solid #e2e8f0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DiagnosticResults;