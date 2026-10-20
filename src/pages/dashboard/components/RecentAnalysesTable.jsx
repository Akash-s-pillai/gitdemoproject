import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAnalysesTable = ({ analyses = [], onViewReport = null }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const getUrgencyBadge = (urgency) => {
    const urgencyConfig = {
      critical: { color: 'bg-error text-error-foreground', icon: 'AlertTriangle', label: 'Critical' },
      high: { color: 'bg-warning text-warning-foreground', icon: 'AlertCircle', label: 'High' },
      medium: { color: 'bg-accent text-accent-foreground', icon: 'Info', label: 'Medium' },
      low: { color: 'bg-muted text-muted-foreground', icon: 'CheckCircle', label: 'Low' }
    };
    
    const config = urgencyConfig?.[urgency] || urgencyConfig?.low;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const getConfidenceBadge = (confidence) => {
    const getColor = (conf) => {
      if (conf >= 90) return 'text-success bg-success/10 border-success/20';
      if (conf >= 70) return 'text-accent bg-accent/10 border-accent/20';
      if (conf >= 50) return 'text-warning bg-warning/10 border-warning/20';
      return 'text-error bg-error/10 border-error/20';
    };

    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getColor(confidence)}`}>
        {confidence}%
      </div>
    );
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedAnalyses = analyses?.filter(analysis => 
      analysis?.patientName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      analysis?.diagnosis?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.analysisDate);
          bValue = new Date(b.analysisDate);
          break;
        case 'urgency':
          const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          aValue = urgencyOrder?.[a?.urgency];
          bValue = urgencyOrder?.[b?.urgency];
          break;
        case 'confidence':
          aValue = a?.confidence;
          bValue = b?.confidence;
          break;
        default:
          aValue = a?.patientName;
          bValue = b?.patientName;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Patient Analyses</h3>
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/diagnostic-results'}>
            View All
            <Icon name="ArrowRight" size={14} className="ml-1" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search patients or diagnoses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('patient')}
                >
                  Patient
                  <Icon name="ArrowUpDown" size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('date')}
                >
                  Analysis Date
                  <Icon name="ArrowUpDown" size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">Primary Diagnosis</th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('confidence')}
                >
                  Confidence
                  <Icon name="ArrowUpDown" size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => handleSort('urgency')}
                >
                  Urgency
                  <Icon name="ArrowUpDown" size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedAnalyses?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-muted-foreground">
                  <Icon name="FileText" size={24} className="mx-auto mb-2" />
                  <p>No analyses found</p>
                </td>
              </tr>
            ) : (
              filteredAndSortedAnalyses?.map((analysis) => (
                <tr 
                  key={analysis?.id} 
                  className="border-b border-border hover:bg-muted/30 clinical-transition cursor-pointer"
                  onClick={() => onViewReport && onViewReport(analysis?.id)}
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{analysis?.patientName}</p>
                        <p className="text-xs text-muted-foreground">ID: {analysis?.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground">{formatDate(analysis?.analysisDate)}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-foreground">{analysis?.diagnosis}</p>
                    {analysis?.requiresReferral && (
                      <div className="inline-flex items-center space-x-1 mt-1 px-2 py-1 bg-error/10 text-error rounded-full text-xs">
                        <Icon name="AlertTriangle" size={10} />
                        <span>Referral Required</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {getConfidenceBadge(analysis?.confidence)}
                  </td>
                  <td className="p-4">
                    {getUrgencyBadge(analysis?.urgency)}
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onViewReport && onViewReport(analysis?.id);
                      }}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentAnalysesTable;