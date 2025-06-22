"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Professor } from "@/types"
import { MapPin, Star, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"

interface ProfessorCardProps {
  professor: Professor
  onClick: () => void
  animationDelay?: number
}

export function ProfessorCard({ professor, onClick, animationDelay = 0 }: ProfessorCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), animationDelay)
    return () => clearTimeout(timer)
  }, [animationDelay])

  return (
    <Card
      className={`group cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Professor Info */}
          <div>
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {professor.name}
            </h3>
            <p className="text-primary font-medium">{professor.course}</p>
            {professor.alternativeInstructor && (
              <p className="text-sm text-muted-foreground">Alt: {professor.alternativeInstructor}</p>
            )}
          </div>

          {/* Office Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{professor.office}</span>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="font-semibold">
              {professor.totalReviews > 0 && typeof professor.averageRating === "number"
                ? professor.averageRating.toFixed(1)
                : "0"}
            </span>
            <span className="flex items-center text-xs text-muted-foreground ml-2">
              <MessageSquare className="h-4 w-4 mr-1" />
              {professor.totalReviews}
            </span>
          </div>

          <Badge variant="secondary" className="text-xs">
            Year {professor.year}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
