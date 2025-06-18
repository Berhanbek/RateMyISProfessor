export interface Professor {
  id: string;
  name: string;
  course: string;
  office: string;
  totalRatings: number;
  averageRating: number;
  alternateInstructor?: string;
}

export interface Rating {
  id: string;
  professorId: string;
  engagement: number;
  workload: number;
  attendance: number;
  examFairness: number;
  organization: number;
  overall: number;
  textReview?: string;
  timestamp: Date;
}

export interface RatingCategory {
  key: keyof Omit<Rating, 'id' | 'professorId' | 'textReview' | 'timestamp'>;
  label: string;
  description: string;
}