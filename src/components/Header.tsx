import React from 'react';
import { FileText, BarChart3, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { ViewType } from '../App';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { key: 'dashboard' as ViewType, label: 'Dashboard', icon: BarChart3 },
    { key: 'intent' as ViewType, label: 'Intent Analysis', icon: MessageSquare },
    { key: 'bias' as ViewType, label: 'Bias Analysis', icon: Users },
    { key: 'thematic' as ViewType, label: 'Thematic View', icon: TrendingUp },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Feedback Intelligence</h1>
              <p className="text-sm text-gray-500">Draft Amendment: MAX</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === key
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;