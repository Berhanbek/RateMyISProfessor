// Removed custom ImportMetaEnv and ImportMeta interfaces to use Vite's global types
/// <reference types="vite/client" />

// Use Next.js public environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export async function fetchProfessors(years: string | number[]) {
  // years should be a string like "2,3" or an array [2, 3]
  const yearParam = Array.isArray(years) ? years.join(',') : years;
  const response = await fetch(`${API_BASE_URL}/professors?year=${yearParam}`);
  if (!response.ok) throw new Error("Failed to fetch professors");
  const json = await response.json();
  return json.data;
}

export async function fetchReviews(professorId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?professorId=${professorId}`);
  if (!response.ok) throw new Error("Failed to fetch reviews");
  const json = await response.json();
  return json.data; // Should be an array of reviews
}