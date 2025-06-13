import React from 'react';
import { MapPin, BookOpen, Star } from 'lucide-react';
import { Professor, ProfessorRatingStats } from '../types';

interface ProfessorCardProps {
  professor: Professor;
  onClick: () => void;
  ratings?: ProfessorRatingStats | null;
}

export const ProfessorCard: React.FC<ProfessorCardProps> = ({ 
  professor, 
  onClick, 
  ratings 
}) => {
  const getOverallRating = () => {
    if (!ratings) return null;
    return ratings.averageRatings.overallExperience;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-yellow-500';
    if (rating >= 3.5) return 'text-orange-500';
    return 'text-red-500';
  };

  const overallRating = getOverallRating();

  return (
    <button
      onClick={onClick}
      className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-left group"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {professor.instructors ? professor.name : professor.name}
          </h3>
          <div className="flex items-center space-x-2">
            {overallRating && (
              <div className="flex items-center space-x-1">
                <Star className={`w-4 h-4 ${getRatingColor(overallRating)} fill-current`} />
                <span className={`text-sm font-medium ${getRatingColor(overallRating)}`}>
                  {overallRating.toFixed(1)}
                </span>
              </div>
            )}
            <div className="w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <BookOpen className="w-4 h-4" />
          <span>{professor.course}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{professor.office}</span>
          </div>
          
          {ratings && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {ratings.totalRatings} rating{ratings.totalRatings !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {professor.instructors && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Available instructors:</p>
            <div className="flex flex-wrap gap-2">
              {professor.instructors.map((instructor, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300"
                >
                  {instructor}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </button>
  );
};