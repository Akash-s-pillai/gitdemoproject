import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterableTable = ({ analyses, onViewDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'escalated', label: 'Escalated' }
  ];

  const urgencyOptions = [
    { value: 'all', label: 'All Urgency' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'diagnosis', label: 'Diagnosis' },
    { value: 'confidence', label: 'Confidence' },
    { value: 'status', label: 'Status' }
  ];

  const filteredAndSortedAnalyses = useMemo(() => {
    let filtered = analyses?.filter(analysis => {
      const matchesSearch = searchQuery === '' || 
        analysis?.primaryDiagnosis?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        analysis?.symptoms?.some(symptom => symptom?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
      
      const matchesStatus = filterStatus === 'all' || analysis?.status === filterStatus;
      const matchesUrgency = filterUrgency === 'all' || analysis?.urgency === filterUrgency;
      
      return matchesSearch && matchesStatus && matchesUrgency;
    });

    filtered?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'diagnosis':
          aValue = a?.primaryDiagnosis?.toLowerCase();
          bValue = b?.primaryDiagnosis?.toLowerCase();
          break;
        case 'confidence':
          aValue = a?.confidence;
          bValue = b?.confidence;
          break;
        case 'status':
          aValue = a?.status;
          bValue = b?.status;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [analyses, searchQuery, sortBy, sortOrder, filterStatus, filterUrgency]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-success bg-success/10 border-success/20';
      case 'ongoing': return 'text-warning bg-warning/10 border-warning/20';
      case 'escalated': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-foreground';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow-sm">
      {/* Filters and Search */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search diagnoses or symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3">
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Status"
              className="w-32"
            />
            <Select
              options={urgencyOptions}
              value={filterUrgency}
              onChange={setFilterUrgency}
              placeholder="Urgency"
              className="w-32"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-32"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1"
                >
                  <span>Date</span>
                  {sortBy === 'date' && (
                    <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={14} />
                  )}
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('diagnosis')}
                  className="flex items-center space-x-1"
                >
                  <span>Diagnosis</span>
                  {sortBy === 'diagnosis' && (
                    <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={14} />
                  )}
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Symptoms</th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('confidence')}
                  className="flex items-center space-x-1"
                >
                  <span>Confidence</span>
                  {sortBy === 'confidence' && (
                    <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={14} />
                  )}
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1"
                >
                  <span>Status</span>
                  {sortBy === 'status' && (
                    <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={14} />
                  )}
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedAnalyses?.map((analysis, index) => (
              <tr key={index} className="border-t border-border hover:bg-muted/30 clinical-transition">
                <td className="p-4">
                  <div className="text-sm">
                    <div className="font-medium text-foreground">{formatDate(analysis?.date)}</div>
                    <div className="text-muted-foreground">
                      {new Date(analysis.date)?.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="font-medium text-foreground">{analysis?.primaryDiagnosis}</div>
                    <div className={`text-xs ${getUrgencyColor(analysis?.urgency)}`}>
                      {analysis?.urgency} urgency
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground max-w-xs">
                    {analysis?.symptoms?.slice(0, 3)?.join(', ')}
                    {analysis?.symptoms?.length > 3 && ` +${analysis?.symptoms?.length - 3} more`}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-sm font-medium ${getConfidenceColor(analysis?.confidence)}`}>
                    {analysis?.confidence}%
                  </span>
                </td>
                <td className="p-4">
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-full border capitalize
                    ${getStatusColor(analysis?.status)}
                  `}>
                    {analysis?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails && onViewDetails(analysis)}
                    >
                      <Icon name="Eye" size={14} className="mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="FileText" size={14} className="mr-1" />
                      Report
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAndSortedAnalyses?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
      {/* Results Summary */}
      {filteredAndSortedAnalyses?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedAnalyses?.length} of {analyses?.length} analyses
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterableTable;