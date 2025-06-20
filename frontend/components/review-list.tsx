"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Review } from "@/types"
import { Star, Calendar, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export interface ReviewListProps {
  reviews: Review[]
  isLoading: boolean
  professorName: string
}

export function ReviewList({ reviews, isLoading, professorName }: ReviewListProps) {
  const [sortBy, setSortBy] = useState("newest")

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime()
      case "oldest":
        return new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime()
      case "highest":
        const avgA = Object.values(a.ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(a.ratings).length
        const avgB = Object.values(b.ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(b.ratings).length
        return avgB - avgA
      default:
        return 0
    }
  })

  const handleSubmit = async (reviewData: Review) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2 text-sm text-muted-foreground">Loading reviews...</span>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet.</p>
        <p className="text-sm text-muted-foreground mt-1">Be the first to review this professor!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{reviews.length} reviews</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedReviews.map((review) => {
          const averageRating =
            Object.values(review.ratings).reduce((sum, rating) => sum + rating, 0) /
            Object.values(review.ratings).length

          return (
            <Card key={review.id} className="border-l-4 border-l-primary/20">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Rating Summary */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{averageRating.toFixed(1)}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {review.instructor}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {review.dateSubmitted
                          ? new Date(review.dateSubmitted).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  {review.reviewText && <p className="text-sm leading-relaxed">{review.reviewText}</p>}

                  {/* Detailed Ratings */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Teaching: {review.ratings.teachingStyle}/5</div>
                    <div>Workload: {review.ratings.workload}/5</div>
                    <div>Attendance: {review.ratings.attendance}/5</div>
                    <div>Assessment: {review.ratings.assessment}/5</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
