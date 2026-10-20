import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrimaryDiagnosisCard = ({ diagnosis }) => {
  const [showMedicalTerms, setShowMedicalTerms] = useState(false);

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success bg-success/10 border-success/20';
    if (confidence >= 60) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 80) return 'CheckCircle';
    if (confidence >= 60) return 'AlertCircle';
    return 'AlertTriangle';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 clinical-shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Target" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Primary Diagnosis</h3>
            <p className="text-sm text-muted-foreground">Most likely condition based on analysis</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getConfidenceColor(diagnosis?.confidence)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getConfidenceIcon(diagnosis?.confidence)} size={14} />
            <span>{diagnosis?.confidence}% Confidence</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-semibold text-foreground mb-2">{diagnosis?.condition}</h4>
          <p className="text-muted-foreground leading-relaxed">{diagnosis?.description}</p>
        </div>

        {diagnosis?.symptoms && (
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Key Supporting Symptoms</h5>
            <div className="flex flex-wrap gap-2">
              {diagnosis?.symptoms?.map((symptom, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMedicalTerms(!showMedicalTerms)}
            iconName={showMedicalTerms ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showMedicalTerms ? 'Hide' : 'Show'} Medical Terms
          </Button>
          
          {diagnosis?.confidence < 70 && (
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">Low confidence - consider additional tests</span>
            </div>
          )}
        </div>

        {showMedicalTerms && diagnosis?.medicalTerms && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <h6 className="text-sm font-medium text-foreground mb-2">Medical Terminology</h6>
            <div className="space-y-2">
              {Object.entries(diagnosis?.medicalTerms)?.map(([term, definition]) => (
                <div key={term} className="text-sm">
                  <span className="font-medium text-foreground">{term}:</span>
                  <span className="text-muted-foreground ml-2">{definition}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryDiagnosisCard;