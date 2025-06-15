import { ProfessorRatingStats } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const fetchProfessorRatings = async (
  professorId: string, 
  instructor?: string
): Promise<ProfessorRatingStats | null> => {
  try {
    const url = new URL(`${API_URL}/ratings`);
    url.searchParams.append('professorId', professorId);
    if (instructor) url.searchParams.append('instructor', instructor);

    const res = await fetch(url.toString());
    const json: ApiResponse<ProfessorRatingStats> = await res.json();
    return json.success ? json.data || null : null;
  } catch (error) {
    console.error('Error fetching professor ratings:', error);
    return null;
  }
};

export const updateProfessorRatings = async (
  professorId: string,
  newRating: {
    overallExperience: number;
    courseLoad: number;
    examFairness: number;
    courseContent: number;
  },
  instructor?: string
): Promise<ProfessorRatingStats> => {
  const res = await fetch(`${API_URL}/ratings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      professorId,
      instructor,
      ...newRating
    })
  });
  const json: ApiResponse<ProfessorRatingStats> = await res.json();
  if (!json.success) throw new Error(json.error || 'Failed to submit rating');
  // After submitting, fetch the updated stats
  return fetchProfessorRatings(professorId, instructor) as Promise<ProfessorRatingStats>;
};