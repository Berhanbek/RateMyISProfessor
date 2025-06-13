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
  const params = new URLSearchParams({ professorId });
  if (instructor) params.append('instructor', instructor);
  const res = await fetch(`${API_URL}/ratings?${params.toString()}`);
  const json: ApiResponse<ProfessorRatingStats> = await res.json();
  return json.data ?? null;
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
      ratings: newRating
    })
  });
  const json: ApiResponse<any> = await res.json();
  // After submitting, fetch the updated stats
  return fetchProfessorRatings(professorId, instructor) as Promise<ProfessorRatingStats>;
};