import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PatientHeaderCard = ({ patient, onEdit, onSave, onCancel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: patient?.name,
    phone: patient?.phone,
    email: patient?.email,
    address: patient?.address,
    emergencyContact: patient?.emergencyContact
  });

  const handleEdit = () => {
    setIsEditing(true);
    if (onEdit) onEdit();
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) onSave(editData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: patient?.name,
      phone: patient?.phone,
      email: patient?.email,
      address: patient?.address,
      emergencyContact: patient?.emergencyContact
    });
    if (onCancel) onCancel();
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today?.getFullYear() - birth?.getFullYear();
    const monthDiff = today?.getMonth() - birth?.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birth?.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 clinical-shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={32} className="text-primary" />
          </div>
          <div>
            {isEditing ? (
              <Input
                type="text"
                value={editData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                className="text-xl font-semibold mb-2"
                placeholder="Patient Name"
              />
            ) : (
              <h1 className="text-xl font-semibold text-foreground">{patient?.name}</h1>
            )}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>ID: {patient?.id}</span>
              <span>•</span>
              <span>{calculateAge(patient?.dateOfBirth)} years old</span>
              <span>•</span>
              <span className="capitalize">{patient?.gender}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <Icon name="X" size={16} className="mr-1" />
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                <Icon name="Check" size={16} className="mr-1" />
                Save
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Icon name="Edit" size={16} className="mr-1" />
              Edit
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground flex items-center">
            <Icon name="Phone" size={16} className="mr-2 text-primary" />
            Contact Information
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Phone:</span>
              {isEditing ? (
                <Input
                  type="tel"
                  value={editData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  className="mt-1"
                  placeholder="Phone number"
                />
              ) : (
                <span className="ml-2 text-foreground">{patient?.phone}</span>
              )}
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span>
              {isEditing ? (
                <Input
                  type="email"
                  value={editData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  className="mt-1"
                  placeholder="Email address"
                />
              ) : (
                <span className="ml-2 text-foreground">{patient?.email}</span>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground flex items-center">
            <Icon name="MapPin" size={16} className="mr-2 text-primary" />
            Address
          </h3>
          <div className="text-sm">
            {isEditing ? (
              <Input
                type="text"
                value={editData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
                placeholder="Full address"
              />
            ) : (
              <p className="text-foreground">{patient?.address}</p>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-2 text-primary" />
            Emergency Contact
          </h3>
          <div className="text-sm">
            {isEditing ? (
              <Input
                type="text"
                value={editData?.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
                placeholder="Emergency contact details"
              />
            ) : (
              <p className="text-foreground">{patient?.emergencyContact}</p>
            )}
          </div>
        </div>
      </div>
      {/* Medical Information */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Blood Type</h4>
            <p className="text-sm text-muted-foreground">{patient?.bloodType}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Allergies</h4>
            <p className="text-sm text-muted-foreground">
              {patient?.allergies?.length > 0 ? patient?.allergies?.join(', ') : 'None reported'}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Chronic Conditions</h4>
            <p className="text-sm text-muted-foreground">
              {patient?.chronicConditions?.length > 0 ? patient?.chronicConditions?.join(', ') : 'None reported'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeaderCard;