import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SymptomsSection = ({ 
  formData, 
  onFormChange, 
  errors = {} 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const severityOptions = [
    { value: '1', label: 'Mild (1/10)' },
    { value: '2', label: 'Mild (2/10)' },
    { value: '3', label: 'Mild-Moderate (3/10)' },
    { value: '4', label: 'Moderate (4/10)' },
    { value: '5', label: 'Moderate (5/10)' },
    { value: '6', label: 'Moderate-Severe (6/10)' },
    { value: '7', label: 'Severe (7/10)' },
    { value: '8', label: 'Severe (8/10)' },
    { value: '9', label: 'Very Severe (9/10)' },
    { value: '10', label: 'Extreme (10/10)' }
  ];

  const durationOptions = [
    { value: 'less-than-hour', label: 'Less than 1 hour' },
    { value: 'few-hours', label: 'Few hours' },
    { value: '1-day', label: '1 day' },
    { value: '2-3-days', label: '2-3 days' },
    { value: '1-week', label: '1 week' },
    { value: '2-weeks', label: '2 weeks' },
    { value: '1-month', label: '1 month' },
    { value: '2-3-months', label: '2-3 months' },
    { value: '6-months', label: '6 months' },
    { value: '1-year', label: '1 year or more' }
  ];

  const commonSymptoms = [
    { id: 'fever', label: 'Fever', category: 'general' },
    { id: 'headache', label: 'Headache', category: 'neurological' },
    { id: 'cough', label: 'Cough', category: 'respiratory' },
    { id: 'shortness-breath', label: 'Shortness of breath', category: 'respiratory' },
    { id: 'chest-pain', label: 'Chest pain', category: 'cardiovascular' },
    { id: 'abdominal-pain', label: 'Abdominal pain', category: 'gastrointestinal' },
    { id: 'nausea', label: 'Nausea', category: 'gastrointestinal' },
    { id: 'vomiting', label: 'Vomiting', category: 'gastrointestinal' },
    { id: 'diarrhea', label: 'Diarrhea', category: 'gastrointestinal' },
    { id: 'fatigue', label: 'Fatigue', category: 'general' },
    { id: 'dizziness', label: 'Dizziness', category: 'neurological' },
    { id: 'joint-pain', label: 'Joint pain', category: 'musculoskeletal' },
    { id: 'muscle-pain', label: 'Muscle pain', category: 'musculoskeletal' },
    { id: 'rash', label: 'Skin rash', category: 'dermatological' },
    { id: 'weight-loss', label: 'Unexplained weight loss', category: 'general' },
    { id: 'night-sweats', label: 'Night sweats', category: 'general' }
  ];

  const filteredSymptoms = commonSymptoms?.filter(symptom =>
    symptom?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleSymptomToggle = (symptomId, checked) => {
    const currentSymptoms = formData?.selectedSymptoms || [];
    let updatedSymptoms;

    if (checked) {
      updatedSymptoms = [...currentSymptoms, {
        id: symptomId,
        severity: '5',
        duration: '1-day',
        notes: ''
      }];
    } else {
      updatedSymptoms = currentSymptoms?.filter(s => s?.id !== symptomId);
    }

    onFormChange('symptoms', { ...formData, selectedSymptoms: updatedSymptoms });
  };

  const handleSymptomUpdate = (symptomId, field, value) => {
    const currentSymptoms = formData?.selectedSymptoms || [];
    let updatedSymptoms = currentSymptoms?.map(symptom =>
      symptom?.id === symptomId ? { ...symptom, [field]: value } : symptom
    );

    onFormChange('symptoms', { ...formData, selectedSymptoms: updatedSymptoms });
  };

  const isSymptomSelected = (symptomId) => {
    return (formData?.selectedSymptoms || [])?.some(s => s?.id === symptomId);
  };

  const getSymptomData = (symptomId) => {
    return (formData?.selectedSymptoms || [])?.find(s => s?.id === symptomId) || {};
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Symptoms Assessment</h2>
        <p className="text-sm text-muted-foreground">
          Select all symptoms the patient is experiencing and provide details about severity and duration
        </p>
      </div>
      {/* Primary Symptoms */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Primary Symptoms</h3>
        
        <Input
          label="Describe main symptoms"
          type="text"
          placeholder="Patient's description of their main symptoms..."
          value={formData?.primarySymptoms || ''}
          onChange={(e) => onFormChange('symptoms', { ...formData, primarySymptoms: e?.target?.value })}
          error={errors?.primarySymptoms}
          description="In the patient's own words"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Overall Severity"
            options={severityOptions}
            value={formData?.overallSeverity || ''}
            onChange={(value) => onFormChange('symptoms', { ...formData, overallSeverity: value })}
            error={errors?.overallSeverity}
            placeholder="Rate overall severity"
          />

          <Select
            label="Symptom Duration"
            options={durationOptions}
            value={formData?.symptomDuration || ''}
            onChange={(value) => onFormChange('symptoms', { ...formData, symptomDuration: value })}
            error={errors?.symptomDuration}
            placeholder="How long have symptoms persisted?"
          />
        </div>
      </div>
      {/* Symptom Checklist */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Symptom Checklist</h3>
        
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto border border-border rounded-lg p-4">
          {filteredSymptoms?.map((symptom) => {
            const isSelected = isSymptomSelected(symptom?.id);
            const symptomData = getSymptomData(symptom?.id);

            return (
              <div key={symptom?.id} className="space-y-3 p-3 border border-border rounded-lg">
                <Checkbox
                  label={symptom?.label}
                  checked={isSelected}
                  onChange={(e) => handleSymptomToggle(symptom?.id, e?.target?.checked)}
                />
                {isSelected && (
                  <div className="ml-6 space-y-3">
                    <Select
                      label="Severity"
                      options={severityOptions}
                      value={symptomData?.severity || '5'}
                      onChange={(value) => handleSymptomUpdate(symptom?.id, 'severity', value)}
                      placeholder="Rate severity"
                    />

                    <Select
                      label="Duration"
                      options={durationOptions}
                      value={symptomData?.duration || '1-day'}
                      onChange={(value) => handleSymptomUpdate(symptom?.id, 'duration', value)}
                      placeholder="How long?"
                    />

                    <Input
                      label="Additional notes"
                      type="text"
                      placeholder="Any specific details about this symptom..."
                      value={symptomData?.notes || ''}
                      onChange={(e) => handleSymptomUpdate(symptom?.id, 'notes', e?.target?.value)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Additional Information</h3>
        
        <Input
          label="Symptom triggers"
          type="text"
          placeholder="What makes symptoms better or worse?"
          value={formData?.symptomTriggers || ''}
          onChange={(e) => onFormChange('symptoms', { ...formData, symptomTriggers: e?.target?.value })}
          error={errors?.symptomTriggers}
        />

        <Input
          label="Associated symptoms"
          type="text"
          placeholder="Any other symptoms not listed above?"
          value={formData?.associatedSymptoms || ''}
          onChange={(e) => onFormChange('symptoms', { ...formData, associatedSymptoms: e?.target?.value })}
          error={errors?.associatedSymptoms}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Symptoms interfere with daily activities"
            checked={formData?.interferesWithActivities || false}
            onChange={(e) => onFormChange('symptoms', { ...formData, interferesWithActivities: e?.target?.checked })}
          />

          <Checkbox
            label="Symptoms are getting worse"
            checked={formData?.symptomsWorsening || false}
            onChange={(e) => onFormChange('symptoms', { ...formData, symptomsWorsening: e?.target?.checked })}
          />
        </div>
      </div>
    </div>
  );
};

export default SymptomsSection;