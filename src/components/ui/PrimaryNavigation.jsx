import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PrimaryNavigation = ({ className = "" }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Patient overview and system status'
    },
    {
      label: 'New Analysis',
      path: '/new-patient-analysis',
      icon: 'UserPlus',
      description: 'Start new patient diagnostic analysis',
      priority: true
    },
    {
      label: 'Results',
      path: '/diagnostic-results',
      icon: 'FileText',
      description: 'View diagnostic findings and recommendations'
    },
    {
      label: 'Patient History',
      path: '/patient-history',
      icon: 'History',
      description: 'Review patient care timeline'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`sticky top-16 bg-surface border-b border-border z-50 ${className}`}>
        <div className="px-6">
          <div className="flex items-center justify-between h-12">
            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActive(item?.path) ? "default" : "ghost"}
                  className={`
                    flex items-center space-x-2 px-4 py-2 clinical-transition
                    ${isActive(item?.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                    ${item?.priority ? 'ring-1 ring-accent/20' : ''}
                  `}
                  onClick={() => handleNavigation(item?.path)}
                >
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    className={isActive(item?.path) ? 'text-primary-foreground' : 'text-current'} 
                  />
                  <span className="text-sm font-medium">{item?.label}</span>
                  {item?.priority && (
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  )}
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-muted-foreground"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleNavigation('/new-patient-analysis')}
              >
                <Icon name="Plus" size={14} className="mr-1" />
                Quick Start
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-1100 md:hidden">
          <div className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActive(item?.path) ? "default" : "ghost"}
                className={`
                  w-full justify-start space-x-3 p-4 clinical-transition
                  ${isActive(item?.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                onClick={() => handleNavigation(item?.path)}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={isActive(item?.path) ? 'text-primary-foreground' : 'text-current'} 
                />
                <div className="text-left">
                  <div className="text-sm font-medium">{item?.label}</div>
                  <div className="text-xs opacity-70">{item?.description}</div>
                </div>
                {item?.priority && (
                  <div className="ml-auto w-2 h-2 bg-accent rounded-full"></div>
                )}
              </Button>
            ))}
          </div>

          {/* Mobile Quick Actions */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border">
            <Button
              variant="default"
              className="w-full"
              onClick={() => handleNavigation('/new-patient-analysis')}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Start New Analysis
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PrimaryNavigation;