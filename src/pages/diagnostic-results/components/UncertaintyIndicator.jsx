import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UncertaintyIndicator = ({ uncertaintyData }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getUncertaintyColor = (level) => {
    switch (level) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'moderate': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/30 border-border';
    }
  };

  const getUncertaintyIcon = (level) => {
    switch (level) {
      case 'high': return 'AlertTriangle';
      case 'moderate': return 'AlertCircle';
      case 'low': return 'CheckCircle';
      default: return 'HelpCircle';
    }
  };

  const getConfidenceDescription = (level) => {
    switch (level) {
      case 'high':
        return 'Significant uncertainty in diagnosis. Additional clinical assessment strongly recommended.';
      case 'moderate':
        return 'Moderate uncertainty present. Consider additional tests or specialist consultation.';
      case 'low':
        return 'Low uncertainty. Diagnosis appears well-supported by available data.';
      default:
        return 'Uncertainty level could not be determined.';
    }
  };

  if (!uncertaintyData || uncertaintyData?.level === 'low') {
    return null;
  }

  return (
    <div className={`rounded-lg border p-4 clinical-shadow-sm ${getUncertaintyColor(uncertaintyData?.level)}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Icon name={getUncertaintyIcon(uncertaintyData?.level)} size={20} />
          <div className="flex-1">
            <h4 className="font-semibold mb-1">
              {uncertaintyData?.level === 'high' ? 'High Diagnostic Uncertainty' : 'Moderate Diagnostic Uncertainty'}
            </h4>
            <p className="text-sm opacity-90 mb-3">
              {getConfidenceDescription(uncertaintyData?.level)}
            </p>
            
            {uncertaintyData?.reasons && uncertaintyData?.reasons?.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium mb-2">Contributing Factors:</p>
                <ul className="text-sm space-y-1">
                  {uncertaintyData?.reasons?.slice(0, showDetails ? undefined : 2)?.map((reason, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={12} className="mt-1 opacity-70" />
                      <span className="opacity-90">{reason}</span>
                    </li>
                  ))}
                </ul>
                
                {uncertaintyData?.reasons?.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 p-0 h-auto text-current"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? 'Show Less' : `Show ${uncertaintyData?.reasons?.length - 2} More`}
                    <Icon 
                      name={showDetails ? "ChevronUp" : "ChevronDown"} 
                      size={14} 
                      className="ml-1" 
                    />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showDetails && uncertaintyData?.recommendations && (
        <div className="mt-4 pt-4 border-t border-current/20">
          <h5 className="text-sm font-medium mb-2">Recommended Actions:</h5>
          <div className="space-y-2">
            {uncertaintyData?.recommendations?.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="CheckSquare" size={14} className="mt-0.5 opacity-70" />
                <span className="opacity-90">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {uncertaintyData?.level === 'high' && (
        <div className="mt-4 pt-4 border-t border-current/20">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} />
            <p className="text-sm font-medium">
              Clinical judgment and additional assessment are essential for patient safety.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UncertaintyIndicator;