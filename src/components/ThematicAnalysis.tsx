import React from 'react';
import { ArrowLeft, MessageSquare, Star, Building } from 'lucide-react';
import { ViewType } from '../App';
import { FeedbackData } from '../data/mockData';

interface ThematicAnalysisProps {
  data: FeedbackData;
  selectedIntent: string;
  selectedTheme: string;
  onNavigate: (view: ViewType, intent?: string, theme?: string) => void;
}

const ThematicAnalysis: React.FC<ThematicAnalysisProps> = ({ 
  data, 
  selectedIntent, 
  selectedTheme, 
  onNavigate 
}) => {
  const filteredComments = data.comments
    .filter(comment => 
      comment.intent === selectedIntent && 
      comment.theme === selectedTheme
    )
    .sort((a, b) => b.strengthScore - a.strengthScore);

  const averageStrength = filteredComments.length > 0 
    ? filteredComments.reduce((sum, comment) => sum + comment.strengthScore, 0) / filteredComments.length 
    : 0;

  const stakeholderBreakdown = filteredComments.reduce((acc, comment) => {
    acc[comment.stakeholder] = (acc[comment.stakeholder] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getStrengthColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate('intent', selectedIntent)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Intent Analysis</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
              {selectedTheme} - {selectedIntent}
            </h1>
            <p className="text-gray-600">
              {filteredComments.length} comments analyzed and ranked by argument strength
            </p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-lg font-semibold">
                {averageStrength.toFixed(1)}/10
              </span>
            </div>
            <p className="text-sm text-gray-500">Average Strength</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Stakeholder Breakdown</span>
              </h4>
              <div className="space-y-2 text-sm">
                {Object.entries(stakeholderBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([stakeholder, count]) => (
                    <div key={stakeholder} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{stakeholder}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Comment Summaries (Strength Ranked)</span>
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredComments.map((comment, index) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                      <span className="text-sm text-gray-600 capitalize">
                        {comment.stakeholder}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getStrengthColor(comment.strengthScore)}`}>
                      {comment.strengthScore}/10
                    </div>
                  </div>
                  
                  <p className="text-gray-800 mb-3 leading-relaxed">
                    {comment.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {comment.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThematicAnalysis;