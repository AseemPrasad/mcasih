import React from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { ViewType } from '../App';
import { FeedbackData } from '../data/mockData';

interface IntentAnalysisProps {
  data: FeedbackData;
  selectedIntent: string;
  onNavigate: (view: ViewType, intent?: string, theme?: string) => void;
}

const IntentAnalysis: React.FC<IntentAnalysisProps> = ({ data, selectedIntent, onNavigate }) => {
  const intentThemes = data.thematicClusters[selectedIntent] || {};
  const totalComments = Object.values(intentThemes).reduce((sum, count) => sum + count, 0);

  const themeColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-pink-500',
  ];

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

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
          {selectedIntent} Comments
        </h1>
        <p className="text-gray-600 mb-6">
          Thematic analysis of {totalComments} comments categorized as "{selectedIntent}"
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Distribution</h3>
            <div className="space-y-4">
              {Object.entries(intentThemes)
                .sort(([, a], [, b]) => b - a)
                .map(([theme, count], index) => {
                  const percentage = ((count / totalComments) * 100).toFixed(1);
                  return (
                    <div
                      key={theme}
                      className="group cursor-pointer"
                      onClick={() => onNavigate('thematic', selectedIntent, theme)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700 capitalize group-hover:text-blue-600 transition-colors">
                          {theme}
                        </span>
                        <span className="text-sm text-gray-500">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${themeColors[index % themeColors.length]} transition-all duration-500 group-hover:opacity-80`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Analysis Summary</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total Comments:</span>
                  <span className="font-medium">{totalComments}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unique Themes:</span>
                  <span className="font-medium">{Object.keys(intentThemes).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Top Theme:</span>
                  <span className="font-medium capitalize">
                    {Object.entries(intentThemes).sort(([, a], [, b]) => b - a)[0]?.[0]}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('comments', selectedIntent)}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              <span>View All Comments</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntentAnalysis;