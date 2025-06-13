import React, { useState, useEffect } from 'react';
import { Page, Theme, Year } from './types';
import { YearSelection } from './components/YearSelection';
import { SecondYearRating } from './components/SecondYearRating';
import { ThirdYearRating } from './components/ThirdYearRating';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('year-selection');
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme from system preference or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleYearSelect = (year: Year) => {
    setCurrentPage(year === '2nd' ? '2nd-year' : '3rd-year');
  };

  const handleBackToSelection = () => {
    setCurrentPage('year-selection');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'year-selection':
        return <YearSelection onYearSelect={handleYearSelect} />;
      case '2nd-year':
        return <SecondYearRating onBack={handleBackToSelection} />;
      case '3rd-year':
        return <ThirdYearRating onBack={handleBackToSelection} />;
      default:
        return <YearSelection onYearSelect={handleYearSelect} />;
    }
  };

  return (
    <div className="min-h-screen font-inter">
      <ThemeToggle theme={theme} onThemeChange={handleThemeChange} />
      {renderCurrentPage()}
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © 2025 Rate My IS Professors by TheISSeer
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;