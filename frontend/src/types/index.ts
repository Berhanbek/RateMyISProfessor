export interface Professor {
  id: string;
  name: string;
  course: string;
  office: string;
  instructors?: string[]; // For courses with multiple instructors
}

export interface Rating {
  professorId: string;
  instructor?: string;
  overallExperience: number;
  courseLoad: number;
  examFairness: number;
  courseContent: number;
}

export interface ProfessorRatingStats {
  professorId: string;
  instructor?: string;
  averageRatings: {
    overallExperience: number;
    courseLoad: number;
    examFairness: number;
    courseContent: number;
  };
  totalRatings: number;
}

export type Year = '2nd' | '3rd';
export type Page = 'year-selection' | '2nd-year' | '3rd-year';
export type Theme = 'light' | 'dark';

export interface RatingCriteria {
  label: string;
  key: keyof Omit<Rating, 'professorId' | 'instructor'>;
  description: string;
  icon: string;
}