import React from 'react';
import { TrendingUp, Users, FileText, AlertCircle } from 'lucide-react';
import { ViewType } from '../App';
import { FeedbackData } from '../data/mockData';

interface DashboardProps {
  data: FeedbackData;
  onNavigate: (view: ViewType, intent?: string, theme?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onNavigate }) => {
  const totalComments = Object.values(data.intentDistribution).reduce((sum, count) => sum + count, 0);

  const intentColors = {
    supportive: 'bg-green-500',
    objective: 'bg-blue-500',
    'legal concern': 'bg-red-500',
    'request for clarification': 'bg-yellow-500',
    'suggestion for modification': 'bg-purple-500',
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Comments</p>
              <p className="text-3xl font-bold text-gray-900">{totalComments.toLocaleString()}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing Status</p>
              <p className="text-lg font-semibold text-green-600">Complete</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stakeholder Types</p>
              <p className="text-3xl font-bold text-gray-900">{Object.keys(data.stakeholderDistribution).length}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-3xl font-bold text-gray-900">
                {data.comments.filter(c => c.strengthScore > 8).length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Intent Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Intent Distribution</h2>
        <div className="space-y-4">
          {Object.entries(data.intentDistribution).map(([intent, count]) => {
            const percentage = ((count / totalComments) * 100).toFixed(1);
            return (
              <div key={intent} className="group cursor-pointer" onClick={() => onNavigate('intent', intent)}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 capitalize group-hover:text-blue-600 transition-colors">
                    {intent}
                  </span>
                  <span className="text-sm text-gray-500">{count} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${intentColors[intent as keyof typeof intentColors]} transition-all duration-500 group-hover:opacity-80`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => onNavigate('bias')}
          className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left group"
        >
          <Users className="h-8 w-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Stakeholder Analysis</h3>
          <p className="text-gray-600 text-sm">View bias distribution and representation mapping</p>
        </button>
        
        <button
          onClick={() => onNavigate('thematic')}
          className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left group"
        >
          <TrendingUp className="h-8 w-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Thematic Analysis</h3>
          <p className="text-gray-600 text-sm">Explore comment themes and clustering patterns</p>
        </button>
        
        <button
          onClick={() => onNavigate('comments')}
          className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left group"
        >
          <FileText className="h-8 w-8 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Comment Details</h3>
          <p className="text-gray-600 text-sm">View detailed summaries and strength scores</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;