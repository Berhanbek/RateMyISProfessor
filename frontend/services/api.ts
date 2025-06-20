// Removed custom ImportMetaEnv and ImportMeta interfaces to use Vite's global types
/// <reference types="vite/client" />

// Use Next.js public environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export async function fetchProfessors(year: 2 | 3) {
  const response = await fetch(`${API_BASE_URL}/professors?year=${year}`);
  if (!response.ok) throw new Error("Failed to fetch professors");
  const json = await response.json();
  return json.data;
}