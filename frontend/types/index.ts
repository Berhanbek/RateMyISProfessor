export interface Professor {
  id: string
  name: string
  course: string
  year: number
  office?: string
  instructors?: string[] // <-- Add this line!
  averageRating: number
  rating: number
  totalReviews: number
  alternativeInstructor?: string
  avgRating?: number;  
}

export interface Rating {
  teachingStyle: number
  workload: number
  attendance: number
  assessment: number
  organization: number
  engagement: number
  overall: number
}

export interface Review {
  id: string
  professorId: string
  ratings: Rating
  reviewText?: string
  dateSubmitted: Date
  instructor: string
}
