import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsSidebar = ({ 
  urgentPatients = 0,
  isOnline = true,
  onNewAnalysis = null,
  onEmergencyReferral = null,
  onPatientSearch = null 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const quickActions = [
    {
      id: 'new-analysis',
      label: 'New Patient Analysis',
      description: 'Start diagnostic analysis for new patient',
      icon: 'UserPlus',
      variant: 'default',
      priority: true,
      offline: true,
      action: () => {
        if (onNewAnalysis) {
          onNewAnalysis();
        } else {
          window.location.href = '/new-patient-analysis';
        }
      }
    },
    {
      id: 'emergency-referral',
      label: 'Emergency Referral',
      description: 'Urgent patient referral to specialist',
      icon: 'AlertTriangle',
      variant: 'destructive',
      priority: false,
      offline: false,
      action: onEmergencyReferral
    },
    {
      id: 'patient-search',
      label: 'Find Patient',
      description: 'Search existing patient records',
      icon: 'Search',
      variant: 'outline',
      priority: false,
      offline: true,
      action: () => setShowSearch(!showSearch)
    },
    {
      id: 'diagnostic-results',
      label: 'View Results',
      description: 'Review diagnostic findings',
      icon: 'FileText',
      variant: 'ghost',
      priority: false,
      offline: true,
      action: () => window.location.href = '/diagnostic-results'
    }
  ];

  const recentPatients = [
    {
      id: 'P001',
      name: 'Sarah Johnson',
      lastVisit: '2025-01-10T07:30:00',
      status: 'follow-up'
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      lastVisit: '2025-01-09T16:45:00',
      status: 'completed'
    },
    {
      id: 'P003',
      name: 'Emily Rodriguez',
      lastVisit: '2025-01-09T14:20:00',
      status: 'urgent'
    }
  ];

  const handlePatientSelect = (patient) => {
    if (onPatientSearch) {
      onPatientSearch(patient);
    }
    setShowSearch(false);
    setSearchQuery('');
  };

  const formatLastVisit = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getPatientStatusBadge = (status) => {
    const statusConfig = {
      urgent: { color: 'bg-error text-error-foreground', label: 'Urgent' },
      'follow-up': { color: 'bg-warning text-warning-foreground', label: 'Follow-up' },
      completed: { color: 'bg-success text-success-foreground', label: 'Completed' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.completed;
    
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Urgent Alerts */}
      {urgentPatients > 0 && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <h3 className="font-semibold text-error">Urgent Attention</h3>
          </div>
          <p className="text-sm text-error mb-3">
            {urgentPatients} patient{urgentPatients > 1 ? 's' : ''} require immediate attention
          </p>
          <Button variant="destructive" size="sm" className="w-full">
            <Icon name="Eye" size={14} className="mr-1" />
            View Urgent Cases
          </Button>
        </div>
      )}
      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              className={`
                w-full justify-start space-x-3 p-3 h-auto
                ${action?.priority ? 'ring-1 ring-accent/20' : ''}
                ${!isOnline && !action?.offline ? 'opacity-50' : ''}
              `}
              onClick={action?.action}
              disabled={!isOnline && !action?.offline}
            >
              <Icon name={action?.icon} size={16} />
              <div className="text-left flex-1">
                <div className="text-sm font-medium">{action?.label}</div>
                <div className="text-xs opacity-70">{action?.description}</div>
              </div>
              {!isOnline && !action?.offline && (
                <Icon name="WifiOff" size={12} className="text-muted-foreground" />
              )}
              {action?.priority && (
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              )}
            </Button>
          ))}
        </div>
      </div>
      {/* Patient Search */}
      {showSearch && (
        <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Find Patient</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="relative mb-3">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
            />
          </div>

          <div className="space-y-2">
            {recentPatients?.filter(patient => 
                patient?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                patient?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase())
              )?.map((patient) => (
                <div
                  key={patient?.id}
                  className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer clinical-transition"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{patient?.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {patient?.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getPatientStatusBadge(patient?.status)}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatLastVisit(patient?.lastVisit)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {/* Recent Patients */}
      {!showSearch && (
        <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Patients</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/patient-history'}
            >
              <Icon name="ArrowRight" size={14} />
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentPatients?.slice(0, 3)?.map((patient) => (
              <div
                key={patient?.id}
                className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer clinical-transition"
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{patient?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatLastVisit(patient?.lastVisit)}
                  </p>
                </div>
                {getPatientStatusBadge(patient?.status)}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Offline Sync Status */}
      {!isOnline && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="WifiOff" size={16} className="text-warning" />
            <h3 className="font-semibold text-warning">Offline Mode</h3>
          </div>
          <p className="text-sm text-warning mb-3">
            Working offline. Changes will sync when connection resumes.
          </p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span>3 pending changes</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionsSidebar;