"use client"
import { Card } from "@/components/ui/card"
import { GraduationCap, Users } from "lucide-react"

interface YearSelectorProps {
  onYearSelect: (year: 2 | 3) => void
}

export function YearSelector({ onYearSelect }: YearSelectorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Which Year Are You In?</h2>
          <p className="text-muted-foreground md:text-lg">
            Select your current year to view relevant professors and courses
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            className="group cursor-pointer border-2 p-8 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            onClick={() => onYearSelect(2)}
          >
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">2nd Year</h3>
                <p className="text-sm text-muted-foreground">Database, DSA, OOP, Statistics & more</p>
              </div>
            </div>
          </Card>

          <Card
            className="group cursor-pointer border-2 p-8 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            onClick={() => onYearSelect(3)}
          >
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">3rd Year</h3>
                <p className="text-sm text-muted-foreground">E-Commerce, Mobile Computing, Security & more</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
