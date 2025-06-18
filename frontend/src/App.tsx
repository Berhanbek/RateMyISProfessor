import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Logo from './components/Logo';
import LandingPage from './components/LandingPage';
import ProfessorList from './components/ProfessorList';
import RatingModal from './components/RatingModal';
import { Professor, Rating } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'year-2' | 'year-3'>('landing');
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/professors`)
      .then(res => res.json())
      .then(data => setProfessors(data.data || []));
  }, []);

  const handleYearSelect = async (year: 2 | 3) => {
    setCurrentView(`year-${year}`);
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/professors?year=${year === 2 ? '2nd' : '3rd'}`);
      const json = await res.json();
      if (json.success) {
        setProfessors(json.data);
      } else {
        setProfessors([]);
      }
    } catch (error) {
      console.error('Failed to fetch professors:', error);
      setProfessors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfessorSelect = (professor: Professor) => {
    setSelectedProfessor(professor);
  };

  const handleRatingSubmit = async (rating: Omit<Rating, 'id' | 'timestamp'>) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rating)
      });
      const json = await res.json();
      return json.success;
    } catch (error) {
      console.error('Failed to submit rating:', error);
      return false;
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setProfessors([]);
    setSelectedProfessor(null);
  };

  const handleLogoClick = () => {
    handleBackToLanding();
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo 
            variant={currentView === 'landing' ? 'full' : 'compact'}
            onClick={handleLogoClick}
            className="cursor-pointer"
          />
          
          <div className="flex items-center space-x-6">
            {currentView !== 'landing' && (
              <button
                onClick={handleBackToLanding}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ← Back to Home
              </button>
            )}
            
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {currentView === 'landing' && (
          <LandingPage onYearSelect={handleYearSelect} />
        )}
        
        {(currentView === 'year-2' || currentView === 'year-3') && (
          <ProfessorList
            year={currentView === 'year-2' ? 2 : 3}
            professors={professors}
            isLoading={isLoading}
            onProfessorSelect={handleProfessorSelect}
          />
        )}
        
        {selectedProfessor && (
          <RatingModal
            professor={selectedProfessor}
            isOpen={!!selectedProfessor}
            onClose={() => setSelectedProfessor(null)}
            onSubmit={handleRatingSubmit}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 RateMyIS — Helping AAU Information Systems students make informed decisions
          </p>
        </div>
      </footer>
    </div>
  );
}

// Mock data


export default App;