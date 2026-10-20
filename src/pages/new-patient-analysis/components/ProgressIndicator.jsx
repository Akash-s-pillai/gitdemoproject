import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  currentStep, 
  totalSteps = 5,
  onStepClick,
  isStepAccessible = () => true
}) => {
  const steps = [
    { id: 0, label: 'Patient Info', icon: 'User' },
    { id: 1, label: 'Symptoms', icon: 'Activity' },
    { id: 2, label: 'Medical History', icon: 'FileText' },
    { id: 3, label: 'Lab Results', icon: 'TestTube' },
    { id: 4, label: 'Review', icon: 'CheckCircle' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (stepId) => {
    const status = getStepStatus(stepId);
    const baseClasses = 'flex items-center justify-center w-10 h-10 rounded-full border-2 clinical-transition';
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-success border-success text-success-foreground`;
      case 'current':
        return `${baseClasses} bg-primary border-primary text-primary-foreground`;
      case 'upcoming':
        return `${baseClasses} bg-background border-border text-muted-foreground`;
      default:
        return baseClasses;
    }
  };

  const getConnectorClasses = (stepId) => {
    const isCompleted = stepId < currentStep;
    return `flex-1 h-0.5 ${isCompleted ? 'bg-success' : 'bg-border'}`;
  };

  const handleStepClick = (stepId) => {
    if (isStepAccessible(stepId) && onStepClick) {
      onStepClick(stepId);
    }
  };

  return (
    <div className="bg-surface border-b border-border py-4">
      <div className="px-6">
        {/* Desktop Progress Indicator */}
        <div className="hidden md:flex items-center justify-between">
          {steps?.map((step, index) => (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => handleStepClick(step?.id)}
                  disabled={!isStepAccessible(step?.id)}
                  className={`${getStepClasses(step?.id)} ${
                    isStepAccessible(step?.id) ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'
                  }`}
                >
                  {getStepStatus(step?.id) === 'completed' ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <Icon name={step?.icon} size={20} />
                  )}
                </button>
                <div className="text-center">
                  <p className={`text-sm font-medium ${
                    getStepStatus(step?.id) === 'current' ?'text-primary' 
                      : getStepStatus(step?.id) === 'completed' ?'text-success' :'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Step {step?.id + 1} of {totalSteps}
                  </p>
                </div>
              </div>
              
              {index < steps?.length - 1 && (
                <div className={getConnectorClasses(step?.id)}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Progress Indicator */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={getStepClasses(currentStep)}>
                <Icon name={steps?.[currentStep]?.icon} size={20} />
              </div>
              <div>
                <p className="font-medium text-foreground">{steps?.[currentStep]?.label}</p>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {totalSteps}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full clinical-transition"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-between mt-4">
            {currentStep > 0 && (
              <button
                onClick={() => handleStepClick(currentStep - 1)}
                className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground clinical-transition"
              >
                <Icon name="ChevronLeft" size={16} />
                <span>{steps?.[currentStep - 1]?.label}</span>
              </button>
            )}
            
            <div className="flex-1"></div>
            
            {currentStep < steps?.length - 1 && (
              <button
                onClick={() => handleStepClick(currentStep + 1)}
                className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground clinical-transition"
                disabled={!isStepAccessible(currentStep + 1)}
              >
                <span>{steps?.[currentStep + 1]?.label}</span>
                <Icon name="ChevronRight" size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;