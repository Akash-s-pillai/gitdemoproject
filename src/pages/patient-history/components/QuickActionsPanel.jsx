import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ patient, onAction }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleNewAnalysis = () => {
    if (onAction) onAction('new-analysis', patient);
    window.location.href = '/new-patient-analysis';
  };

  const handlePrintReport = async () => {
    setIsPrinting(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would generate and print a comprehensive report
      console.log('Printing comprehensive patient report for:', patient?.name);
      
      // Create a simple print window for demo
      const printWindow = window.open('', '_blank');
      printWindow?.document?.write(`
        <html>
          <head>
            <title>Patient Report - ${patient?.name}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 20px; }
              .section { margin-bottom: 20px; }
              .label { font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Patient Medical History Report</h1>
              <p>Generated on: ${new Date()?.toLocaleDateString()}</p>
            </div>
            <div class="section">
              <h2>Patient Information</h2>
              <p><span class="label">Name:</span> ${patient?.name}</p>
              <p><span class="label">ID:</span> ${patient?.id}</p>
              <p><span class="label">Phone:</span> ${patient?.phone}</p>
              <p><span class="label">Email:</span> ${patient?.email}</p>
            </div>
            <div class="section">
              <h2>Medical Information</h2>
              <p><span class="label">Blood Type:</span> ${patient?.bloodType}</p>
              <p><span class="label">Allergies:</span> ${patient?.allergies?.join(', ') || 'None'}</p>
              <p><span class="label">Chronic Conditions:</span> ${patient?.chronicConditions?.join(', ') || 'None'}</p>
            </div>
          </body>
        </html>
      `);
      printWindow?.document?.close();
      printWindow?.print();
    } catch (error) {
      console.error('Error printing report:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would export patient data for referrals
      const exportData = {
        patient: patient,
        exportDate: new Date()?.toISOString(),
        exportType: 'referral_package'
      };
      
      // Create downloadable JSON file for demo
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `patient_${patient?.id}_export_${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      link?.click();
      URL.revokeObjectURL(url);
      
      if (onAction) onAction('export-complete', patient);
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleScheduleFollowup = () => {
    if (onAction) onAction('schedule-followup', patient);
    // In a real app, this would open a scheduling interface
    console.log('Scheduling follow-up for:', patient?.name);
  };

  const handleEmergencyReferral = () => {
    if (onAction) onAction('emergency-referral', patient);
    // In a real app, this would initiate emergency referral process
    console.log('Initiating emergency referral for:', patient?.name);
  };

  const quickActions = [
    {
      id: 'new-analysis',
      label: 'New Analysis',
      description: 'Start new diagnostic analysis',
      icon: 'UserPlus',
      variant: 'default',
      action: handleNewAnalysis
    },
    {
      id: 'print-report',
      label: 'Print Report',
      description: 'Generate comprehensive patient report',
      icon: 'Printer',
      variant: 'outline',
      action: handlePrintReport,
      loading: isPrinting
    },
    {
      id: 'export-data',
      label: 'Export Data',
      description: 'Export patient data for referrals',
      icon: 'Download',
      variant: 'outline',
      action: handleExportData,
      loading: isExporting
    },
    {
      id: 'schedule-followup',
      label: 'Schedule Follow-up',
      description: 'Book next appointment',
      icon: 'Calendar',
      variant: 'outline',
      action: handleScheduleFollowup
    },
    {
      id: 'emergency-referral',
      label: 'Emergency Referral',
      description: 'Urgent specialist referral',
      icon: 'AlertTriangle',
      variant: 'destructive',
      action: handleEmergencyReferral
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              className="w-full justify-start space-x-3 p-4 h-auto"
              onClick={action?.action}
              disabled={action?.loading}
              loading={action?.loading}
            >
              <Icon name={action?.icon} size={20} />
              <div className="text-left">
                <div className="text-sm font-medium">{action?.label}</div>
                <div className="text-xs opacity-70">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Patient Care Tools */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Care Tools</h3>
        <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Patient Communication
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="FileText" size={16} className="mr-2" />
              Medical Records
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Users" size={16} className="mr-2" />
              Family History
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Pill" size={16} className="mr-2" />
              Medication History
            </Button>
          </div>
        </div>
      </div>
      {/* System Status */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">System Status</h3>
        <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Wifi" size={16} className="text-success" />
                <span className="text-sm text-foreground">Online</span>
              </div>
              <div className="w-2 h-2 bg-success rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Last Sync</span>
              </div>
              <span className="text-xs text-muted-foreground">2 min ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-foreground">HIPAA Compliant</span>
              </div>
              <Icon name="Check" size={16} className="text-success" />
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-error/5 border border-error/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Phone" size={20} className="text-error mt-0.5" />
          <div>
            <h4 className="font-medium text-error mb-1">Emergency Contact</h4>
            <p className="text-sm text-error/80 mb-2">
              For urgent medical situations requiring immediate specialist consultation
            </p>
            <Button variant="destructive" size="sm">
              <Icon name="Phone" size={14} className="mr-1" />
              Call Emergency Line
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;