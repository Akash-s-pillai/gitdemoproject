import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ProgressIndicator from './components/ProgressIndicator';
import PatientInfoSection from './components/PatientInfoSection';
import SymptomsSection from './components/SymptomsSection';
import MedicalHistorySection from './components/MedicalHistorySection';
import LabResultsSection from './components/LabResultsSection';
import ReviewSection from './components/ReviewSection';
import NavigationControls from './components/NavigationControls';
import Icon from '../../components/AppIcon';

const NewPatientAnalysis = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    patientInfo: {},
    symptoms: {},
    medicalHistory: {},
    labResults: {}
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const totalSteps = 5;
  const stepTitles = ['Patient Info', 'Symptoms', 'Medical History', 'Lab Results', 'Review'];

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('newPatientAnalysis');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData?.formData || formData);
        setCurrentStep(parsedData?.currentStep || 0);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      saveProgress();
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSave);
  }, [formData, currentStep]);

  const saveProgress = async () => {
    setIsSaving(true);
    try {
      const dataToSave = {
        formData,
        currentStep,
        lastSaved: new Date()?.toISOString()
      };
      localStorage.setItem('newPatientAnalysis', JSON.stringify(dataToSave));
      
      // Simulate API call for online sync
      if (!isOffline) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Clear errors for the updated section
    if (errors?.[section]) {
      setErrors(prev => ({
        ...prev,
        [section]: {}
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0: // Patient Info
        if (!formData?.patientInfo?.fullName?.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        if (!formData?.patientInfo?.age) {
          newErrors.age = 'Age is required';
        }
        if (!formData?.patientInfo?.gender) {
          newErrors.gender = 'Gender is required';
        }
        if (!formData?.patientInfo?.phoneNumber?.trim()) {
          newErrors.phoneNumber = 'Phone number is required';
        }
        if (!formData?.patientInfo?.chiefComplaint?.trim()) {
          newErrors.chiefComplaint = 'Chief complaint is required';
        }
        break;
        
      case 1: // Symptoms
        if (!formData?.symptoms?.primarySymptoms?.trim()) {
          newErrors.primarySymptoms = 'Primary symptoms description is required';
        }
        break;
        
      case 2: // Medical History
        // Medical history is optional but we can add validation if needed
        break;
        
      case 3: // Lab Results
        // Lab results are optional
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [step]: newErrors }));
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
        saveProgress();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    // Allow navigation to previous steps or current step
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const isStepAccessible = (stepIndex) => {
    return stepIndex <= currentStep;
  };

  const handleEdit = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate analysis processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear saved data
      localStorage.removeItem('newPatientAnalysis');
      
      // Navigate to results page
      navigate('/diagnostic-results', { 
        state: { 
          analysisData: formData,
          patientId: `PAT-${Date.now()}`,
          analysisId: `ANA-${Date.now()}`
        }
      });
    } catch (error) {
      console.error('Error submitting analysis:', error);
      // Handle error - show notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PatientInfoSection
            formData={formData?.patientInfo}
            onFormChange={handleFormChange}
            errors={errors?.[0] || {}}
          />
        );
      case 1:
        return (
          <SymptomsSection
            formData={formData?.symptoms}
            onFormChange={handleFormChange}
            errors={errors?.[1] || {}}
          />
        );
      case 2:
        return (
          <MedicalHistorySection
            formData={formData?.medicalHistory}
            onFormChange={handleFormChange}
            errors={errors?.[2] || {}}
          />
        );
      case 3:
        return (
          <LabResultsSection
            formData={formData?.labResults}
            onFormChange={handleFormChange}
            errors={errors?.[3] || {}}
          />
        );
      case 4:
        return (
          <ReviewSection
            formData={formData}
            onEdit={handleEdit}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: 'New Patient Analysis', path: '/new-patient-analysis', icon: 'UserPlus', current: true }
  ];

  const analysisPhase = currentStep < 4 ? {
    phase: `${stepTitles?.[currentStep]} Collection`,
    progress: Math.round(((currentStep + 1) / totalSteps) * 100),
    confidence: null
  } : {
    phase: 'Ready for Analysis',
    progress: 100,
    confidence: null
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        isOffline={isOffline}
        userName="Dr. Sarah Johnson"
        clinicName="HealthInsights Clinic"
        urgentAlerts={0}
        onProfileClick={() => {}}
        onNotificationClick={() => {}}
      />
      <PrimaryNavigation />
      <BreadcrumbTrail 
        customBreadcrumbs={customBreadcrumbs}
        analysisPhase={analysisPhase}
      />
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={handleStepClick}
        isStepAccessible={isStepAccessible}
      />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Offline Notice */}
          {isOffline && (
            <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="WifiOff" size={20} className="text-warning" />
                <div>
                  <p className="font-medium text-warning">Working Offline</p>
                  <p className="text-sm text-warning/80">
                    Your progress is being saved locally. Data will sync when connection is restored.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-card border border-border rounded-lg clinical-shadow-sm">
            <div className="p-8">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </main>
      <NavigationControls
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSave={saveProgress}
        isNextDisabled={Object.keys(errors?.[currentStep] || {})?.length > 0}
        isSaving={isSaving}
        showSave={!isSubmitting}
      />
      {/* Loading Overlay for Submission */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1300 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 text-center clinical-shadow-md">
            <div className="animate-spin w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Processing Analysis</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our diagnostic system is analyzing the patient data. This may take a few moments.
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Shield" size={14} className="text-success" />
              <span>Secure processing in progress</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPatientAnalysis;