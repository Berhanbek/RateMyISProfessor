import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { Professor, RatingCategory } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface RatingModalProps {
  professor: Professor;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: any) => Promise<boolean>;
}

const ratingCategories: RatingCategory[] = [
  {
    key: 'overall',
    label: 'Overall Quality',
    description: 'Your overall experience with this professor'
  },
  {
    key: 'engagement',
    label: 'Teaching Quality',
    description: 'How well does the professor explain concepts and engage students?'
  },
  {
    key: 'workload',
    label: 'Course Difficulty',
    description: 'How challenging is the coursework and assignments?'
  },
  {
    key: 'organization',
    label: 'Course Organization',
    description: 'How well-structured and organized is the course?'
  }
];

const RatingModal: React.FC<RatingModalProps> = ({
  professor,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [textReview, setTextReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleRatingChange = (category: string, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required ratings
    const missingRatings = ratingCategories.filter(cat => !ratings[cat.key]);
    if (missingRatings.length > 0) {
      setError('Please rate all categories before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const ratingData = {
      professorId: professor.id,
      ...ratings,
      textReview: textReview.trim() || undefined
    };

    const success = await onSubmit(ratingData);
    
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setRatings({});
        setTextReview('');
      }, 2000);
    } else {
      setError('Failed to submit rating. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const getRatingLabel = (value: number) => {
    const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return labels[value] || '';
  };

  const getRatingColor = (value: number) => {
    if (value >= 4.5) return 'from-green-400 to-green-500';
    if (value >= 3.5) return 'from-blue-400 to-blue-500';
    if (value >= 2.5) return 'from-yellow-400 to-yellow-500';
    if (value >= 1.5) return 'from-orange-400 to-orange-500';
    return 'from-red-400 to-red-500';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Rate {professor.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {professor.course}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-6 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800">
            <div className="text-center text-green-800 dark:text-green-200">
              <div className="text-lg font-medium">Thanks for your rating!</div>
              <div className="text-sm">Your feedback helps other students.</div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Rating Categories with Sliders */}
          <div className="space-y-8">
            {ratingCategories.map((category) => (
              <div key={category.key} className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {category.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {/* Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={ratings[category.key] || 1}
                      onChange={(e) => handleRatingChange(category.key, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: ratings[category.key] 
                          ? `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${((ratings[category.key] - 1) / 4) * 100}%, rgb(229, 231, 235) ${((ratings[category.key] - 1) / 4) * 100}%, rgb(229, 231, 235) 100%)`
                          : undefined
                      }}
                    />
                  </div>
                  
                  {/* Rating Display */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Poor</span>
                      <span className="text-gray-300">•</span>
                      <span>Fair</span>
                      <span className="text-gray-300">•</span>
                      <span>Good</span>
                      <span className="text-gray-300">•</span>
                      <span>Very Good</span>
                      <span className="text-gray-300">•</span>
                      <span>Excellent</span>
                    </div>
                    
                    {ratings[category.key] && (
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getRatingColor(ratings[category.key])} text-white`}>
                          {ratings[category.key].toFixed(1)}/5.0
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {getRatingLabel(Math.round(ratings[category.key]))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Text Review */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Written Review (Optional)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Share your experience to help other students. Keep it respectful and constructive.
            </p>
            <textarea
              value={textReview}
              onChange={(e) => setTextReview(e.target.value)}
              placeholder="What was your experience like with this professor? What should other students know?"
              rows={4}
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white resize-none transition-all duration-200"
              maxLength={500}
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
              {textReview.length}/500
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(ratings).length < ratingCategories.length}
              className={`px-8 py-3 rounded-xl text-white font-medium transition-all duration-200 flex items-center space-x-2 ${
                isSubmitting || Object.keys(ratings).length < ratingCategories.length
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Rating</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;