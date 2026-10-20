import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PatientInfoSection = ({ 
  formData, 
  onFormChange, 
  errors = {} 
}) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const bloodTypeOptions = [
    { value: 'a-positive', label: 'A+' },
    { value: 'a-negative', label: 'A-' },
    { value: 'b-positive', label: 'B+' },
    { value: 'b-negative', label: 'B-' },
    { value: 'ab-positive', label: 'AB+' },
    { value: 'ab-negative', label: 'AB-' },
    { value: 'o-positive', label: 'O+' },
    { value: 'o-negative', label: 'O-' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('patientInfo', { ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Patient Information</h2>
        <p className="text-sm text-muted-foreground">
          Enter basic patient demographics and contact information
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Personal Details</h3>
          
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter patient's full name"
            value={formData?.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age"
              type="number"
              placeholder="Age"
              value={formData?.age || ''}
              onChange={(e) => handleInputChange('age', e?.target?.value)}
              error={errors?.age}
              min="0"
              max="150"
              required
            />

            <Select
              label="Gender"
              options={genderOptions}
              value={formData?.gender || ''}
              onChange={(value) => handleInputChange('gender', value)}
              error={errors?.gender}
              placeholder="Select gender"
              required
            />
          </div>

          <Input
            label="Date of Birth"
            type="date"
            value={formData?.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            error={errors?.dateOfBirth}
          />

          <Select
            label="Blood Type"
            options={bloodTypeOptions}
            value={formData?.bloodType || ''}
            onChange={(value) => handleInputChange('bloodType', value)}
            error={errors?.bloodType}
            placeholder="Select blood type"
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
          
          <Input
            label="Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData?.phoneNumber || ''}
            onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
            error={errors?.phoneNumber}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="patient@example.com"
            value={formData?.email || ''}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
          />

          <Input
            label="Emergency Contact Name"
            type="text"
            placeholder="Emergency contact full name"
            value={formData?.emergencyContactName || ''}
            onChange={(e) => handleInputChange('emergencyContactName', e?.target?.value)}
            error={errors?.emergencyContactName}
          />

          <Input
            label="Emergency Contact Phone"
            type="tel"
            placeholder="(555) 987-6543"
            value={formData?.emergencyContactPhone || ''}
            onChange={(e) => handleInputChange('emergencyContactPhone', e?.target?.value)}
            error={errors?.emergencyContactPhone}
          />
        </div>
      </div>
      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Address</h3>
        
        <Input
          label="Street Address"
          type="text"
          placeholder="123 Main Street"
          value={formData?.streetAddress || ''}
          onChange={(e) => handleInputChange('streetAddress', e?.target?.value)}
          error={errors?.streetAddress}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="City"
            value={formData?.city || ''}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
          />

          <Input
            label="State"
            type="text"
            placeholder="State"
            value={formData?.state || ''}
            onChange={(e) => handleInputChange('state', e?.target?.value)}
            error={errors?.state}
          />

          <Input
            label="ZIP Code"
            type="text"
            placeholder="12345"
            value={formData?.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
          />
        </div>
      </div>
      {/* Visit Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Visit Details</h3>
        
        <Input
          label="Chief Complaint"
          type="text"
          placeholder="Primary reason for today's visit"
          value={formData?.chiefComplaint || ''}
          onChange={(e) => handleInputChange('chiefComplaint', e?.target?.value)}
          error={errors?.chiefComplaint}
          description="Brief description of the main health concern"
          required
        />

        <Input
          label="Visit Date"
          type="date"
          value={formData?.visitDate || new Date()?.toISOString()?.split('T')?.[0]}
          onChange={(e) => handleInputChange('visitDate', e?.target?.value)}
          error={errors?.visitDate}
          required
        />
      </div>
    </div>
  );
};

export default PatientInfoSection;