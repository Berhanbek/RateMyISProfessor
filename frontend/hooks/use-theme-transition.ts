"use client"

import { useEffect } from "react"

export function useThemeTransition() {
  useEffect(() => {
    const handleThemeChange = () => {
      // Temporarily disable transitions during theme change
      document.documentElement.classList.add("theme-transition-disable")

      // Re-enable transitions after a brief delay
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition-disable")
      }, 100)
    }

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target as HTMLElement
          if (target.classList.contains("dark") !== (mutation.oldValue?.includes("dark") ?? false)) {
            handleThemeChange()
          }
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])
}
