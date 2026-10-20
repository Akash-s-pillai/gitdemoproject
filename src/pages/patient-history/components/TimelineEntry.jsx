import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineEntry = ({ entry, isLast = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-success bg-success/10 border-success/20';
      case 'ongoing': return 'text-warning bg-warning/10 border-warning/20';
      case 'escalated': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-border"></div>
      )}
      <div className="flex items-start space-x-4">
        {/* Timeline Dot */}
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center
          ${getStatusColor(entry?.status)}
        `}>
          <Icon 
            name={entry?.status === 'resolved' ? 'CheckCircle' : 
                  entry?.status === 'ongoing' ? 'Clock' : 
                  entry?.status === 'escalated' ? 'AlertTriangle' : 'FileText'} 
            size={20} 
          />
        </div>

        {/* Entry Content */}
        <div className="flex-1 bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-foreground">{entry?.primaryDiagnosis}</h3>
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full border
                  ${getStatusColor(entry?.status)}
                `}>
                  {entry?.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{formatDate(entry?.date)}</span>
                <span>•</span>
                <span>{formatTime(entry?.date)}</span>
                <span>•</span>
                <span className={getConfidenceColor(entry?.confidence)}>
                  {entry?.confidence}% confidence
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </Button>
          </div>

          {/* Summary */}
          <div className="mb-3">
            <h4 className="text-sm font-medium text-foreground mb-1">Presenting Symptoms</h4>
            <p className="text-sm text-muted-foreground">
              {entry?.symptoms?.join(', ')}
            </p>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="space-y-4 pt-4 border-t border-border">
              {/* Diagnosis Details */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Diagnosis Summary</h4>
                <p className="text-sm text-muted-foreground mb-2">{entry?.diagnosisSummary}</p>
                
                {entry?.alternativeDiagnoses && entry?.alternativeDiagnoses?.length > 0 && (
                  <div>
                    <h5 className="text-xs font-medium text-foreground mb-1">Alternative Diagnoses</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {entry?.alternativeDiagnoses?.map((alt, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span>•</span>
                          <span>{alt?.diagnosis} ({alt?.confidence}%)</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Treatment Plan */}
              {entry?.treatmentPlan && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Treatment Plan</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {entry?.treatmentPlan?.map((treatment, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={12} className="mt-1 flex-shrink-0" />
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Follow-up */}
              {entry?.followUp && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Follow-up</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{entry?.followUp?.date}</span>
                    <span>•</span>
                    <span>{entry?.followUp?.type}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" size="sm">
                  <Icon name="FileText" size={14} className="mr-1" />
                  View Report
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Copy" size={14} className="mr-1" />
                  Duplicate Analysis
                </Button>
                {entry?.status === 'ongoing' && (
                  <Button variant="default" size="sm">
                    <Icon name="Plus" size={14} className="mr-1" />
                    Add Follow-up
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineEntry;