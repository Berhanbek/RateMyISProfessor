"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ProfessorCard } from "@/components/professor-card"
import type { Professor } from "@/types"
import { ArrowLeft, Search, Database } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchProfessors } from "@/services/api"

interface ProfessorsListProps {
  year: 2 | 3
  onProfessorSelect: (professor: Professor) => void
  onBackToYearSelection: () => void
}

export function ProfessorsList({ year, onProfessorSelect, onBackToYearSelection }: ProfessorsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [professors, setProfessors] = useState<Professor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchProfessors(year)
        setProfessors(data)
      } catch (error) {
        console.error("Error fetching professors:", error)
        setError("Failed to load professors. Please check if the database is connected.")
        setProfessors([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [year])

  const filteredAndSortedProfessors = professors.filter(
    (prof) =>
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.course.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBackToYearSelection} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{year === 2 ? "2nd" : "3rd"} Year Professors</h2>
            <p className="text-muted-foreground">Loading professors...</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBackToYearSelection} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{year === 2 ? "2nd" : "3rd"} Year Professors</h2>
          <p className="text-muted-foreground">
            {error ? "Database connection required" : `${filteredAndSortedProfessors.length} professors found`}
          </p>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search professors or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="reviews">Most Reviews</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Database Connection Required</h3>
          <p className="text-muted-foreground mb-4">Connect your database to load professor information.</p>
          <p className="text-sm text-muted-foreground">
            Check the backend integration documentation for setup instructions.
          </p>
        </div>
      )}

      {/* Professors Grid */}
      {!error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedProfessors.map((professor, index) => (
            <ProfessorCard
              key={professor.id}
              professor={professor}
              onClick={() => onProfessorSelect(professor)}
              animationDelay={index * 100}
            />
          ))}
        </div>
      )}

      {!error && filteredAndSortedProfessors.length === 0 && !isLoading && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No professors found matching your search.</p>
        </div>
      )}
    </div>
  )
}

// After successful rating submission:
// await fetch('/api/professors?year=3'); // or the year you want
// Then update your state with the new data
