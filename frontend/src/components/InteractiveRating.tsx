import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface InteractiveRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  category: string;
}

const ratingLabels: Record<string, string[]> = {
  engagement: ['Poor', 'Below Average', 'Average', 'Good', 'Excellent'],
  workload: ['Too Heavy', 'Heavy', 'Balanced', 'Light', 'Too Light'],
  attendance: ['Not Important', 'Rarely Checked', 'Sometimes', 'Important', 'Critical'],
  fairness: ['Very Unfair', 'Unfair', 'Neutral', 'Fair', 'Very Fair'],
  organization: ['Chaotic', 'Poor', 'Average', 'Well-Organized', 'Perfectly Structured'],
  overall: ['Poor', 'Below Average', 'Average', 'Good', 'Excellent']
};

export const InteractiveRating: React.FC<InteractiveRatingProps> = ({
  rating,
  onRatingChange,
  category
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStarClick = (value: number) => {
    setIsAnimating(true);
    onRatingChange(value);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const currentRating = hoverRating || rating;
  const labels = ratingLabels[category] || ratingLabels.overall;

  return (
    <div className="space-y-4">
      {/* Interactive Stars */}
      <div 
        className="flex items-center justify-center gap-2 py-4"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            className={`group relative transition-all duration-200 ${
              isAnimating && star === rating ? 'animate-pulse' : ''
            }`}
          >
            <Star
              className={`w-8 h-8 transition-all duration-200 ${
                star <= currentRating
                  ? 'fill-yellow-400 text-yellow-400 scale-110'
                  : 'text-neutral-300 dark:text-neutral-600 hover:text-yellow-300 hover:scale-105'
              }`}
            />
            
            {/* Hover effect */}
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 scale-0 group-hover:scale-150 transition-transform duration-300" />
          </button>
        ))}
      </div>

      {/* Rating Label and Slider */}
      <div className="space-y-3">
        {currentRating > 0 && (
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
              {labels[currentRating - 1]}
            </span>
          </div>
        )}

        {/* Custom Slider */}
        <div className="relative">
          <input
            type="range"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => onRatingChange(parseInt(e.target.value))}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(rating / 5) * 100}%, #e2e8f0 ${(rating / 5) * 100}%, #e2e8f0 100%)`
            }}
          />
          
          {/* Slider Labels */}
          <div className="flex justify-between mt-2 px-1">
            {labels.map((label, index) => (
              <span 
                key={index}
                className={`text-xs transition-colors duration-200 ${
                  index + 1 === rating 
                    ? 'text-primary-600 dark:text-primary-400 font-medium' 
                    : 'text-neutral-400 dark:text-neutral-500'
                }`}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};