import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedNextSteps = ({ recommendations }) => {
  const [expandedSections, setExpandedSections] = useState(new Set(['tests']));

  const toggleSection = (section) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded?.has(section)) {
      newExpanded?.delete(section);
    } else {
      newExpanded?.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-muted-foreground bg-muted/30 border-border';
      default: return 'text-muted-foreground bg-muted/30 border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Clock';
      case 'low': return 'Calendar';
      default: return 'Info';
    }
  };

  const getSectionIcon = (section) => {
    switch (section) {
      case 'tests': return 'TestTube';
      case 'lifestyle': return 'Heart';
      case 'referrals': return 'UserCheck';
      case 'followup': return 'Calendar';
      case 'medications': return 'Pill';
      default: return 'Info';
    }
  };

  const sections = [
    {
      key: 'tests',
      title: 'Recommended Tests',
      description: 'Additional diagnostic tests to confirm diagnosis',
      items: recommendations?.tests || []
    },
    {
      key: 'lifestyle',
      title: 'Lifestyle Modifications',
      description: 'Patient education and self-care recommendations',
      items: recommendations?.lifestyle || []
    },
    {
      key: 'referrals',
      title: 'Specialist Referrals',
      description: 'Recommended specialist consultations',
      items: recommendations?.referrals || []
    },
    {
      key: 'followup',
      title: 'Follow-up Care',
      description: 'Monitoring and reassessment schedule',
      items: recommendations?.followup || []
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 clinical-shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
          <Icon name="CheckSquare" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recommended Next Steps</h3>
          <p className="text-sm text-muted-foreground">Clinical guidance and action items</p>
        </div>
      </div>
      <div className="space-y-4">
        {sections?.map((section) => (
          <div key={section?.key} className="border border-border rounded-lg">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto"
              onClick={() => toggleSection(section?.key)}
            >
              <div className="flex items-center space-x-3">
                <Icon name={getSectionIcon(section?.key)} size={20} className="text-accent" />
                <div className="text-left">
                  <h4 className="font-medium text-foreground">{section?.title}</h4>
                  <p className="text-sm text-muted-foreground">{section?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                  {section?.items?.length} items
                </span>
                <Icon 
                  name={expandedSections?.has(section?.key) ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </div>
            </Button>

            {expandedSections?.has(section?.key) && section?.items?.length > 0 && (
              <div className="px-4 pb-4 space-y-3">
                {section?.items?.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                    <div className={`p-1 rounded-full ${getPriorityColor(item?.priority)}`}>
                      <Icon name={getPriorityIcon(item?.priority)} size={14} />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-foreground mb-1">{item?.title}</h5>
                      <p className="text-xs text-muted-foreground mb-2">{item?.description}</p>
                      
                      {item?.timeframe && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="Clock" size={12} className="text-accent" />
                          <span className="text-xs text-accent font-medium">{item?.timeframe}</span>
                        </div>
                      )}
                      
                      {item?.notes && (
                        <div className="flex items-start space-x-2">
                          <Icon name="Info" size={12} className="text-muted-foreground mt-0.5" />
                          <p className="text-xs text-muted-foreground">{item?.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item?.priority)}`}>
                      {item?.priority}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {expandedSections?.has(section?.key) && section?.items?.length === 0 && (
              <div className="px-4 pb-4 text-center text-muted-foreground">
                <Icon name="CheckCircle" size={24} className="mx-auto mb-2" />
                <p className="text-sm">No specific recommendations in this category</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Important Disclaimer */}
      <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
          <div className="text-sm">
            <h6 className="font-medium text-warning mb-1">Clinical Disclaimer</h6>
            <p className="text-muted-foreground">
              These recommendations are AI-generated suggestions to support clinical decision-making. 
              Always use professional medical judgment and consider individual patient factors. 
              This tool does not replace clinical expertise or provide prescription capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedNextSteps;