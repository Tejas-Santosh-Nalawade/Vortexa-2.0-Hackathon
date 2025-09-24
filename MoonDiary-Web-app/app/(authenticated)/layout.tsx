"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BookOpen, 
  Brain, 
  MessageCircle, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

function SidebarLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const pathname = usePathname?.();
  const isActive = pathname === href || (href !== "/dashboard" && pathname?.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground shadow-sm" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
    { href: "/journal", label: "Journal", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/insights", label: "Insights", icon: <Brain className="w-4 h-4" /> },
    { href: "/chatbot", label: "AI Chatbot", icon: <MessageCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 fixed lg:relative h-full z-40",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="px-6 py-6 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MD</span>
            </div>
            <span className="font-bold text-lg text-foreground">MoonDiary</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navigationItems.map((item) => (
            <SidebarLink 
              key={item.href} 
              href={item.href} 
              label={item.label} 
              icon={item.icon}
            />
          ))}
        </nav>

        {/* User Profile */}
        <div className="px-4 py-4 border-t">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.firstName || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 min-w-0">
        {children}
      </main>
    </div>
  );
}
