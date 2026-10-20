import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NavigationControls = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
  isNextDisabled = false,
  isPreviousDisabled = false,
  isSaving = false,
  showSave = true,
  nextLabel = 'Next',
  previousLabel = 'Previous'
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="bg-surface border-t border-border py-4">
      <div className="px-6">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <div className="flex items-center space-x-3">
            {!isFirstStep && (
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isPreviousDisabled}
                className="flex items-center space-x-2"
              >
                <Icon name="ChevronLeft" size={16} />
                <span>{previousLabel}</span>
              </Button>
            )}
          </div>

          {/* Center - Save Button */}
          <div className="flex items-center space-x-3">
            {showSave && (
              <Button
                variant="ghost"
                onClick={onSave}
                loading={isSaving}
                className="flex items-center space-x-2"
              >
                <Icon name="Save" size={16} />
                <span>{isSaving ? 'Saving...' : 'Save Progress'}</span>
              </Button>
            )}
          </div>

          {/* Next Button */}
          <div className="flex items-center space-x-3">
            {!isLastStep ? (
              <Button
                variant="default"
                onClick={onNext}
                disabled={isNextDisabled}
                className="flex items-center space-x-2"
              >
                <span>{nextLabel}</span>
                <Icon name="ChevronRight" size={16} />
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={onNext}
                disabled={isNextDisabled}
                className="flex items-center space-x-2 bg-success hover:bg-success/90"
              >
                <Icon name="CheckCircle" size={16} />
                <span>Review & Submit</span>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden mt-4">
          <div className="grid grid-cols-2 gap-3">
            {!isFirstStep && (
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isPreviousDisabled}
                className="flex items-center justify-center space-x-2"
              >
                <Icon name="ChevronLeft" size={16} />
                <span>{previousLabel}</span>
              </Button>
            )}
            
            <Button
              variant="default"
              onClick={onNext}
              disabled={isNextDisabled}
              className={`flex items-center justify-center space-x-2 ${
                isFirstStep ? 'col-span-2' : ''
              } ${isLastStep ? 'bg-success hover:bg-success/90' : ''}`}
            >
              {isLastStep ? (
                <>
                  <Icon name="CheckCircle" size={16} />
                  <span>Review & Submit</span>
                </>
              ) : (
                <>
                  <span>{nextLabel}</span>
                  <Icon name="ChevronRight" size={16} />
                </>
              )}
            </Button>
          </div>

          {showSave && (
            <div className="mt-3 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={onSave}
                loading={isSaving}
                className="flex items-center space-x-2"
              >
                <Icon name="Save" size={14} />
                <span>{isSaving ? 'Saving...' : 'Save Progress'}</span>
              </Button>
            </div>
          )}
        </div>

        {/* Progress Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {totalSteps} • 
            {isLastStep ? ' Ready to submit' : ' Continue to complete analysis'}
          </p>
          
          {/* Auto-save indicator */}
          <div className="flex items-center justify-center space-x-1 mt-1">
            <Icon name="Shield" size={12} className="text-success" />
            <span className="text-xs text-success">Auto-saved locally</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationControls;