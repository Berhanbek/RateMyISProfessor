import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { Professor, Rating, ProfessorRatingStats } from '../types';
import { ratingCriteria } from '../data/professors';
import { RatingDisplay } from './RatingDisplay';
import { fetchProfessorRatings, updateProfessorRatings } from '../services/ratingsService';

interface RatingModalProps {
  professor: Professor;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: Rating) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  professor,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [selectedInstructor, setSelectedInstructor] = useState<string>('');
  const [ratings, setRatings] = useState<Omit<Rating, 'professorId' | 'instructor'>>({
    overallExperience: 0,
    courseLoad: 0,
    examFairness: 0,
    courseContent: 0
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [professorRatings, setProfessorRatings] = useState<ProfessorRatingStats | null>(null);
  const [isLoadingRatings, setIsLoadingRatings] = useState(false);

  // Load existing ratings when modal opens or instructor changes
  useEffect(() => {
    if (isOpen && professor) {
      loadProfessorRatings();
    }
  }, [isOpen, professor, selectedInstructor]);

  const loadProfessorRatings = async () => {
    setIsLoadingRatings(true);
    try {
      const ratingsData = await fetchProfessorRatings(
        professor.id, 
        professor.instructors ? selectedInstructor : undefined
      );
      setProfessorRatings(ratingsData);
    } catch (error) {
      console.error('Failed to load ratings:', error);
    } finally {
      setIsLoadingRatings(false);
    }
  };

  if (!isOpen) return null;

  const handleRatingChange = (criterion: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [criterion]: value }));
  };

  const handleSubmit = async () => {
    const rating: Rating = {
      professorId: professor.id,
      instructor: selectedInstructor || undefined,
      ...ratings
    };
    
    try {
      // Update ratings in the backend simulation
      const updatedRatings = await updateProfessorRatings(
        professor.id,
        ratings,
        professor.instructors ? selectedInstructor : undefined
      );
      
      // Update local state with new ratings
      setProfessorRatings(updatedRatings);
      
      onSubmit(rating);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        // Reset form
        setSelectedInstructor('');
        setRatings({
          overallExperience: 0,
          courseLoad: 0,
          examFairness: 0,
          courseContent: 0
        });
      }, 2000);
    } catch (error) {
      console.error('Failed to submit rating:', error);
    }
  };

  const isFormValid = Object.values(ratings).every(rating => rating > 0) &&
    (!professor.instructors || selectedInstructor);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Thanks for your honest rating!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your feedback helps other students make informed decisions.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Rate Professor
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {professor.course}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Existing Ratings Display */}
              <RatingDisplay 
                ratings={professorRatings} 
                isLoading={isLoadingRatings}
                instructor={professor.instructors ? selectedInstructor : undefined}
              />

              {professor.instructors && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Which instructor did you have?
                  </label>
                  <div className="space-y-2">
                    {professor.instructors.map((instructor) => (
                      <label key={instructor} className="flex items-center">
                        <input
                          type="radio"
                          name="instructor"
                          value={instructor}
                          checked={selectedInstructor === instructor}
                          onChange={(e) => setSelectedInstructor(e.target.value)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          {instructor}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Add Your Rating
                </h3>
                
                {ratingCriteria.map((criterion) => (
                  <div key={criterion.key} className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {criterion.icon} {criterion.label}
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {criterion.description}
                    </p>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleRatingChange(criterion.key, value)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              value <= ratings[criterion.key]
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="flex items-center ml-3 text-sm text-gray-600 dark:text-gray-300">
                        {ratings[criterion.key]}/5
                      </span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};