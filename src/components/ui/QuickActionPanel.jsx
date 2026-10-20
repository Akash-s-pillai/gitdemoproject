import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionPanel = ({ 
  isFloating = false,
  position = 'sidebar', // 'sidebar' | 'floating' | 'dashboard'
  onlineStatus = true,
  urgentPatients = 0,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    {
      id: 'new-analysis',
      label: 'New Analysis',
      description: 'Start patient diagnostic analysis',
      icon: 'UserPlus',
      path: '/new-patient-analysis',
      priority: 'high',
      offline: true
    },
    {
      id: 'emergency-referral',
      label: 'Emergency Referral',
      description: 'Urgent patient referral',
      icon: 'AlertTriangle',
      action: 'emergency',
      priority: 'critical',
      offline: false
    },
    {
      id: 'patient-search',
      label: 'Find Patient',
      description: 'Search patient records',
      icon: 'Search',
      action: 'search',
      priority: 'medium',
      offline: true
    },
    {
      id: 'sync-data',
      label: 'Sync Data',
      description: 'Synchronize offline changes',
      icon: 'RefreshCw',
      action: 'sync',
      priority: 'medium',
      offline: false
    }
  ];

  const handleAction = (action) => {
    switch (action?.id) {
      case 'new-analysis':
        window.location.href = action?.path;
        break;
      case 'emergency-referral':
        // Handle emergency referral
        console.log('Emergency referral initiated');
        break;
      case 'patient-search':
        setIsExpanded(true);
        break;
      case 'sync-data':
        // Handle data sync
        console.log('Data sync initiated');
        break;
      default:
        break;
    }
  };

  const getActionVariant = (priority) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'outline';
      default: return 'ghost';
    }
  };

  const isActionDisabled = (action) => {
    return !onlineStatus && !action?.offline;
  };

  // Floating Action Button (Mobile)
  if (isFloating) {
    return (
      <div className={`fixed bottom-6 right-6 z-1200 ${className}`}>
        {!isExpanded ? (
          <Button
            variant="default"
            size="lg"
            className="w-14 h-14 rounded-full clinical-shadow-md"
            onClick={() => setIsExpanded(true)}
          >
            <Icon name="Plus" size={24} />
          </Button>
        ) : (
          <div className="space-y-3">
            {quickActions?.map((action) => (
              <Button
                key={action?.id}
                variant={getActionVariant(action?.priority)}
                size="lg"
                className="w-14 h-14 rounded-full clinical-shadow-md"
                onClick={() => handleAction(action)}
                disabled={isActionDisabled(action)}
                title={action?.label}
              >
                <Icon name={action?.icon} size={20} />
              </Button>
            ))}
            <Button
              variant="ghost"
              size="lg"
              className="w-14 h-14 rounded-full clinical-shadow-md bg-surface"
              onClick={() => setIsExpanded(false)}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Sidebar Panel
  if (position === 'sidebar') {
    return (
      <div className={`bg-surface border border-border rounded-lg p-4 clinical-shadow-sm ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Quick Actions</h3>
          {urgentPatients > 0 && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-error/10 border border-error/20 rounded-full">
              <Icon name="AlertCircle" size={12} className="text-error" />
              <span className="text-xs font-medium text-error">{urgentPatients}</span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={getActionVariant(action?.priority)}
              className="w-full justify-start space-x-3 p-3"
              onClick={() => handleAction(action)}
              disabled={isActionDisabled(action)}
            >
              <Icon name={action?.icon} size={16} />
              <div className="text-left">
                <div className="text-sm font-medium">{action?.label}</div>
                <div className="text-xs opacity-70">{action?.description}</div>
              </div>
              {!onlineStatus && !action?.offline && (
                <Icon name="WifiOff" size={12} className="ml-auto text-muted-foreground" />
              )}
            </Button>
          ))}
        </div>
        {/* Patient Search Expansion */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="space-y-3">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search patient ID or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Search
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Dashboard Panel
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {quickActions?.map((action) => (
        <Button
          key={action?.id}
          variant={getActionVariant(action?.priority)}
          className="h-24 flex-col space-y-2 p-4"
          onClick={() => handleAction(action)}
          disabled={isActionDisabled(action)}
        >
          <Icon name={action?.icon} size={24} />
          <div className="text-center">
            <div className="text-sm font-medium">{action?.label}</div>
            <div className="text-xs opacity-70">{action?.description}</div>
          </div>
          {!onlineStatus && !action?.offline && (
            <Icon name="WifiOff" size={12} className="absolute top-2 right-2 text-muted-foreground" />
          )}
        </Button>
      ))}
    </div>
  );
};

export default QuickActionPanel;