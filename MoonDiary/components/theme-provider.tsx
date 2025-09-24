"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type ColorScheme = "teal" | "lavender" | "pastel" | "ocean" | "sunset" | "forest"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  colorScheme: ColorScheme
  setColorScheme: (scheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const colorSchemes = {
  teal: {
    light: {
      primary: "#14b8a6",
      secondary: "#5eead4",
      accent: "#0f766e",
      background: "#f0fdfa",
      card: "#ffffff",
    },
    dark: {
      primary: "#2dd4bf",
      secondary: "#14b8a6",
      accent: "#5eead4",
      background: "#134e4a",
      card: "#1f2937",
    },
  },
  lavender: {
    light: {
      primary: "#a855f7",
      secondary: "#d8b4fe",
      accent: "#7c3aed",
      background: "#faf5ff",
      card: "#ffffff",
    },
    dark: {
      primary: "#c084fc",
      secondary: "#a855f7",
      accent: "#d8b4fe",
      background: "#581c87",
      card: "#1f2937",
    },
  },
  pastel: {
    light: {
      primary: "#f472b6",
      secondary: "#fce7f3",
      accent: "#ec4899",
      background: "#fdf2f8",
      card: "#ffffff",
    },
    dark: {
      primary: "#f9a8d4",
      secondary: "#f472b6",
      accent: "#fce7f3",
      background: "#831843",
      card: "#1f2937",
    },
  },
  ocean: {
    light: {
      primary: "#0ea5e9",
      secondary: "#7dd3fc",
      accent: "#0284c7",
      background: "#f0f9ff",
      card: "#ffffff",
    },
    dark: {
      primary: "#38bdf8",
      secondary: "#0ea5e9",
      accent: "#7dd3fc",
      background: "#0c4a6e",
      card: "#1f2937",
    },
  },
  sunset: {
    light: {
      primary: "#f97316",
      secondary: "#fed7aa",
      accent: "#ea580c",
      background: "#fff7ed",
      card: "#ffffff",
    },
    dark: {
      primary: "#fb923c",
      secondary: "#f97316",
      accent: "#fed7aa",
      background: "#9a3412",
      card: "#1f2937",
    },
  },
  forest: {
    light: {
      primary: "#16a34a",
      secondary: "#86efac",
      accent: "#15803d",
      background: "#f0fdf4",
      card: "#ffffff",
    },
    dark: {
      primary: "#4ade80",
      secondary: "#16a34a",
      accent: "#86efac",
      background: "#14532d",
      card: "#1f2937",
    },
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [colorScheme, setColorScheme] = useState<ColorScheme>("teal")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme
    
    if (savedTheme) setTheme(savedTheme)
    if (savedColorScheme) setColorScheme(savedColorScheme)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const scheme = colorSchemes[colorScheme]
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    
    const colors = isDark ? scheme.dark : scheme.light
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
    
    root.classList.toggle("dark", isDark)
    localStorage.setItem("theme", theme)
    localStorage.setItem("colorScheme", colorScheme)
  }, [theme, colorScheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}