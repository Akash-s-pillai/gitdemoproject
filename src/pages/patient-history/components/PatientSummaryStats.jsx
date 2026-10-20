import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientSummaryStats = ({ patient, analyses }) => {
  const calculateStats = () => {
    const totalVisits = analyses?.length;
    const resolvedCases = analyses?.filter(a => a?.status === 'resolved')?.length;
    const ongoingCases = analyses?.filter(a => a?.status === 'ongoing')?.length;
    const escalatedCases = analyses?.filter(a => a?.status === 'escalated')?.length;
    
    // Most common conditions
    const conditionCounts = {};
    analyses?.forEach(analysis => {
      const condition = analysis?.primaryDiagnosis;
      conditionCounts[condition] = (conditionCounts?.[condition] || 0) + 1;
    });
    
    const mostCommonConditions = Object.entries(conditionCounts)?.sort(([,a], [,b]) => b - a)?.slice(0, 5)?.map(([condition, count]) => ({ condition, count }));

    // Referral history
    const referrals = analyses?.filter(a => a?.treatmentPlan?.some(t => t?.toLowerCase()?.includes('refer')));
    
    // Average confidence
    const avgConfidence = analyses?.length > 0 
      ? Math.round(analyses?.reduce((sum, a) => sum + a?.confidence, 0) / analyses?.length)
      : 0;

    return {
      totalVisits,
      resolvedCases,
      ongoingCases,
      escalatedCases,
      mostCommonConditions,
      referrals: referrals?.length,
      avgConfidence
    };
  };

  const stats = calculateStats();

  const StatCard = ({ icon, label, value, color = "text-foreground" }) => (
    <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className={`text-xl font-semibold ${color}`}>{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Patient Overview</h3>
        <div className="space-y-3">
          <StatCard 
            icon="Activity" 
            label="Total Visits" 
            value={stats?.totalVisits} 
          />
          <StatCard 
            icon="CheckCircle" 
            label="Resolved Cases" 
            value={stats?.resolvedCases}
            color="text-success"
          />
          <StatCard 
            icon="Clock" 
            label="Ongoing Cases" 
            value={stats?.ongoingCases}
            color="text-warning"
          />
          <StatCard 
            icon="AlertTriangle" 
            label="Escalated Cases" 
            value={stats?.escalatedCases}
            color="text-error"
          />
        </div>
      </div>
      {/* Care Quality Metrics */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Care Quality</h3>
        <div className="space-y-3">
          <StatCard 
            icon="Target" 
            label="Avg. Confidence" 
            value={`${stats?.avgConfidence}%`}
            color={stats?.avgConfidence >= 80 ? "text-success" : 
                   stats?.avgConfidence >= 60 ? "text-warning" : "text-error"}
          />
          <StatCard 
            icon="ArrowUpRight" 
            label="Referrals Made" 
            value={stats?.referrals}
          />
        </div>
      </div>
      {/* Most Common Conditions */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Common Conditions</h3>
        <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
          {stats?.mostCommonConditions?.length > 0 ? (
            <div className="space-y-3">
              {stats?.mostCommonConditions?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground">{item?.condition}</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {item?.count}x
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <Icon name="FileText" size={24} className="mx-auto mb-2" />
              <p className="text-sm">No conditions recorded yet</p>
            </div>
          )}
        </div>
      </div>
      {/* Care Continuity */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Care Continuity</h3>
        <div className="bg-surface border border-border rounded-lg p-4 clinical-shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">First Visit</span>
              <span className="text-sm font-medium text-foreground">
                {analyses?.length > 0 
                  ? new Date(analyses[analyses.length - 1].date)?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'N/A'
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Visit</span>
              <span className="text-sm font-medium text-foreground">
                {analyses?.length > 0 
                  ? new Date(analyses[0].date)?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'N/A'
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Care Duration</span>
              <span className="text-sm font-medium text-foreground">
                {analyses?.length > 1 
                  ? `${Math.ceil((new Date(analyses[0].date) - new Date(analyses[analyses.length - 1].date)) / (1000 * 60 * 60 * 24))} days`
                  : 'Single visit'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSummaryStats;