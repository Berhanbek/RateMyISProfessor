export interface Professor {
  id: string;
  name: string;
  course: string;
  office: string;
  year: 2 | 3;
  instructors?: string[];
}

export interface Rating {
  id: string;
  professorId: string;
  instructor?: string;
  engagement: number;
  workload: number;
  attendance: number;
  fairness: number;
  organization: number;
  overall: number;
  review?: string;
  createdAt: string;
}

export interface RatingSubmission {
  professorId: string;
  instructor?: string;
  engagement: number;
  workload: number;
  attendance: number;
  fairness: number;
  organization: number;
  overall: number;
  review?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}