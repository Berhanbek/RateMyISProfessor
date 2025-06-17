import React, { useState, useEffect } from 'react';
import { MapPin, Star, Users, TrendingUp } from 'lucide-react';
import { Professor, Rating } from '../types';
import { apiService } from '../services/api';

interface ProfessorCardProps {
  professor: Professor;
  onClick: () => void;
}

export const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor, onClick }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await apiService.getRatings(professor.id);
        setRatings(data);
      } catch (error) {
        console.error('Failed to fetch ratings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [professor.id]);

  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating.overall, 0) / ratings.length 
    : 0;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 dark:text-green-400';
    if (rating >= 3.5) return 'text-yellow-600 dark:text-yellow-400';
    if (rating >= 2.5) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    if (rating >= 3.5) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    if (rating >= 2.5) return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-300 dark:hover:border-primary-600 hover:-translate-y-1 ${
        isHovered ? 'bg-white dark:bg-neutral-800' : ''
      }`}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1 truncate">
              {professor.name}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">
              {professor.course}
            </p>
          </div>
          
          {averageRating > 0 && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getRatingBg(averageRating)}`}>
              <Star className={`w-4 h-4 fill-current ${getRatingColor(averageRating)}`} />
              <span className={`text-sm font-semibold ${getRatingColor(averageRating)}`}>
                {averageRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Office Location */}
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm truncate">{professor.office}</span>
        </div>

        {/* Rating Stats */}
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <div className="w-5 h-5 border-2 border-neutral-300 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : averageRating > 0 ? (
          <div className="space-y-3">
            {/* Rating breakdown preview */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                <Users className="w-3 h-3" />
                <span>{ratings.length} review{ratings.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                <TrendingUp className="w-3 h-3" />
                <span>Click to rate</span>
              </div>
            </div>
            
            {/* Visual rating bar */}
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(averageRating / 5) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-4 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
            <div className="text-neutral-400 dark:text-neutral-500 mb-1">
              <Star className="w-5 h-5 mx-auto mb-2" />
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              Be the first to rate!
            </p>
          </div>
        )}

        {/* Hover indicator */}
        <div className={`absolute bottom-4 right-4 w-2 h-2 bg-primary-500 rounded-full transition-all duration-300 ${
          isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`} />
      </div>
    </div>
  );
};