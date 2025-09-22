import React from 'react';
import { ArrowLeft, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { ViewType } from '../App';
import { FeedbackData } from '../data/mockData';

interface BiasAnalysisProps {
  data: FeedbackData;
  onNavigate: (view: ViewType) => void;
}

const BiasAnalysis: React.FC<BiasAnalysisProps> = ({ data, onNavigate }) => {
  const totalComments = Object.values(data.stakeholderDistribution).reduce((sum, count) => sum + count, 0);
  
  const stakeholderColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-indigo-500',
  ];

  const getBiasLevel = (percentage: number) => {
    if (percentage > 60) return { level: 'High', color: 'text-red-600 bg-red-100' };
    if (percentage > 40) return { level: 'Moderate', color: 'text-yellow-600 bg-yellow-100' };
    return { level: 'Low', color: 'text-green-600 bg-green-100' };
  };

  const dominantStakeholder = Object.entries(data.stakeholderDistribution)
    .sort(([, a], [, b]) => b - a)[0];
  const dominantPercentage = ((dominantStakeholder[1] / totalComments) * 100);
  const biasAssessment = getBiasLevel(dominantPercentage);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bias Assessment */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">Bias Assessment</h2>
          </div>
          
          <div className={`p-4 rounded-lg mb-4 ${biasAssessment.color}`}>
            <p className="font-medium">{biasAssessment.level} Bias Detected</p>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Dominant Group:</span>
              <span className="font-medium capitalize">{dominantStakeholder[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Representation:</span>
              <span className="font-medium">{dominantPercentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Stakeholders:</span>
              <span className="font-medium">{Object.keys(data.stakeholderDistribution).length}</span>
            </div>
          </div>
        </div>

        {/* Diversity Index */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Diversity Metrics</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Representation Balance</span>
                <span className="text-sm font-medium">
                  {dominantPercentage < 40 ? 'Balanced' : dominantPercentage < 60 ? 'Moderate' : 'Imbalanced'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-full rounded-full ${dominantPercentage < 40 ? 'bg-green-500' : dominantPercentage < 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${100 - dominantPercentage}%` }}
                />
              </div>
            </div>
            
            <div className="text-xs text-gray-500 leading-relaxed">
              A balanced representation helps ensure diverse perspectives are considered in policy decisions.
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-900">Recommendations</h2>
          </div>
          
          <div className="space-y-3 text-sm">
            {dominantPercentage > 60 && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="font-medium text-orange-800">High Bias Detected</p>
                <p className="text-orange-700">Consider targeted outreach to underrepresented groups.</p>
              </div>
            )}
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-800">Engagement Strategy</p>
              <p className="text-blue-700">Analyze minority viewpoints for unique insights.</p>
            </div>
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium text-green-800">Data Quality</p>
              <p className="text-green-700">Weight comments by argument strength, not just volume.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Stakeholder Distribution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Representation Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(data.stakeholderDistribution)
                .sort(([, a], [, b]) => b - a)
                .map(([stakeholder, count], index) => {
                  const percentage = ((count / totalComments) * 100).toFixed(1);
                  return (
                    <div key={stakeholder}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700 capitalize">{stakeholder}</span>
                        <span className="text-sm text-gray-500">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${stakeholderColors[index % stakeholderColors.length]} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Analysis</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Over-representation Risk</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {dominantStakeholder[0]} represents {dominantPercentage.toFixed(1)}% of all feedback
                </p>
                {dominantPercentage > 50 && (
                  <p className="text-xs text-orange-600">
                    ⚠️ Single group influence may skew policy direction
                  </p>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Minority Voices</h4>
                <p className="text-sm text-gray-600">
                  {Object.entries(data.stakeholderDistribution).filter(([, count]) => (count / totalComments) < 0.1).length} groups 
                  represent less than 10% each
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasAnalysis;