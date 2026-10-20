import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalHeader = ({ 
  isOffline = false, 
  userName = "Akash S Pillai", 
  clinicName = "HealthInsights Clinic",
  onProfileClick,
  onNotificationClick,
  urgentAlerts = 0
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    if (onProfileClick) onProfileClick();
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (onNotificationClick) onNotificationClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo and Clinic Name */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-foreground"
            >
              <path
                d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                fill="currentColor"
              />
              <path
                d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                fill="currentColor"
              />
              <path
                d="M8 14H16V16H8V14Z"
                fill="currentColor"
              />
              <path
                d="M10 18H14V20H10V18Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">{clinicName}</h1>
            <p className="text-xs text-muted-foreground">Rural Healthcare Solutions</p>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Offline Status Indicator */}
          {isOffline && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 border border-warning/20 rounded-full">
              <Icon name="WifiOff" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Offline Mode</span>
            </div>
          )}

          {/* Sync Status */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {}}
          >
            <Icon name="RefreshCw" size={20} className="text-muted-foreground" />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleNotificationClick}
            >
              <Icon name="Bell" size={20} className="text-muted-foreground" />
              {urgentAlerts > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-error-foreground bg-error rounded-full">
                  {urgentAlerts > 9 ? '9+' : urgentAlerts}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg clinical-shadow-md z-1100">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {urgentAlerts > 0 ? (
                    <div className="p-4 space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-error/5 border border-error/20 rounded-lg">
                        <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-popover-foreground">Critical Patient Alert</p>
                          <p className="text-xs text-muted-foreground">Patient ID: 12345 requires immediate attention</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      <Icon name="Check" size={24} className="mx-auto mb-2" />
                      <p className="text-sm">No urgent alerts</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 px-3"
              onClick={handleProfileClick}
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground hidden md:block">{userName}</span>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-48 bg-popover border border-border rounded-lg clinical-shadow-md z-1100">
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                    <Icon name="User" size={16} className="mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                    <Icon name="Settings" size={16} className="mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Help
                  </Button>
                  <div className="border-t border-border my-1"></div>
                  <Button variant="ghost" className="w-full justify-start text-error hover:text-error" onClick={() => {}}>
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;