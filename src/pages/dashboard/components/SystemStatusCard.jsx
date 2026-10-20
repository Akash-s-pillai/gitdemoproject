import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemStatusCard = ({ 
  isOnline = true, 
  lastSync = null, 
  pendingSync = 0,
  systemHealth = 'good',
  onSyncNow = null 
}) => {
  const getStatusConfig = () => {
    if (!isOnline) {
      return {
        color: 'warning',
        icon: 'WifiOff',
        title: 'Offline Mode',
        description: 'Working offline. Data will sync when connection resumes.',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        textColor: 'text-warning'
      };
    }
    
    if (systemHealth === 'poor') {
      return {
        color: 'error',
        icon: 'AlertTriangle',
        title: 'System Issues',
        description: 'Experiencing connectivity issues. Some features may be limited.',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        textColor: 'text-error'
      };
    }
    
    return {
      color: 'success',
      icon: 'CheckCircle',
      title: 'System Online',
      description: 'All systems operational. Data syncing normally.',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      textColor: 'text-success'
    };
  };

  const status = getStatusConfig();

  const formatLastSync = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const syncTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - syncTime) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return syncTime?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 clinical-shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">System Status</h3>
        {onSyncNow && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSyncNow}
            disabled={!isOnline}
            className="text-xs"
          >
            <Icon name="RefreshCw" size={14} className="mr-1" />
            Sync Now
          </Button>
        )}
      </div>
      {/* Main Status */}
      <div className={`flex items-center space-x-3 p-4 rounded-lg ${status?.bgColor} border ${status?.borderColor} mb-4`}>
        <Icon name={status?.icon} size={20} className={status?.textColor} />
        <div className="flex-1">
          <h4 className={`font-medium ${status?.textColor}`}>{status?.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{status?.description}</p>
        </div>
      </div>
      {/* Status Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Wifi" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Connection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-error'}`}></div>
            <span className="text-sm font-medium text-foreground">
              {isOnline ? 'Connected' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Last Sync</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {formatLastSync(lastSync)}
          </span>
        </div>

        {pendingSync > 0 && (
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm text-foreground">Pending Sync</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-warning">{pendingSync} items</span>
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Data Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={14} className="text-success" />
            <span className="text-sm font-medium text-success">Encrypted</span>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs justify-start"
            onClick={() => {}}
          >
            <Icon name="Download" size={14} className="mr-1" />
            Export Data
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs justify-start"
            onClick={() => {}}
          >
            <Icon name="Settings" size={14} className="mr-1" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusCard;