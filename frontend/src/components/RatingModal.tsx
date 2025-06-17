import React, { useState, useEffect } from 'react';
import { X, Send, ChevronDown } from 'lucide-react';
import { Professor, RatingSubmission } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { useToast } from '../context/ToastContext';
import { apiService } from '../services/api';

interface RatingModalProps {
  professor: Professor;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

interface RatingState {
  engagement: number;
  workload: number;
  attendance: number;
  fairness: number;
  organization: number;
  overall: number;
}

const ratingCategories = [
  {
    key: 'engagement' as keyof RatingState,
    label: 'Engagement & Support',
    description: 'How well does the instructor engage students?'
  },
  {
    key: 'workload' as keyof RatingState,
    label: 'Workload Balance',
    description: 'How manageable is the course workload?'
  },
  {
    key: 'attendance' as keyof RatingState,
    label: 'Attendance Policy',
    description: 'How important is attendance?'
  },
  {
    key: 'fairness' as keyof RatingState,
    label: 'Assessment Fairness',
    description: 'How fair are exams and assignments?'
  },
  {
    key: 'organization' as keyof RatingState,
    label: 'Course Organization',
    description: 'How well-structured is the course?'
  },
  {
    key: 'overall' as keyof RatingState,
    label: 'Overall Experience',
    description: 'Your complete experience'
  }
];

const ratingLabels = ['Poor', 'Below Average', 'Average', 'Good', 'Excellent'];

export const RatingModal: React.FC<RatingModalProps> = ({
  professor,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [ratings, setRatings] = useState<RatingState>({
    engagement: 3,
    workload: 3,
    attendance: 3,
    fairness: 3,
    organization: 3,
    overall: 3
  });
  
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setRatings({
        engagement: 3,
        workload: 3,
        attendance: 3,
        fairness: 3,
        organization: 3,
        overall: 3
      });
      setSelectedInstructor(professor.instructors?.[0] || '');
      setReview('');
      setShowConfirmation(false);
    }
  }, [isOpen, professor]);

  const handleRatingChange = (category: keyof RatingState, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (professor.instructors && !selectedInstructor) {
      showToast('error', 'Please select an instructor');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submission: RatingSubmission = {
        professorId: professor.id,
        instructor: professor.instructors ? selectedInstructor : undefined,
        ...ratings,
        review: review.trim() || undefined
      };

      await apiService.submitRating(submission);
      setShowConfirmation(true);
      
      // Auto close after showing confirmation
      setTimeout(() => {
        onSubmit();
        onClose();
      }, 2500);
    } catch (error) {
      showToast('error', 'Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          
          <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8 text-center">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl text-neutral-600 dark:text-neutral-400">✓</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
              Thanks for your honest rating!
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Your feedback helps fellow students make better decisions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="relative p-6 border-b border-neutral-200 dark:border-neutral-700">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="pr-12">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
                Rate {professor.name}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {professor.course} • {professor.office}
              </p>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit} className="p-6">
              {/* Instructor Selection */}
              {professor.instructors && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                    Select Instructor
                  </label>
                  <div className="relative">
                    <select
                      value={selectedInstructor}
                      onChange={(e) => setSelectedInstructor(e.target.value)}
                      className="w-full p-3 pr-10 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all appearance-none"
                      required
                    >
                      <option value="">Choose an instructor...</option>
                      {professor.instructors.map(instructor => (
                        <option key={instructor} value={instructor}>
                          {instructor}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Rating Categories */}
              <div className="space-y-6 mb-6">
                {ratingCategories.map((category) => (
                  <div 
                    key={category.key}
                    className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-white">
                          {category.label}
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                          {category.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                          {ratings[category.key]}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {ratingLabels[ratings[category.key] - 1]}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={ratings[category.key]}
                          onChange={(e) => handleRatingChange(category.key, parseInt(e.target.value))}
                          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-neutral-200 dark:bg-neutral-700 slider"
                        />
                      </div>
                      
                      {/* Rating markers */}
                      <div className="flex justify-between px-0.5">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleRatingChange(category.key, value)}
                            className={`w-6 h-6 rounded-full text-xs font-medium transition-all ${
                              value === ratings[category.key]
                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Share Your Experience (Optional)
                </label>
                <div className="relative">
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    maxLength={200}
                    rows={3}
                    placeholder="Help future students with specific insights..."
                    className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all resize-none"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-neutral-500 dark:text-neutral-400">
                    {review.length}/200
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:bg-neutral-400 dark:disabled:bg-neutral-600 transition-colors flex items-center justify-center gap-2 font-medium"
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
      </div>
    </div>
  );
};