"use client"

import { useState } from "react"
import { YearSelector } from "@/components/year-selector"
import { ProfessorsList } from "@/components/professors-list"
import { RatingModal } from "@/components/rating-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { useThemeTransition } from "@/hooks/use-theme-transition"
import type { Professor } from "@/types"
import { BookOpen } from "lucide-react"

export default function HomePage() {
  const [selectedYear, setSelectedYear] = useState<2 | 3 | null>(null)
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null)
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)

  // Enable smooth theme transitions
  useThemeTransition()

  const handleYearSelect = (year: 2 | 3) => {
    setSelectedYear(year)
  }

  const handleProfessorSelect = (professor: Professor) => {
    setSelectedProfessor(professor)
    setIsRatingModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsRatingModalOpen(false)
    setSelectedProfessor(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">Rate My IS Professors</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!selectedYear ? (
          <YearSelector onYearSelect={handleYearSelect} />
        ) : (
          <ProfessorsList
            year={selectedYear}
            onProfessorSelect={handleProfessorSelect}
            onBackToYearSelection={() => setSelectedYear(null)}
          />
        )}
      </main>

      {/* Rating Modal */}
      {selectedProfessor && (
        <RatingModal professor={selectedProfessor} isOpen={isRatingModalOpen} onClose={handleCloseModal} />
      )}

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-6 text-center text-sm text-muted-foreground">
        © 2025 Rate My IS Professors by TheISSeer
      </footer>
    </div>
  )
}
