import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientSummaryCard = ({ patient, analysisData }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/50 border-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 clinical-shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{patient?.name}</h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>ID: {patient?.id}</span>
              <span>•</span>
              <span>{patient?.age} years old</span>
              <span>•</span>
              <span>{patient?.gender}</span>
            </div>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getUrgencyColor(analysisData?.urgency)}`}>
          <div className="flex items-center space-x-1">
            <Icon 
              name={analysisData?.urgency === 'high' ? 'AlertTriangle' : analysisData?.urgency === 'medium' ? 'AlertCircle' : 'CheckCircle'} 
              size={14} 
            />
            <span>{analysisData?.urgency?.charAt(0)?.toUpperCase() + analysisData?.urgency?.slice(1)} Priority</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Analysis Date</p>
          <p className="text-sm text-foreground">{formatDate(analysisData?.timestamp)}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Chief Complaint</p>
          <p className="text-sm text-foreground">{patient?.chiefComplaint}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Analysis ID</p>
          <p className="text-sm text-foreground font-mono">{analysisData?.id}</p>
        </div>
      </div>
      {patient?.vitals && (
        <div className="mt-4 pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Vitals</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(patient?.vitals)?.map(([key, value]) => (
              <div key={key} className="text-center p-2 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground capitalize">{key?.replace(/([A-Z])/g, ' $1')?.trim()}</p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSummaryCard;