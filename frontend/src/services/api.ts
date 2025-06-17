import { Professor, Rating, RatingSubmission, ApiResponse } from '../types';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.render.com/api' 
  : '/api';

// Mock storage for ratings (in a real app, this would be handled by the backend)
const mockRatings: Rating[] = [];
let ratingIdCounter = 1;

class ApiService {
  private async fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getProfessors(): Promise<Professor[]> {
    // In development, use local data directly
    if (process.env.NODE_ENV !== 'production') {
      const { professors } = await import('../data/professors');
      return professors;
    }

    try {
      const response = await this.fetchWithErrorHandling<ApiResponse<Professor[]>>(
        `${API_BASE_URL}/professors`
      );
      return response.data;
    } catch (error) {
      // Fallback to local data if API is not available
      const { professors } = await import('../data/professors');
      return professors;
    }
  }

  async getRatings(professorId: string): Promise<Rating[]> {
    // In development, use mock ratings directly
    if (process.env.NODE_ENV !== 'production') {
      return mockRatings.filter(rating => rating.professorId === professorId);
    }

    try {
      const response = await this.fetchWithErrorHandling<ApiResponse<Rating[]>>(
        `${API_BASE_URL}/ratings?professorId=${professorId}`
      );
      return response.data;
    } catch (error) {
      // Return mock ratings for the professor
      return mockRatings.filter(rating => rating.professorId === professorId);
    }
  }

  async submitRating(rating: RatingSubmission): Promise<Rating> {
    // In development, use mock submission directly
    if (process.env.NODE_ENV !== 'production') {
      const newRating: Rating = {
        id: `rating-${ratingIdCounter++}`,
        ...rating,
        createdAt: new Date().toISOString()
      };
      
      mockRatings.push(newRating);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return newRating;
    }

    try {
      const response = await this.fetchWithErrorHandling<ApiResponse<Rating>>(
        `${API_BASE_URL}/ratings`,
        {
          method: 'POST',
          body: JSON.stringify(rating),
        }
      );
      return response.data;
    } catch (error) {
      // Mock successful submission
      const newRating: Rating = {
        id: `rating-${ratingIdCounter++}`,
        ...rating,
        createdAt: new Date().toISOString()
      };
      
      mockRatings.push(newRating);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return newRating;
    }
  }
}

export const apiService = new ApiService();