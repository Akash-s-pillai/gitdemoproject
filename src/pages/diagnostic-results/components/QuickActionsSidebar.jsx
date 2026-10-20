import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsSidebar = ({ patientId, analysisId, onAction }) => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePrintReport = async () => {
    setIsGeneratingReport(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.print();
      if (onAction) onAction('print', { patientId, analysisId });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleSaveToHistory = async () => {
    setIsSaving(true);
    try {
      // Simulate saving to patient history
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (onAction) onAction('save', { patientId, analysisId });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInitiateReferral = () => {
    if (onAction) onAction('referral', { patientId, analysisId });
  };

  const handleNewAnalysis = () => {
    window.location.href = '/new-patient-analysis';
  };

  const handleViewHistory = () => {
    window.location.href = `/patient-history?patient=${patientId}`;
  };

  const handleExportData = () => {
    if (onAction) onAction('export', { patientId, analysisId });
  };

  const quickActions = [
    {
      id: 'print',
      label: 'Print Report',
      description: 'Generate printable diagnostic report',
      icon: 'Printer',
      variant: 'default',
      action: handlePrintReport,
      loading: isGeneratingReport
    },
    {
      id: 'save',
      label: 'Save to History',
      description: 'Add to patient medical records',
      icon: 'Save',
      variant: 'outline',
      action: handleSaveToHistory,
      loading: isSaving
    },
    {
      id: 'referral',
      label: 'Initiate Referral',
      description: 'Create specialist referral',
      icon: 'UserCheck',
      variant: 'outline',
      action: handleInitiateReferral
    },
    {
      id: 'export',
      label: 'Export Data',
      description: 'Download analysis data',
      icon: 'Download',
      variant: 'ghost',
      action: handleExportData
    }
  ];

  const navigationActions = [
    {
      id: 'new-analysis',
      label: 'New Analysis',
      description: 'Start fresh patient analysis',
      icon: 'Plus',
      variant: 'default',
      action: handleNewAnalysis
    },
    {
      id: 'view-history',
      label: 'Patient History',
      description: 'View all patient records',
      icon: 'History',
      variant: 'outline',
      action: handleViewHistory
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
        <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={18} className="text-accent" />
          <span>Quick Actions</span>
        </h3>
        
        <div className="space-y-2">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              className="w-full justify-start space-x-3 p-3 h-auto"
              onClick={action?.action}
              loading={action?.loading}
              disabled={action?.loading}
            >
              <Icon name={action?.icon} size={16} />
              <div className="text-left">
                <div className="text-sm font-medium">{action?.label}</div>
                <div className="text-xs opacity-70">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Navigation */}
      <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
        <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Navigation" size={18} className="text-primary" />
          <span>Navigation</span>
        </h3>
        
        <div className="space-y-2">
          {navigationActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              className="w-full justify-start space-x-3 p-3 h-auto"
              onClick={action?.action}
            >
              <Icon name={action?.icon} size={16} />
              <div className="text-left">
                <div className="text-sm font-medium">{action?.label}</div>
                <div className="text-xs opacity-70">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Analysis Info */}
      <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
        <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Info" size={18} className="text-muted-foreground" />
          <span>Analysis Info</span>
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Patient ID:</span>
            <span className="font-mono text-foreground">{patientId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Analysis ID:</span>
            <span className="font-mono text-foreground">{analysisId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Generated:</span>
            <span className="text-foreground">
              {new Date()?.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
      {/* Help & Support */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={16} className="text-accent mt-0.5" />
          <div className="text-sm">
            <h4 className="font-medium text-accent mb-1">Need Help?</h4>
            <p className="text-muted-foreground mb-3">
              Contact support for assistance with diagnostic interpretations or technical issues.
            </p>
            <Button variant="outline" size="sm" className="text-accent border-accent/20">
              <Icon name="MessageCircle" size={14} className="mr-1" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSidebar;