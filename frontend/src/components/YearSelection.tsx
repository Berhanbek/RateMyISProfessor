import React from 'react';
import { GraduationCap, Users } from 'lucide-react';
import { Year } from '../types';

interface YearSelectionProps {
  onYearSelect: (year: Year) => void;
}

export const YearSelection: React.FC<YearSelectionProps> = ({ onYearSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Rate My IS Professors
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Help fellow students by sharing your experience
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
            Which year are you in?
          </h2>
          
          <button
            onClick={() => onYearSelect('2nd')}
            className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors duration-300">
                <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  2nd Year
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Rate your core IS professors
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onYearSelect('3rd')}
            className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors duration-300">
                <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  3rd Year
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Rate your advanced course instructors
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};