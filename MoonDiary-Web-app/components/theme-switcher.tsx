"use client"

import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function ThemeSwitcher() {
  const { theme, setTheme, colorScheme, setColorScheme } = useTheme()

  const colorSchemes = [
    { name: "teal", color: "bg-foreground" },
    { name: "lavender", color: "bg-foreground" },
    { name: "pastel", color: "bg-foreground" },
    { name: "ocean", color: "bg-foreground" },
    { name: "sunset", color: "bg-foreground" },
    { name: "forest", color: "bg-foreground" },
  ]

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="bg-background/50 backdrop-blur-sm">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Select color scheme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Color Scheme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {colorSchemes.map((scheme) => (
            <DropdownMenuItem
              key={scheme.name}
              onClick={() => setColorScheme(scheme.name as any)}
              className="flex items-center gap-2"
            >
              <div className={`w-4 h-4 rounded-full ${scheme.color}`} />
              <span className="capitalize">{scheme.name}</span>
              {colorScheme === scheme.name && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="bg-background/50 backdrop-blur-sm">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
            {theme === "light" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
            {theme === "dark" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
            {theme === "system" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}