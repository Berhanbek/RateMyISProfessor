import React from 'react';
import { Star, Users } from 'lucide-react';
import { ProfessorRatingStats } from '../types';
import { ratingCriteria } from '../data/professors';

interface RatingDisplayProps {
  ratings: ProfessorRatingStats | null;
  isLoading: boolean;
  instructor?: string;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ 
  ratings, 
  isLoading, 
  instructor 
}) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!ratings) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No ratings yet{instructor && ` for ${instructor}`}
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Be the first to rate!
          </p>
        </div>
      </div>
    );
  }

  const getStarColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-yellow-500';
    if (rating >= 3.5) return 'text-orange-500';
    return 'text-red-500';
  };

  const getStarFill = (rating: number, starIndex: number) => {
    if (rating >= starIndex) return 'fill-current';
    if (rating >= starIndex - 0.5) return 'fill-current opacity-50';
    return '';
  };

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${getStarColor(rating)} ${getStarFill(rating, star)}`}
          />
        ))}
        <span className={`ml-2 font-medium ${getStarColor(rating)} ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm animate-fade-in">
      <div className="space-y-5">
        {/* Header with overall rating */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Student Ratings
              {instructor && (
                <span className="text-sm font-normal text-gray-600 dark:text-gray-300 ml-2">
                  for {instructor}
                </span>
              )}
            </h3>
            {renderStars(ratings.averageRatings.overallExperience, 'lg')}
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">
                {ratings.totalRatings} rating{ratings.totalRatings !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Individual criteria ratings */}
        <div className="space-y-4">
          {ratingCriteria.map((criterion) => {
            const rating = ratings.averageRatings[criterion.key];
            return (
              <div key={criterion.key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg" role="img" aria-label={criterion.label}>
                    {criterion.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {criterion.label}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {renderStars(rating)}
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        rating >= 4.5 ? 'bg-green-500' :
                        rating >= 4.0 ? 'bg-yellow-500' :
                        rating >= 3.5 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(rating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rating distribution hint */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Ratings are based on student feedback and updated in real-time
          </p>
        </div>
      </div>
    </div>
  );
};