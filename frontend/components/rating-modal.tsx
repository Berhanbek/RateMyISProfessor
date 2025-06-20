"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RatingSlider } from "@/components/rating-slider"
import { ReviewList } from "@/components/review-list"
import type { Professor, Review } from "@/types"
import { Star, Send, Info, Loader2, X, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RatingModalProps {
  professor: Professor
  isOpen: boolean
  onClose: () => void
}

const ratingCategories = [
  { key: "teachingStyle", label: "Teaching Style", description: "How well the professor explains concepts" },
  { key: "workload", label: "Workload", description: "Amount of assignments and difficulty level" },
  {
    key: "attendance",
    label: "Attendance Policy",
    description: "Flexibility and reasonableness of attendance requirements",
  },
  { key: "assessment", label: "Assessment Fairness", description: "Fair grading and clear evaluation criteria" },
  { key: "organization", label: "Course Organization", description: "Structure and planning of the course" },
  { key: "engagement", label: "Engagement & Support", description: "Availability and willingness to help students" },
  { key: "overall", label: "Overall Experience", description: "Your general satisfaction with the course" },
]

export function RatingModal({ professor, isOpen, onClose }: RatingModalProps) {
  const [selectedInstructor, setSelectedInstructor] = useState(
    professor.instructors?.[0] ?? professor.name
  )
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [reviewText, setReviewText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) {
      loadReviews()
      // Reset form when modal opens
      setRatings({})
      setReviewText("")
      setSelectedInstructor(
        professor.instructors && professor.instructors.length > 0
          ? professor.instructors[0]
          : professor.name
      )
    }
  }, [isOpen, professor.id, professor.name, professor.instructors])

  const loadReviews = async () => {
    setIsLoadingReviews(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews?professorId=${professor.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
      }

      const data = await response.json()
      setReviews(data.data) // Make sure to use .data from your backend response
    } catch (error) {
      console.error("Error fetching reviews:", error)
      setReviews([])
    } finally {
      setIsLoadingReviews(false)
    }
  }

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }))
  }

  const handleSubmit = async () => {
    const ratingCount = Object.keys(ratings).length
    if (ratingCount < ratingCategories.length) {
      toast({
        title: "Incomplete Rating",
        description: "Please rate all categories before submitting.",
        variant: "destructive",
      })
      return
    }

    if (reviewText.length > 300) {
      toast({
        title: "Review Too Long",
        description: "Please keep your review under 300 characters.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          professorId: professor.id,
          instructor: selectedInstructor,
          ratings,
          reviewText: reviewText.trim() || null,
        }),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to submit review")
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      }

      const result = await response.json()

      toast({
        title: "Review Submitted!",
        description: result.message || "Thank you for your feedback.",
      })

      // Reset form
      setRatings({})
      setReviewText("")

      // Reload reviews
      await loadReviews()
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "Failed to submit review",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const averageRating =
    Object.values(ratings).length > 0
      ? Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length
      : 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0 sm:rounded-lg">
        {/* Mobile-optimized header */}
        <DialogHeader className="p-4 pb-2 sm:p-6 sm:pb-4 border-b shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-lg sm:text-xl font-semibold leading-tight">
                Rate {professor.name}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {professor.course}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Year {professor.year}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 h-8 w-8 sm:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Rating Form */}
              <div className="space-y-6">
                {/* Instructor Selection */}
                {professor.instructors && professor.instructors.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Instructor</label>
                    <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {professor.instructors?.map((instructor: string) => (
  <SelectItem key={instructor} value={instructor}>
    {instructor}
  </SelectItem>
))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Rating Categories */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Rate Your Experience</h3>
                  {ratingCategories.map((category) => (
                    <div key={category.key} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium flex-1">{category.label}</label>
                        <div className="group relative">
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          <div className="bg-popover text-popover-foreground text-xs rounded-md p-2 shadow-lg border max-w-48 text-center whitespace-normal absolute left-1/2 -translate-x-1/2 mt-2 z-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                            {category.description}
                          </div>
                        </div>
                      </div>
                      <RatingSlider
                        value={ratings[category.key] || 0}
                        onChange={(value) => handleRatingChange(category.key, value)}
                      />
                    </div>
                  ))}
                </div>

                {/* Overall Rating Display */}
                {averageRating > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">Overall: {averageRating.toFixed(1)}/5</span>
                  </div>
                )}

                {/* Review Text */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Optional Review (1-2 sentences)</label>
                  <Textarea
                    placeholder="Share your honest experience to help future students..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="resize-none"
                    maxLength={300}
                  />
                  <div className="flex justify-end gap-2">
                    <span className="text-xs text-muted-foreground self-center">
                      {reviewText.length}/300
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                <h3 className="font-semibold">Reviews ({reviews.length})</h3>
                {isLoadingReviews ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : reviews.length > 0 ? (
                  <ReviewList
                    reviews={reviews}
                    isLoading={isLoadingReviews}
                    professorName={professor.name}
                  />
                ) : (
                  <div className="text-center text-muted-foreground py-10">
                    No reviews yet. Be the first to rate this professor!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
