import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LabResultsSection = ({ 
  formData, 
  onFormChange, 
  errors = {} 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const vitalSigns = [
    { id: 'bloodPressure', label: 'Blood Pressure', unit: 'mmHg', placeholder: '120/80', normalRange: '90-120/60-80' },
    { id: 'heartRate', label: 'Heart Rate', unit: 'bpm', placeholder: '72', normalRange: '60-100' },
    { id: 'temperature', label: 'Temperature', unit: '°F', placeholder: '98.6', normalRange: '97.8-99.1' },
    { id: 'respiratoryRate', label: 'Respiratory Rate', unit: '/min', placeholder: '16', normalRange: '12-20' },
    { id: 'oxygenSaturation', label: 'Oxygen Saturation', unit: '%', placeholder: '98', normalRange: '95-100' },
    { id: 'weight', label: 'Weight', unit: 'lbs', placeholder: '150', normalRange: 'Varies' },
    { id: 'height', label: 'Height', unit: 'inches', placeholder: '68', normalRange: 'Varies' }
  ];

  const commonLabTests = [
    { id: 'cbc', label: 'Complete Blood Count (CBC)', category: 'hematology' },
    { id: 'bmp', label: 'Basic Metabolic Panel', category: 'chemistry' },
    { id: 'lipid', label: 'Lipid Panel', category: 'chemistry' },
    { id: 'hba1c', label: 'Hemoglobin A1C', category: 'chemistry' },
    { id: 'tsh', label: 'Thyroid Stimulating Hormone', category: 'endocrine' },
    { id: 'urinalysis', label: 'Urinalysis', category: 'urinalysis' },
    { id: 'liver', label: 'Liver Function Tests', category: 'chemistry' },
    { id: 'kidney', label: 'Kidney Function Tests', category: 'chemistry' },
    { id: 'cardiac', label: 'Cardiac Enzymes', category: 'chemistry' },
    { id: 'coagulation', label: 'Coagulation Studies', category: 'hematology' }
  ];

  const handleVitalSignChange = (vitalId, value) => {
    const currentVitals = formData?.vitalSigns || {};
    onFormChange('labResults', { 
      ...formData, 
      vitalSigns: { ...currentVitals, [vitalId]: value }
    });
  };

  const handleLabTestToggle = (testId, checked) => {
    const currentTests = formData?.selectedLabTests || [];
    let updatedTests;

    if (checked) {
      updatedTests = [...currentTests, { id: testId, results: '', notes: '', abnormal: false }];
    } else {
      updatedTests = currentTests?.filter(test => test?.id !== testId);
    }

    onFormChange('labResults', { ...formData, selectedLabTests: updatedTests });
  };

  const handleLabTestUpdate = (testId, field, value) => {
    const currentTests = formData?.selectedLabTests || [];
    let updatedTests = currentTests?.map(test =>
      test?.id === testId ? { ...test, [field]: value } : test
    );

    onFormChange('labResults', { ...formData, selectedLabTests: updatedTests });
  };

  const isLabTestSelected = (testId) => {
    return (formData?.selectedLabTests || [])?.some(test => test?.id === testId);
  };

  const getLabTestData = (testId) => {
    return (formData?.selectedLabTests || [])?.find(test => test?.id === testId) || {};
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newFiles = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      uploadDate: new Date()?.toISOString()
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    onFormChange('labResults', { 
      ...formData, 
      uploadedFiles: [...uploadedFiles, ...newFiles]
    });
  };

  const removeFile = (fileId) => {
    const updatedFiles = uploadedFiles?.filter(file => file?.id !== fileId);
    setUploadedFiles(updatedFiles);
    onFormChange('labResults', { ...formData, uploadedFiles: updatedFiles });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Lab Results & Vital Signs</h2>
        <p className="text-sm text-muted-foreground">
          Record current vital signs and any available laboratory test results
        </p>
      </div>
      {/* Vital Signs */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Vital Signs</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vitalSigns?.map((vital) => (
            <div key={vital?.id} className="space-y-2">
              <Input
                label={`${vital?.label} (${vital?.unit})`}
                type="text"
                placeholder={vital?.placeholder}
                value={(formData?.vitalSigns && formData?.vitalSigns?.[vital?.id]) || ''}
                onChange={(e) => handleVitalSignChange(vital?.id, e?.target?.value)}
                error={errors?.[vital?.id]}
                description={`Normal: ${vital?.normalRange}`}
              />
            </div>
          ))}
        </div>

        <Input
          label="Additional vital signs notes"
          type="text"
          placeholder="Any additional observations about vital signs..."
          value={formData?.vitalSignsNotes || ''}
          onChange={(e) => onFormChange('labResults', { ...formData, vitalSignsNotes: e?.target?.value })}
          error={errors?.vitalSignsNotes}
        />
      </div>
      {/* Laboratory Tests */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Laboratory Tests</h3>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select the laboratory tests that have been performed and enter the results
          </p>

          <div className="space-y-4">
            {commonLabTests?.map((test) => {
              const isSelected = isLabTestSelected(test?.id);
              const testData = getLabTestData(test?.id);

              return (
                <div key={test?.id} className="border border-border rounded-lg p-4">
                  <Checkbox
                    label={test?.label}
                    checked={isSelected}
                    onChange={(e) => handleLabTestToggle(test?.id, e?.target?.checked)}
                  />
                  {isSelected && (
                    <div className="mt-4 ml-6 space-y-3">
                      <Input
                        label="Test Results"
                        type="text"
                        placeholder="Enter test results and values..."
                        value={testData?.results || ''}
                        onChange={(e) => handleLabTestUpdate(test?.id, 'results', e?.target?.value)}
                        description="Include specific values and units"
                      />

                      <Input
                        label="Additional Notes"
                        type="text"
                        placeholder="Any additional notes about this test..."
                        value={testData?.notes || ''}
                        onChange={(e) => handleLabTestUpdate(test?.id, 'notes', e?.target?.value)}
                      />

                      <Checkbox
                        label="Results are abnormal"
                        checked={testData?.abnormal || false}
                        onChange={(e) => handleLabTestUpdate(test?.id, 'abnormal', e?.target?.checked)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Input
          label="Other laboratory tests"
          type="text"
          placeholder="List any other tests not mentioned above..."
          value={formData?.otherLabTests || ''}
          onChange={(e) => onFormChange('labResults', { ...formData, otherLabTests: e?.target?.value })}
          error={errors?.otherLabTests}
        />
      </div>
      {/* File Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Upload Lab Reports</h3>
        
        <div className="border-2 border-dashed border-border rounded-lg p-6">
          <div className="text-center">
            <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Upload digital copies of lab reports, X-rays, or other test results
            </p>
            
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Choose Files
            </Button>
            
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
            </p>
          </div>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Uploaded Files</h4>
            <div className="space-y-2">
              {uploadedFiles?.map((file) => (
                <div key={file?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{file?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file?.size)} • Uploaded {new Date(file.uploadDate)?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file?.id)}
                    className="text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Imaging Studies */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Imaging Studies</h3>
        
        <Input
          label="X-rays performed"
          type="text"
          placeholder="List any X-rays and findings..."
          value={formData?.xrays || ''}
          onChange={(e) => onFormChange('labResults', { ...formData, xrays: e?.target?.value })}
          error={errors?.xrays}
        />

        <Input
          label="Other imaging studies"
          type="text"
          placeholder="CT scans, MRI, ultrasound, etc..."
          value={formData?.otherImaging || ''}
          onChange={(e) => onFormChange('labResults', { ...formData, otherImaging: e?.target?.value })}
          error={errors?.otherImaging}
        />
      </div>
      {/* Clinical Notes */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Clinical Assessment</h3>
        
        <Input
          label="Physical examination findings"
          type="text"
          placeholder="Key findings from physical examination..."
          value={formData?.physicalExam || ''}
          onChange={(e) => onFormChange('labResults', { ...formData, physicalExam: e?.target?.value })}
          error={errors?.physicalExam}
        />

        <Input
          label="Clinical impression"
          type="text"
          placeholder="Initial clinical assessment or working diagnosis..."
          value={formData?.clinicalImpression || ''}
          onChange={(e) => onFormChange('labResults', { ...formData, clinicalImpression: e?.target?.value })}
          error={errors?.clinicalImpression}
        />
      </div>
    </div>
  );
};

export default LabResultsSection;