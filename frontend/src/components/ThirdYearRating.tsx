import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Professor, Rating, ProfessorRatingStats } from '../types';
import { thirdYearProfessors } from '../data/professors';
import { ProfessorCard } from './ProfessorCard';
import { RatingModal } from './RatingModal';
import { fetchProfessorRatings } from '../services/ratingsService';

interface ThirdYearRatingProps {
  onBack: () => void;
}

export const ThirdYearRating: React.FC<ThirdYearRatingProps> = ({ onBack }) => {
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [professorRatings, setProfessorRatings] = useState<Record<string, ProfessorRatingStats | null>>({});

  // Load ratings for all professors when component mounts
  useEffect(() => {
    const loadAllRatings = async () => {
      const ratingsPromises = thirdYearProfessors.map(async (professor) => {
        // For professors with multiple instructors, we'll show the highest rated one as preview
        if (professor.instructors && professor.instructors.length > 0) {
          const instructorRatings = await Promise.all(
            professor.instructors.map(instructor => 
              fetchProfessorRatings(professor.id, instructor)
            )
          );
          
          // Find the instructor with the highest overall rating
          const bestRating = instructorRatings
            .filter(rating => rating !== null)
            .sort((a, b) => (b?.averageRatings.overallExperience || 0) - (a?.averageRatings.overallExperience || 0))[0];
          
          return { professorId: professor.id, ratings: bestRating };
        } else {
          const ratings = await fetchProfessorRatings(professor.id);
          return { professorId: professor.id, ratings };
        }
      });

      const ratingsResults = await Promise.all(ratingsPromises);
      const ratingsMap = ratingsResults.reduce((acc, { professorId, ratings }) => {
        acc[professorId] = ratings;
        return acc;
      }, {} as Record<string, ProfessorRatingStats | null>);

      setProfessorRatings(ratingsMap);
    };

    loadAllRatings();
  }, []);

  const handleRatingSubmit = (rating: Rating) => {
    console.log('Rating submitted:', rating);
    // Refresh ratings for the specific professor
    if (rating.instructor) {
      fetchProfessorRatings(rating.professorId, rating.instructor).then(updatedRatings => {
        setProfessorRatings(prev => ({
          ...prev,
          [rating.professorId]: updatedRatings
        }));
      });
    } else {
      fetchProfessorRatings(rating.professorId).then(updatedRatings => {
        setProfessorRatings(prev => ({
          ...prev,
          [rating.professorId]: updatedRatings
        }));
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Year Selection</span>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              3rd Year Professors
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Select a course to rate your instructor
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {thirdYearProfessors.map((professor) => (
            <ProfessorCard
              key={professor.id}
              professor={professor}
              ratings={professorRatings[professor.id]}
              onClick={() => setSelectedProfessor(professor)}
            />
          ))}
        </div>

        <RatingModal
          professor={selectedProfessor!}
          isOpen={!!selectedProfessor}
          onClose={() => setSelectedProfessor(null)}
          onSubmit={handleRatingSubmit}
        />
      </div>
    </div>
  );
};