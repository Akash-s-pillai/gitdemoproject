import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewSection = ({ 
  formData, 
  onEdit,
  onSubmit,
  isSubmitting = false
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatList = (items) => {
    if (!items || items?.length === 0) return 'None reported';
    return items?.join(', ');
  };

  const getSelectedSymptoms = () => {
    if (!formData?.symptoms?.selectedSymptoms) return [];
    return formData?.symptoms?.selectedSymptoms?.map(symptom => {
      const commonSymptoms = {
        'fever': 'Fever',
        'headache': 'Headache',
        'cough': 'Cough',
        'shortness-breath': 'Shortness of breath',
        'chest-pain': 'Chest pain',
        'abdominal-pain': 'Abdominal pain',
        'nausea': 'Nausea',
        'vomiting': 'Vomiting',
        'diarrhea': 'Diarrhea',
        'fatigue': 'Fatigue',
        'dizziness': 'Dizziness',
        'joint-pain': 'Joint pain',
        'muscle-pain': 'Muscle pain',
        'rash': 'Skin rash',
        'weight-loss': 'Unexplained weight loss',
        'night-sweats': 'Night sweats'
      };
      return `${commonSymptoms?.[symptom?.id] || symptom?.id} (Severity: ${symptom?.severity}/10, Duration: ${symptom?.duration})`;
    });
  };

  const getSelectedConditions = () => {
    if (!formData?.medicalHistory?.medicalConditions) return [];
    const conditionMap = {
      'diabetes': 'Diabetes',
      'hypertension': 'High Blood Pressure',
      'heart-disease': 'Heart Disease',
      'asthma': 'Asthma',
      'copd': 'COPD',
      'arthritis': 'Arthritis',
      'depression': 'Depression',
      'anxiety': 'Anxiety',
      'thyroid': 'Thyroid Disease',
      'kidney-disease': 'Kidney Disease',
      'liver-disease': 'Liver Disease',
      'cancer': 'Cancer',
      'stroke': 'Stroke',
      'seizures': 'Seizures/Epilepsy',
      'allergies': 'Severe Allergies'
    };
    return formData?.medicalHistory?.medicalConditions?.map(id => conditionMap?.[id] || id);
  };

  const getVitalSigns = () => {
    const vitals = formData?.labResults?.vitalSigns || {};
    return [
      vitals?.bloodPressure && `Blood Pressure: ${vitals?.bloodPressure} mmHg`,
      vitals?.heartRate && `Heart Rate: ${vitals?.heartRate} bpm`,
      vitals?.temperature && `Temperature: ${vitals?.temperature}°F`,
      vitals?.respiratoryRate && `Respiratory Rate: ${vitals?.respiratoryRate}/min`,
      vitals?.oxygenSaturation && `Oxygen Saturation: ${vitals?.oxygenSaturation}%`,
      vitals?.weight && `Weight: ${vitals?.weight} lbs`,
      vitals?.height && `Height: ${vitals?.height} inches`
    ]?.filter(Boolean);
  };

  const getLabTests = () => {
    if (!formData?.labResults?.selectedLabTests) return [];
    const testMap = {
      'cbc': 'Complete Blood Count (CBC)',
      'bmp': 'Basic Metabolic Panel',
      'lipid': 'Lipid Panel',
      'hba1c': 'Hemoglobin A1C',
      'tsh': 'Thyroid Stimulating Hormone',
      'urinalysis': 'Urinalysis',
      'liver': 'Liver Function Tests',
      'kidney': 'Kidney Function Tests',
      'cardiac': 'Cardiac Enzymes',
      'coagulation': 'Coagulation Studies'
    };
    return formData?.labResults?.selectedLabTests?.map(test => ({
      name: testMap?.[test?.id] || test?.id,
      results: test?.results,
      abnormal: test?.abnormal
    }));
  };

  const calculateBMI = () => {
    const vitals = formData?.labResults?.vitalSigns || {};
    if (vitals?.weight && vitals?.height) {
      const weightKg = parseFloat(vitals?.weight) * 0.453592;
      const heightM = parseFloat(vitals?.height) * 0.0254;
      const bmi = weightKg / (heightM * heightM);
      return bmi?.toFixed(1);
    }
    return null;
  };

  const sections = [
    {
      title: 'Patient Information',
      step: 0,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Personal Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Name:</span> {formData?.patientInfo?.fullName || 'Not provided'}</p>
              <p><span className="font-medium">Age:</span> {formData?.patientInfo?.age || 'Not provided'}</p>
              <p><span className="font-medium">Gender:</span> {formData?.patientInfo?.gender || 'Not provided'}</p>
              <p><span className="font-medium">Date of Birth:</span> {formatDate(formData?.patientInfo?.dateOfBirth)}</p>
              <p><span className="font-medium">Blood Type:</span> {formData?.patientInfo?.bloodType || 'Not provided'}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Contact Information</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Phone:</span> {formData?.patientInfo?.phoneNumber || 'Not provided'}</p>
              <p><span className="font-medium">Email:</span> {formData?.patientInfo?.email || 'Not provided'}</p>
              <p><span className="font-medium">Address:</span> {formData?.patientInfo?.streetAddress || 'Not provided'}</p>
              <p><span className="font-medium">City, State ZIP:</span> {`${formData?.patientInfo?.city || ''} ${formData?.patientInfo?.state || ''} ${formData?.patientInfo?.zipCode || ''}`?.trim() || 'Not provided'}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-medium text-foreground mb-2">Visit Information</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Chief Complaint:</span> {formData?.patientInfo?.chiefComplaint || 'Not provided'}</p>
              <p><span className="font-medium">Visit Date:</span> {formatDate(formData?.patientInfo?.visitDate)}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Symptoms',
      step: 1,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Primary Symptoms</h4>
            <p className="text-sm text-muted-foreground mb-2">{formData?.symptoms?.primarySymptoms || 'Not provided'}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><span className="font-medium">Overall Severity:</span> {formData?.symptoms?.overallSeverity ? `${formData?.symptoms?.overallSeverity}/10` : 'Not rated'}</p>
              <p><span className="font-medium">Duration:</span> {formData?.symptoms?.symptomDuration || 'Not specified'}</p>
            </div>
          </div>
          
          {getSelectedSymptoms()?.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Selected Symptoms</h4>
              <ul className="text-sm space-y-1">
                {getSelectedSymptoms()?.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <Icon name="Circle" size={4} className="mt-2 mr-2 text-primary" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formData?.symptoms?.symptomTriggers && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Triggers & Additional Info</h4>
              <p className="text-sm"><span className="font-medium">Triggers:</span> {formData?.symptoms?.symptomTriggers}</p>
              {formData?.symptoms?.associatedSymptoms && (
                <p className="text-sm"><span className="font-medium">Associated symptoms:</span> {formData?.symptoms?.associatedSymptoms}</p>
              )}
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Medical History',
      step: 2,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Current Medical Conditions</h4>
            <p className="text-sm">{formatList(getSelectedConditions())}</p>
            {formData?.medicalHistory?.otherConditions && (
              <p className="text-sm mt-1"><span className="font-medium">Other:</span> {formData?.medicalHistory?.otherConditions}</p>
            )}
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Medications</h4>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Prescription:</span> {formData?.medicalHistory?.prescriptionMeds || 'None reported'}</p>
              <p><span className="font-medium">OTC/Supplements:</span> {formData?.medicalHistory?.otcMeds || 'None reported'}</p>
              <p><span className="font-medium">Drug Allergies:</span> {formData?.medicalHistory?.drugAllergies || 'None reported'}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Lifestyle Factors</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <p><span className="font-medium">Smoking:</span> {formData?.medicalHistory?.smokingStatus || 'Not specified'}</p>
              <p><span className="font-medium">Alcohol:</span> {formData?.medicalHistory?.alcoholConsumption || 'Not specified'}</p>
              <p><span className="font-medium">Exercise:</span> {formData?.medicalHistory?.exerciseLevel || 'Not specified'}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Lab Results & Vital Signs',
      step: 3,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Vital Signs</h4>
            {getVitalSigns()?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {getVitalSigns()?.map((vital, index) => (
                  <p key={index}>{vital}</p>
                ))}
                {calculateBMI() && (
                  <p><span className="font-medium">BMI:</span> {calculateBMI()}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No vital signs recorded</p>
            )}
          </div>

          {getLabTests()?.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Laboratory Tests</h4>
              <div className="space-y-2">
                {getLabTests()?.map((test, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{test?.name}:</span>
                      {test?.abnormal && (
                        <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">Abnormal</span>
                      )}
                    </div>
                    {test?.results && <p className="text-muted-foreground ml-2">{test?.results}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData?.labResults?.uploadedFiles?.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Uploaded Files</h4>
              <div className="space-y-1">
                {formData?.labResults?.uploadedFiles?.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name="FileText" size={16} className="text-muted-foreground" />
                    <span>{file?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Review & Submit</h2>
        <p className="text-sm text-muted-foreground">
          Please review all information before submitting for diagnostic analysis
        </p>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections?.map((section) => (
          <div key={section?.step} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-card-foreground">{section?.title}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(section?.step)}
              >
                <Icon name="Edit" size={16} className="mr-1" />
                Edit
              </Button>
            </div>
            {section?.content}
          </div>
        ))}
      </div>
      {/* Analysis Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-2">Ready for Analysis</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The diagnostic analysis system will process this patient information to provide:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                Preliminary diagnosis suggestions with confidence levels
              </li>
              <li className="flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                Risk assessment and urgency indicators
              </li>
              <li className="flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                Recommended next steps and treatment options
              </li>
              <li className="flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                Referral recommendations if needed
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button
          variant="default"
          size="lg"
          onClick={onSubmit}
          loading={isSubmitting}
          className="px-8"
        >
          <Icon name="Play" size={20} className="mr-2" />
          {isSubmitting ? 'Processing Analysis...' : 'Start Diagnostic Analysis'}
        </Button>
      </div>
      {/* Privacy Notice */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          All patient data is encrypted and stored securely in compliance with HIPAA regulations.
          This analysis is for diagnostic assistance only and does not replace professional medical judgment.
        </p>
      </div>
    </div>
  );
};

export default ReviewSection;