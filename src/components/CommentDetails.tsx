import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Download, Star } from 'lucide-react';
import { ViewType } from '../App';
import { FeedbackData } from '../data/mockData';

interface CommentDetailsProps {
  data: FeedbackData;
  selectedIntent: string;
  selectedTheme: string;
  onNavigate: (view: ViewType, intent?: string, theme?: string) => void;
}

const CommentDetails: React.FC<CommentDetailsProps> = ({ 
  data, 
  selectedIntent, 
  selectedTheme, 
  onNavigate 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'strength' | 'stakeholder' | 'recent'>('strength');
  const [filterStakeholder, setFilterStakeholder] = useState<string>('all');

  let filteredComments = data.comments.filter(comment => {
    const matchesIntent = !selectedIntent || comment.intent === selectedIntent;
    const matchesTheme = !selectedTheme || comment.theme === selectedTheme;
    const matchesSearch = !searchTerm || 
      comment.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStakeholder = filterStakeholder === 'all' || comment.stakeholder === filterStakeholder;
    
    return matchesIntent && matchesTheme && matchesSearch && matchesStakeholder;
  });

  // Sort comments
  filteredComments.sort((a, b) => {
    switch (sortBy) {
      case 'strength':
        return b.strengthScore - a.strengthScore;
      case 'stakeholder':
        return a.stakeholder.localeCompare(b.stakeholder);
      case 'recent':
        return new Date(b.id).getTime() - new Date(a.id).getTime(); // Using ID as timestamp proxy
      default:
        return 0;
    }
  });

  const stakeholders = ['all', ...Array.from(new Set(data.comments.map(c => c.stakeholder)))];

  const getStrengthColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const exportComments = () => {
    const csvContent = filteredComments.map(comment => 
      `"${comment.intent}","${comment.theme}","${comment.stakeholder}","${comment.strengthScore}","${comment.summary.replace(/"/g, '""')}","${comment.keywords.join(';')}"`
    ).join('\n');
    
    const header = 'Intent,Theme,Stakeholder,Strength Score,Summary,Keywords\n';
    const blob = new Blob([header + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-analysis-${selectedIntent || 'all'}-${selectedTheme || 'all'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => selectedTheme ? onNavigate('thematic', selectedIntent, selectedTheme) : onNavigate('intent', selectedIntent)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Comment Analysis
            </h1>
            <p className="text-gray-600">
              {filteredComments.length} comments 
              {selectedIntent && ` • ${selectedIntent}`}
              {selectedTheme && ` • ${selectedTheme}`}
            </p>
          </div>
        </div>
        
        <button
          onClick={exportComments}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search comments and keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="strength">Sort by Strength</option>
            <option value="stakeholder">Sort by Stakeholder</option>
            <option value="recent">Sort by Recent</option>
          </select>
          
          <select
            value={filterStakeholder}
            onChange={(e) => setFilterStakeholder(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {stakeholders.map(stakeholder => (
              <option key={stakeholder} value={stakeholder} className="capitalize">
                {stakeholder === 'all' ? 'All Stakeholders' : stakeholder}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No comments found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          filteredComments.map((comment, index) => (
            <div key={comment.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {comment.stakeholder}
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                        {comment.intent}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">
                        {comment.theme}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg border ${getStrengthColor(comment.strengthScore)}`}>
                  <Star className="h-3 w-3" />
                  <span className="font-medium text-sm">{comment.strengthScore}/10</span>
                </div>
              </div>
              
              <p className="text-gray-800 mb-4 leading-relaxed">
                {comment.summary}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {comment.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentDetails;