import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ 
  title, 
  value, 
  icon, 
  trend = null, 
  trendDirection = 'up', 
  color = 'primary',
  description = null,
  onClick = null 
}) => {
  const getColorClasses = (colorType) => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      error: 'bg-error/10 text-error border-error/20',
      accent: 'bg-accent/10 text-accent border-accent/20'
    };
    return colorMap?.[colorType] || colorMap?.primary;
  };

  const getTrendColor = (direction) => {
    return direction === 'up' ? 'text-success' : direction === 'down' ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div 
      className={`
        bg-surface border border-border rounded-lg p-6 clinical-shadow-sm clinical-transition
        ${onClick ? 'cursor-pointer hover:clinical-shadow-md hover:border-primary/30' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
              <Icon name={icon} size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
          
          {trend && (
            <div className="flex items-center space-x-1 mt-2">
              <Icon 
                name={trendDirection === 'up' ? 'TrendingUp' : trendDirection === 'down' ? 'TrendingDown' : 'Minus'} 
                size={14} 
                className={getTrendColor(trendDirection)} 
              />
              <span className={`text-xs font-medium ${getTrendColor(trendDirection)}`}>
                {trend}
              </span>
              <span className="text-xs text-muted-foreground">vs yesterday</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;