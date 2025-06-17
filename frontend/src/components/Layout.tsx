
import React from 'react';
import { GraduationCap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-200">
      <header className="border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img 
                src="/image.png" 
                alt="SIS Logo" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <GraduationCap className="w-8 h-8 text-primary-600 hidden" />
              <h1 className="text-h3 text-neutral-900 dark:text-white font-sans">
                Rate My IS Professors
              </h1>
            </div>
            
            <button
              onClick={toggleTheme}
              className="relative w-12 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              aria-label="Toggle theme"
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-neutral-900 rounded-full shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                isDark ? 'translate-x-6' : 'translate-x-0'
              }`}>
                {isDark ? (
                  <Moon className="w-3 h-3 text-neutral-600" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-container mx-auto px-6 py-12">
        {children}
      </main>
      
      <footer className="border-t border-neutral-200 dark:border-neutral-700 mt-24">
        <div className="max-w-container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-body text-neutral-600 dark:text-neutral-400 font-body">
              © 2025 Rate My IS Professors by TheISSeer — Built for students, by students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};