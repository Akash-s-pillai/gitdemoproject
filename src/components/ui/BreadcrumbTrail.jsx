import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BreadcrumbTrail = ({ 
  patientContext = null,
  analysisPhase = null,
  customBreadcrumbs = null,
  className = ""
}) => {
  const location = useLocation();

  const getPageInfo = (pathname) => {
    const pageMap = {
      '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
      '/new-patient-analysis': { label: 'New Analysis', icon: 'UserPlus' },
      '/diagnostic-results': { label: 'Diagnostic Results', icon: 'FileText' },
      '/patient-history': { label: 'Patient History', icon: 'History' }
    };
    return pageMap?.[pathname] || { label: 'Unknown', icon: 'HelpCircle' };
  };

  const currentPage = getPageInfo(location?.pathname);

  const handleNavigation = (path) => {
    if (path) {
      window.location.href = path;
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Use custom breadcrumbs if provided, otherwise generate default
  const breadcrumbs = customBreadcrumbs || [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: currentPage?.label, path: location?.pathname, icon: currentPage?.icon, current: true }
  ];

  return (
    <div className={`bg-background border-b border-border py-3 ${className}`}>
      <div className="px-6">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs?.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`
                    flex items-center space-x-1 px-2 py-1 clinical-transition
                    ${crumb?.current 
                      ? 'text-foreground font-medium cursor-default' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                  onClick={() => !crumb?.current && handleNavigation(crumb?.path)}
                  disabled={crumb?.current}
                >
                  {crumb?.icon && (
                    <Icon 
                      name={crumb?.icon} 
                      size={14} 
                      className={crumb?.current ? 'text-primary' : 'text-current'} 
                    />
                  )}
                  <span>{crumb?.label}</span>
                </Button>
              </React.Fragment>
            ))}
          </nav>

          {/* Context Information */}
          <div className="flex items-center space-x-4 text-sm">
            {/* Patient Context */}
            {patientContext && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-muted/50 rounded-full">
                <Icon name="User" size={14} className="text-primary" />
                <span className="font-medium text-foreground">
                  {patientContext?.name || `Patient #${patientContext?.id}`}
                </span>
                {patientContext?.age && (
                  <span className="text-muted-foreground">
                    • {patientContext?.age}y
                  </span>
                )}
              </div>
            )}

            {/* Analysis Phase */}
            {analysisPhase && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="font-medium text-accent">
                  {analysisPhase?.phase}
                </span>
                {analysisPhase?.confidence && (
                  <span className="text-xs text-muted-foreground">
                    {analysisPhase?.confidence}% confidence
                  </span>
                )}
              </div>
            )}

            {/* Timestamp */}
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span className="text-xs">
                {formatTimestamp(new Date())}
              </span>
            </div>
          </div>
        </div>

        {/* Analysis Progress Bar (if in analysis phase) */}
        {analysisPhase && analysisPhase?.progress !== undefined && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Analysis Progress</span>
              <span>{analysisPhase?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-accent h-1.5 rounded-full clinical-transition"
                style={{ width: `${analysisPhase?.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbTrail;