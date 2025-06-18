import React, { useState } from 'react';
import { Star, Search, ChevronDown, ChevronUp, MessageCircle, Clock, Plus, Filter } from 'lucide-react';
import { Professor } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface ProfessorListProps {
  year: 2 | 3;
  professors: Professor[];
  isLoading: boolean;
  onProfessorSelect: (professor: Professor) => void;
}

interface Review {
  id: string;
  textReview: string;
  timestamp: Date;
  overall: number;
}

// Mock reviews data
const mockReviews: Record<string, Review[]> = {
  '2-1': [
    {
      id: 'r1',
      textReview: 'Dr. Dagmawit is very knowledgeable and explains complex database concepts clearly. The assignments are challenging but fair.',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      overall: 4
    },
    {
      id: 'r2',
      textReview: 'Great professor! Very organized course structure and always available during office hours for help.',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      overall: 5
    },
    {
      id: 'r3',
      textReview: 'Good teaching style, but the workload can be quite heavy. Make sure to stay on top of assignments.',
      timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      overall: 4
    }
  ],
  '2-2': [
    {
      id: 'r4',
      textReview: 'Excellent teaching style. Makes DSA concepts easy to understand with practical examples.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      overall: 5
    },
    {
      id: 'r5',
      textReview: 'Very patient instructor. Takes time to explain difficult algorithms step by step.',
      timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      overall: 5
    }
  ],
  '3-2': [
    {
      id: 'r6',
      textReview: 'Selam is an amazing instructor! Very practical approach to web development.',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      overall: 5
    },
    {
      id: 'r7',
      textReview: 'Great hands-on learning experience. The lab sessions are well-organized.',
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      overall: 5
    }
  ]
};

const ProfessorList: React.FC<ProfessorListProps> = ({
  year,
  professors,
  isLoading,
  onProfessorSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProfessor, setExpandedProfessor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'reviews'>('rating');

  const filteredAndSortedProfessors = professors
    .filter(prof => 
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.course.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'reviews':
          return b.totalRatings - a.totalRatings;
        default:
          return 0;
      }
    });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 14) return '1 week ago';
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'from-green-500 to-green-600 text-white';
    if (rating >= 4.0) return 'from-blue-500 to-blue-600 text-white';
    if (rating >= 3.5) return 'from-yellow-500 to-yellow-600 text-white';
    if (rating >= 3.0) return 'from-orange-500 to-orange-600 text-white';
    return 'from-red-500 to-red-600 text-white';
  };

  const toggleExpanded = (professorId: string) => {
    setExpandedProfessor(expandedProfessor === professorId ? null : professorId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 dark:text-gray-400">Loading professors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {year === 2 ? '2nd Year' : '3rd Year'} Professors
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find and rate your Information Systems professors. Your honest feedback helps fellow students make informed decisions.
          </p>
        </div>
        
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm text-blue-700 dark:text-blue-300">
          <span className="font-medium">{professors.length} professors available</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search professors or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'reviews')}
            className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
          >
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Professor Cards */}
      <div className="grid gap-6 max-w-5xl mx-auto">
        {filteredAndSortedProfessors.map((professor) => {
          const reviews = mockReviews[professor.id] || [];
          const isExpanded = expandedProfessor === professor.id;
          const ratingColorClass = getRatingColor(professor.averageRating);
          
          return (
            <div
              key={professor.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Main Professor Card */}
              <div className="p-8">
                <div className="flex items-start justify-between">
                  {/* Professor Info */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-6">
                      {/* Rating Circle */}
                      <div className={`flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${ratingColorClass} shadow-lg`}>
                        <div className="text-center">
                          <div className="text-xl font-bold">
                            {professor.averageRating.toFixed(1)}
                          </div>
                          <div className="text-xs opacity-90">
                            /5.0
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {professor.name}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                          {professor.course}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <span>📍</span>
                            <span>{professor.office}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{professor.totalRatings} reviews</span>
                          </span>
                        </div>
                        {professor.alternateInstructor && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <span className="font-medium">Alternative:</span> {professor.alternateInstructor}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3 ml-6">
                    <button
                      onClick={() => onProfessorSelect(professor)}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Rate Professor</span>
                    </button>
                    
                    {reviews.length > 0 && (
                      <button
                        onClick={() => toggleExpanded(professor.id)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm transition-all duration-200"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>View {reviews.length} Reviews</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              {isExpanded && reviews.length > 0 && (
                <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="p-8 space-y-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2 text-lg">
                      <MessageCircle className="w-5 h-5" />
                      <span>Student Reviews</span>
                    </h4>
                    
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.overall
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                              <span className="text-sm font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                                {review.overall}/5
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimeAgo(review.timestamp)}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            "{review.textReview}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredAndSortedProfessors.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No professors found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfessorList;