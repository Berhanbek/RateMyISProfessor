import React from 'react';
import { BookOpen, Users, ArrowRight, GraduationCap } from 'lucide-react';

interface LandingPageProps {
  onYearSelect: (year: 2 | 3) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onYearSelect }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-12 mb-20">
        {/* Logo Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white tracking-tight">
            Rate My IS Professors
          </h1>
          
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Help fellow students by sharing your experience
          </p>
        </div>

        {/* Year Selection Question */}
        <div className="space-y-8">
          <h2 className="text-2xl font-light text-gray-700 dark:text-gray-300">
            Which year are you in?
          </h2>
          
          {/* Year Cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            <button
              onClick={() => onYearSelect(2)}
              className="group relative p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </div>
                
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                    2nd Year
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Rate your core IS professors
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-sm font-medium">Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>

            <button
              onClick={() => onYearSelect(3)}
              className="group relative p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-green-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </div>
                
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                    3rd Year
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Rate your advanced course instructors
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-sm font-medium">Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>  
            </button>
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="text-center space-y-8">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-auto"></div>
        
        <div className="space-y-6">
          <h3 className="text-xl font-light text-gray-700 dark:text-gray-300">
            Guidelines for helpful reviews
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-x-3 p-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full mb-3"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 text-center">Share honest experiences</span>
            </div>
            <div className="flex flex-col items-center space-x-3 p-4">
              <div className="w-2 h-2 bg-green-400 rounded-full mb-3"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 text-center">Keep feedback constructive</span>
            </div>
            <div className="flex flex-col items-center space-x-3 p-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full mb-3"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 text-center">Focus on teaching quality</span>
            </div>
            <div className="flex flex-col items-center space-x-3 p-4">
              <div className="w-2 h-2 bg-orange-400 rounded-full mb-3"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 text-center">Respect all professors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;