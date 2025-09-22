import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import IntentAnalysis from './components/IntentAnalysis';
import ThematicAnalysis from './components/ThematicAnalysis';
import CommentDetails from './components/CommentDetails';
import BiasAnalysis from './components/BiasAnalysis';
import Header from './components/Header';
import { mockData } from './data/mockData';

export type ViewType = 'dashboard' | 'intent' | 'thematic' | 'comments' | 'bias';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedIntent, setSelectedIntent] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  const handleNavigate = (view: ViewType, intent?: string, theme?: string) => {
    setCurrentView(view);
    if (intent) setSelectedIntent(intent);
    if (theme) setSelectedTheme(theme);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard data={mockData} onNavigate={handleNavigate} />;
      case 'intent':
        return (
          <IntentAnalysis
            data={mockData}
            selectedIntent={selectedIntent}
            onNavigate={handleNavigate}
          />
        );
      case 'thematic':
        return (
          <ThematicAnalysis
            data={mockData}
            selectedIntent={selectedIntent}
            selectedTheme={selectedTheme}
            onNavigate={handleNavigate}
          />
        );
      case 'comments':
        return (
          <CommentDetails
            data={mockData}
            selectedIntent={selectedIntent}
            selectedTheme={selectedTheme}
            onNavigate={handleNavigate}
          />
        );
      case 'bias':
        return <BiasAnalysis data={mockData} onNavigate={handleNavigate} />;
      default:
        return <Dashboard data={mockData} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onNavigate={handleNavigate} />
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;