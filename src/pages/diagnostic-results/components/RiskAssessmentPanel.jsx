import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RiskAssessmentPanel = ({ riskAssessment }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-error bg-error/5 border-error/10';
      case 'moderate': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/30 border-border';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'moderate': return 'AlertCircle';
      case 'low': return 'CheckCircle';
      default: return 'HelpCircle';
    }
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'immediate': return 'Zap';
      case 'urgent': return 'Clock';
      case 'monitor': return 'Eye';
      case 'routine': return 'Calendar';
      default: return 'Info';
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'immediate': return 'text-error bg-error/10 border-error/20';
      case 'urgent': return 'text-warning bg-warning/10 border-warning/20';
      case 'monitor': return 'text-accent bg-accent/10 border-accent/20';
      case 'routine': return 'text-muted-foreground bg-muted/30 border-border';
      default: return 'text-muted-foreground bg-muted/30 border-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 clinical-shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Risk Assessment</h3>
          <p className="text-sm text-muted-foreground">Patient safety and monitoring requirements</p>
        </div>
      </div>
      {/* Overall Risk Level */}
      <div className={`p-4 rounded-lg border mb-4 ${getRiskColor(riskAssessment?.overallRisk)}`}>
        <div className="flex items-center space-x-3">
          <Icon name={getRiskIcon(riskAssessment?.overallRisk)} size={24} />
          <div>
            <h4 className="font-semibold capitalize">{riskAssessment?.overallRisk} Risk Level</h4>
            <p className="text-sm opacity-80">{riskAssessment?.riskDescription}</p>
          </div>
        </div>
      </div>
      {/* Risk Factors */}
      {riskAssessment?.riskFactors && riskAssessment?.riskFactors?.length > 0 && (
        <div className="mb-4">
          <h5 className="text-sm font-medium text-foreground mb-3">Identified Risk Factors</h5>
          <div className="space-y-2">
            {riskAssessment?.riskFactors?.map((factor, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                <Icon 
                  name={factor?.severity === 'high' ? 'AlertTriangle' : factor?.severity === 'medium' ? 'AlertCircle' : 'Info'} 
                  size={16} 
                  className={
                    factor?.severity === 'high' ? 'text-error' : 
                    factor?.severity === 'medium' ? 'text-warning' : 'text-accent'
                  }
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{factor?.factor}</p>
                  <p className="text-xs text-muted-foreground">{factor?.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  factor?.severity === 'high' ? 'bg-error/10 text-error' :
                  factor?.severity === 'medium' ? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                }`}>
                  {factor?.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Required Actions */}
      {riskAssessment?.requiredActions && riskAssessment?.requiredActions?.length > 0 && (
        <div className="mb-4">
          <h5 className="text-sm font-medium text-foreground mb-3">Required Actions</h5>
          <div className="space-y-2">
            {riskAssessment?.requiredActions?.map((action, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getActionColor(action?.priority)}`}>
                <div className="flex items-start space-x-3">
                  <Icon name={getActionIcon(action?.priority)} size={16} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{action?.action}</p>
                    <p className="text-xs opacity-80 mt-1">{action?.timeframe}</p>
                  </div>
                  <span className="text-xs font-medium capitalize">{action?.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Warning Signs */}
      {riskAssessment?.warningSignsToMonitor && riskAssessment?.warningSignsToMonitor?.length > 0 && (
        <div className="mb-4">
          <h5 className="text-sm font-medium text-foreground mb-3">Warning Signs to Monitor</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {riskAssessment?.warningSignsToMonitor?.map((sign, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-warning/5 border border-warning/20 rounded">
                <Icon name="Eye" size={14} className="text-warning" />
                <span className="text-sm text-foreground">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Emergency Contact Info */}
      {riskAssessment?.overallRisk === 'critical' || riskAssessment?.overallRisk === 'high' && (
        <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Phone" size={16} className="text-error mt-0.5" />
            <div>
              <h6 className="text-sm font-medium text-error mb-1">Emergency Protocol</h6>
              <p className="text-xs text-muted-foreground mb-2">
                If patient condition worsens or warning signs appear, contact emergency services immediately.
              </p>
              <Button variant="outline" size="sm" className="text-error border-error/20 hover:bg-error/5">
                <Icon name="Phone" size={14} className="mr-1" />
                Emergency: 911
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentPanel;