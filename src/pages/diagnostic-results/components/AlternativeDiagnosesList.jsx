import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlternativeDiagnosesList = ({ alternatives }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(index)) {
      newExpanded?.delete(index);
    } else {
      newExpanded?.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const getLikelihoodColor = (likelihood) => {
    if (likelihood >= 60) return 'text-warning bg-warning/10 border-warning/20';
    if (likelihood >= 30) return 'text-accent bg-accent/10 border-accent/20';
    return 'text-muted-foreground bg-muted/30 border-border';
  };

  const getLikelihoodIcon = (likelihood) => {
    if (likelihood >= 60) return 'AlertCircle';
    if (likelihood >= 30) return 'Info';
    return 'HelpCircle';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 clinical-shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
          <Icon name="List" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alternative Diagnoses</h3>
          <p className="text-sm text-muted-foreground">Other possible conditions to consider</p>
        </div>
      </div>
      <div className="space-y-3">
        {alternatives?.map((alternative, index) => (
          <div 
            key={index}
            className="border border-border rounded-lg p-4 clinical-transition hover:bg-muted/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-foreground">{alternative?.condition}</h4>
                  <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getLikelihoodColor(alternative?.likelihood)}`}>
                    <div className="flex items-center space-x-1">
                      <Icon name={getLikelihoodIcon(alternative?.likelihood)} size={12} />
                      <span>{alternative?.likelihood}% likely</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{alternative?.description}</p>
                
                {alternative?.keyDifferences && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-foreground mb-1">Key Differences:</p>
                    <p className="text-xs text-muted-foreground">{alternative?.keyDifferences}</p>
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpanded(index)}
                iconName={expandedItems?.has(index) ? "ChevronUp" : "ChevronDown"}
                className="ml-4"
              />
            </div>

            {expandedItems?.has(index) && (
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                {alternative?.additionalSymptoms && (
                  <div>
                    <h6 className="text-xs font-medium text-foreground mb-2">Additional Symptoms to Look For:</h6>
                    <div className="flex flex-wrap gap-1">
                      {alternative?.additionalSymptoms?.map((symptom, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {alternative?.suggestedTests && (
                  <div>
                    <h6 className="text-xs font-medium text-foreground mb-2">Suggested Tests:</h6>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {alternative?.suggestedTests?.map((test, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={12} className="mt-0.5 text-accent" />
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-accent mb-1">Clinical Note</p>
            <p className="text-muted-foreground">
              These alternative diagnoses are ranked by likelihood based on presented symptoms. 
              Consider additional clinical assessment and testing to rule out or confirm these conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeDiagnosesList;