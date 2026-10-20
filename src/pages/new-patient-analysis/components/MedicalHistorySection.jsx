import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const MedicalHistorySection = ({ 
  formData, 
  onFormChange, 
  errors = {} 
}) => {
  const commonConditions = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hypertension', label: 'High Blood Pressure' },
    { id: 'heart-disease', label: 'Heart Disease' },
    { id: 'asthma', label: 'Asthma' },
    { id: 'copd', label: 'COPD' },
    { id: 'arthritis', label: 'Arthritis' },
    { id: 'depression', label: 'Depression' },
    { id: 'anxiety', label: 'Anxiety' },
    { id: 'thyroid', label: 'Thyroid Disease' },
    { id: 'kidney-disease', label: 'Kidney Disease' },
    { id: 'liver-disease', label: 'Liver Disease' },
    { id: 'cancer', label: 'Cancer' },
    { id: 'stroke', label: 'Stroke' },
    { id: 'seizures', label: 'Seizures/Epilepsy' },
    { id: 'allergies', label: 'Severe Allergies' }
  ];

  const familyConditions = [
    { id: 'family-diabetes', label: 'Diabetes' },
    { id: 'family-heart-disease', label: 'Heart Disease' },
    { id: 'family-cancer', label: 'Cancer' },
    { id: 'family-hypertension', label: 'High Blood Pressure' },
    { id: 'family-stroke', label: 'Stroke' },
    { id: 'family-mental-health', label: 'Mental Health Conditions' },
    { id: 'family-kidney-disease', label: 'Kidney Disease' },
    { id: 'family-thyroid', label: 'Thyroid Disease' }
  ];

  const smokingOptions = [
    { value: 'never', label: 'Never smoked' },
    { value: 'former', label: 'Former smoker' },
    { value: 'current', label: 'Current smoker' }
  ];

  const alcoholOptions = [
    { value: 'none', label: 'No alcohol consumption' },
    { value: 'occasional', label: 'Occasional (1-2 drinks/week)' },
    { value: 'moderate', label: 'Moderate (3-7 drinks/week)' },
    { value: 'heavy', label: 'Heavy (8+ drinks/week)' }
  ];

  const exerciseOptions = [
    { value: 'none', label: 'No regular exercise' },
    { value: 'light', label: 'Light exercise (1-2 times/week)' },
    { value: 'moderate', label: 'Moderate exercise (3-4 times/week)' },
    { value: 'vigorous', label: 'Vigorous exercise (5+ times/week)' }
  ];

  const handleConditionToggle = (conditionId, checked) => {
    const currentConditions = formData?.medicalConditions || [];
    let updatedConditions;

    if (checked) {
      updatedConditions = [...currentConditions, conditionId];
    } else {
      updatedConditions = currentConditions?.filter(id => id !== conditionId);
    }

    onFormChange('medicalHistory', { ...formData, medicalConditions: updatedConditions });
  };

  const handleFamilyConditionToggle = (conditionId, checked) => {
    const currentConditions = formData?.familyHistory || [];
    let updatedConditions;

    if (checked) {
      updatedConditions = [...currentConditions, conditionId];
    } else {
      updatedConditions = currentConditions?.filter(id => id !== conditionId);
    }

    onFormChange('medicalHistory', { ...formData, familyHistory: updatedConditions });
  };

  const handleInputChange = (field, value) => {
    onFormChange('medicalHistory', { ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Medical History</h2>
        <p className="text-sm text-muted-foreground">
          Provide comprehensive medical background information for accurate diagnosis
        </p>
      </div>
      {/* Current Medical Conditions */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Current Medical Conditions</h3>
        
        <CheckboxGroup label="Select all conditions that apply">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {commonConditions?.map((condition) => (
              <Checkbox
                key={condition?.id}
                label={condition?.label}
                checked={(formData?.medicalConditions || [])?.includes(condition?.id)}
                onChange={(e) => handleConditionToggle(condition?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </CheckboxGroup>

        <Input
          label="Other medical conditions"
          type="text"
          placeholder="List any conditions not mentioned above..."
          value={formData?.otherConditions || ''}
          onChange={(e) => handleInputChange('otherConditions', e?.target?.value)}
          error={errors?.otherConditions}
        />
      </div>
      {/* Current Medications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Current Medications</h3>
        
        <Input
          label="Prescription medications"
          type="text"
          placeholder="List all prescription medications with dosages..."
          value={formData?.prescriptionMeds || ''}
          onChange={(e) => handleInputChange('prescriptionMeds', e?.target?.value)}
          error={errors?.prescriptionMeds}
          description="Include medication name, dosage, and frequency"
        />

        <Input
          label="Over-the-counter medications"
          type="text"
          placeholder="List any OTC medications, vitamins, or supplements..."
          value={formData?.otcMeds || ''}
          onChange={(e) => handleInputChange('otcMeds', e?.target?.value)}
          error={errors?.otcMeds}
        />

        <Input
          label="Drug allergies"
          type="text"
          placeholder="List any known drug allergies and reactions..."
          value={formData?.drugAllergies || ''}
          onChange={(e) => handleInputChange('drugAllergies', e?.target?.value)}
          error={errors?.drugAllergies}
          description="Include specific reactions experienced"
        />
      </div>
      {/* Surgical History */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Surgical History</h3>
        
        <Input
          label="Previous surgeries"
          type="text"
          placeholder="List all previous surgeries with approximate dates..."
          value={formData?.surgicalHistory || ''}
          onChange={(e) => handleInputChange('surgicalHistory', e?.target?.value)}
          error={errors?.surgicalHistory}
        />

        <Input
          label="Hospitalizations"
          type="text"
          placeholder="List any significant hospitalizations..."
          value={formData?.hospitalizations || ''}
          onChange={(e) => handleInputChange('hospitalizations', e?.target?.value)}
          error={errors?.hospitalizations}
        />
      </div>
      {/* Family History */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Family History</h3>
        
        <CheckboxGroup label="Select conditions present in immediate family (parents, siblings, children)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {familyConditions?.map((condition) => (
              <Checkbox
                key={condition?.id}
                label={condition?.label}
                checked={(formData?.familyHistory || [])?.includes(condition?.id)}
                onChange={(e) => handleFamilyConditionToggle(condition?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </CheckboxGroup>

        <Input
          label="Additional family history"
          type="text"
          placeholder="Any other significant family medical history..."
          value={formData?.additionalFamilyHistory || ''}
          onChange={(e) => handleInputChange('additionalFamilyHistory', e?.target?.value)}
          error={errors?.additionalFamilyHistory}
        />
      </div>
      {/* Lifestyle Factors */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Lifestyle Factors</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select
              label="Smoking status"
              options={smokingOptions}
              value={formData?.smokingStatus || ''}
              onChange={(value) => handleInputChange('smokingStatus', value)}
              error={errors?.smokingStatus}
              placeholder="Select smoking status"
            />

            {formData?.smokingStatus === 'former' && (
              <Input
                label="Years since quitting"
                type="number"
                placeholder="Years"
                value={formData?.yearsQuitSmoking || ''}
                onChange={(e) => handleInputChange('yearsQuitSmoking', e?.target?.value)}
                min="0"
              />
            )}

            {(formData?.smokingStatus === 'current' || formData?.smokingStatus === 'former') && (
              <Input
                label="Packs per day (when smoking)"
                type="number"
                placeholder="Packs per day"
                value={formData?.packsPerDay || ''}
                onChange={(e) => handleInputChange('packsPerDay', e?.target?.value)}
                min="0"
                step="0.5"
              />
            )}
          </div>

          <div className="space-y-4">
            <Select
              label="Alcohol consumption"
              options={alcoholOptions}
              value={formData?.alcoholConsumption || ''}
              onChange={(value) => handleInputChange('alcoholConsumption', value)}
              error={errors?.alcoholConsumption}
              placeholder="Select alcohol consumption level"
            />

            <Select
              label="Exercise level"
              options={exerciseOptions}
              value={formData?.exerciseLevel || ''}
              onChange={(value) => handleInputChange('exerciseLevel', value)}
              error={errors?.exerciseLevel}
              placeholder="Select exercise level"
            />
          </div>
        </div>

        <Input
          label="Occupational hazards"
          type="text"
          placeholder="Any workplace exposures or hazards..."
          value={formData?.occupationalHazards || ''}
          onChange={(e) => handleInputChange('occupationalHazards', e?.target?.value)}
          error={errors?.occupationalHazards}
        />
      </div>
      {/* Women's Health (if applicable) */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Women's Health (if applicable)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Last menstrual period"
            type="date"
            value={formData?.lastMenstrualPeriod || ''}
            onChange={(e) => handleInputChange('lastMenstrualPeriod', e?.target?.value)}
            error={errors?.lastMenstrualPeriod}
          />

          <Input
            label="Number of pregnancies"
            type="number"
            placeholder="0"
            value={formData?.pregnancies || ''}
            onChange={(e) => handleInputChange('pregnancies', e?.target?.value)}
            min="0"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Currently pregnant"
            checked={formData?.currentlyPregnant || false}
            onChange={(e) => handleInputChange('currentlyPregnant', e?.target?.checked)}
          />

          <Checkbox
            label="Currently breastfeeding"
            checked={formData?.breastfeeding || false}
            onChange={(e) => handleInputChange('breastfeeding', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalHistorySection;