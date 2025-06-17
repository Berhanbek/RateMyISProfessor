import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Professor } from '../types';
import { ProfessorCard } from '../components/ProfessorCard';
import { RatingModal } from '../components/RatingModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { apiService } from '../services/api';

type SortOption = 'alphabetical' | 'most-ratings';

export const YearPage: React.FC = () => {
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();
  
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('alphabetical');
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const yearNumber = parseInt(year || '2') as 2 | 3;

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await apiService.getProfessors();
        setProfessors(data.filter(prof => prof.year === yearNumber));
      } catch (error) {
        console.error('Failed to fetch professors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, [yearNumber]);

  const filteredAndSortedProfessors = useMemo(() => {
    let filtered = professors.filter(prof =>
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return filtered;
  }, [professors, searchTerm, sortBy]);

  const handleProfessorClick = (professor: Professor) => {
    setSelectedProfessor(professor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProfessor(null);
  };

  const handleRatingSubmit = () => {
    // Refresh professors data to update rating counts
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-12">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div>
          <h1 className="text-h1 text-neutral-900 dark:text-white font-sans">
            {yearNumber === 2 ? '2nd' : '3rd'} Year Professors
          </h1>
          <p className="text-body text-neutral-600 dark:text-neutral-400 font-body mt-2">
            {yearNumber === 2 ? 'Core Information Science courses' : 'Advanced specialization courses'}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search professors or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="most-ratings">Most Ratings</option>
        </select>
      </div>

      {filteredAndSortedProfessors.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-h3 text-neutral-900 dark:text-white font-sans mb-2">
            No professors found
          </h3>
          <p className="text-body text-neutral-600 dark:text-neutral-400 font-body">
            Try adjusting your search terms.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProfessors.map(professor => (
            <ProfessorCard
              key={professor.id}
              professor={professor}
              onClick={() => handleProfessorClick(professor)}
            />
          ))}
        </div>
      )}

      {selectedProfessor && (
        <RatingModal
          professor={selectedProfessor}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  );
};