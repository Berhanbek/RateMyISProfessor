"use client"

import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"

interface RatingSliderProps {
  value: number
  onChange: (value: number) => void
}

const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"]

export function RatingSlider({ value, onChange }: RatingSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          max={5}
          min={0}
          step={1}
          className="flex-1"
        />
        <div className="flex items-center gap-1 min-w-[80px]">
          <Star className={`h-4 w-4 ${value > 0 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
          <span className="text-sm font-medium">{value}/5</span>
        </div>
      </div>
      {value > 0 && <p className="text-xs text-muted-foreground">{ratingLabels[value]}</p>}
    </div>
  )
}
