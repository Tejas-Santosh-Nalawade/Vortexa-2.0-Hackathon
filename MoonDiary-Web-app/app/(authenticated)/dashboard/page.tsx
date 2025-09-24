"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Brain, 
  BookOpen, 
  MessageCircle,
  Plus,
  Calendar,
  TrendingUp,
  User,
  Target,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  PenTool,
  Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface DashboardStats {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  averageMood: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface RecentEntry {
  id: string;
  title: string;
  mood: string;
  createdAt: string;
  preview: string;
}

export default function Dashboard() {
  const { user } = useUser();
  const [stats, setStats] = useState<DashboardStats>({
    totalEntries: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageMood: 0,
    weeklyGoal: 7,
    weeklyProgress: 0
  });
  const [recentEntries, setRecentEntries] = useState<RecentEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch journal entries for stats
      const entriesResponse = await fetch('/api/journal?limit=5');
      if (entriesResponse.ok) {
        const entriesData = await entriesResponse.json();
        setRecentEntries(entriesData.entries || []);
        
        // Calculate basic stats from entries
        const entries = entriesData.entries || [];
        setStats(prev => ({
          ...prev,
          totalEntries: entries.length,
          weeklyProgress: Math.min(entries.length, prev.weeklyGoal)
        }));
      }

      // Fetch insights for mood data
      const insightsResponse = await fetch('/api/journal/insights');
      if (insightsResponse.ok) {
        const insightsData = await insightsResponse.json();
        const insights = insightsData.insights || {};
        
        setStats(prev => ({
          ...prev,
          currentStreak: insights.currentStreak || 0,
          longestStreak: insights.longestStreak || 0,
          averageMood: insights.averageMood || 3.5
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "New Journal Entry",
      description: "Share your thoughts and feelings",
      icon: <PenTool className="w-6 h-6" />,
      href: "/journal/new",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
      hoverColor: "hover:from-teal-600 hover:to-teal-700"
    },
    {
      title: "View Journal",
      description: "Read your past entries",
      icon: <BookOpen className="w-6 h-6" />,
      href: "/journal",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    },
    {
      title: "AI Insights",
      description: "Understand your patterns",
      icon: <Brain className="w-6 h-6" />,
      href: "/insights",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      title: "Chat with AI",
      description: "Get emotional support",
      icon: <MessageCircle className="w-6 h-6" />,
      href: "/chatbot",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    }
  ];

  const moodEmojis: Record<string, string> = {
    happy: "😊",
    sad: "😢",
    anxious: "😰",
    calm: "😌",
    excited: "🤩",
    angry: "😠",
    neutral: "😐"
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return "text-green-600";
    if (mood >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {getGreeting()}, {user?.firstName || "Friend"}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Ready to continue your emotional wellness journey?
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString("en-US", { 
                    weekday: "long", 
                    month: "long", 
                    day: "numeric" 
                  })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total Entries
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.totalEntries}
                  </p>
                </div>
                <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-full">
                  <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Current Streak
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.currentStreak}
                  </p>
                  <p className="text-xs text-gray-500">days</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Average Mood
                  </p>
                  <p className={`text-3xl font-bold ${getMoodColor(stats.averageMood)}`}>
                    {stats.averageMood.toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500">out of 5</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Weekly Goal
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.weeklyProgress}/{stats.weeklyGoal}
                  </p>
                  <Progress 
                    value={(stats.weeklyProgress / stats.weeklyGoal) * 100} 
                    className="mt-2 h-2"
                  />
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`${action.color} ${action.hoverColor} p-6 rounded-xl text-white cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          {action.icon}
                          <ArrowRight className="w-5 h-5 opacity-70" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">
                          {action.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {action.description}
                        </p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Entries */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg border-0 h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Recent Entries
                  </div>
                  <Link href="/journal">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentEntries.length > 0 ? (
                  <div className="space-y-4">
                    {recentEntries.slice(0, 3).map((entry, index) => (
                      <div key={entry.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate flex-1">
                            {entry.title}
                          </h4>
                          <span className="text-lg ml-2">
                            {moodEmojis[entry.mood] || "😐"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                          {entry.preview || entry.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(entry.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      No journal entries yet
                    </p>
                    <Link href="/journal/new">
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Write First Entry
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Motivational Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-lg border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Keep up the great work! 🌟
                  </h3>
                  <p className="text-white/90 mb-4 text-lg">
                    {stats.currentStreak > 0 
                      ? `You're on a ${stats.currentStreak}-day streak! Every entry brings you closer to better mental health.`
                      : "Start your wellness journey today. Your first journal entry is just a click away."
                    }
                  </p>
                  <div className="flex gap-3">
                    <Link href="/journal/new">
                      <Button variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
                        <PenTool className="w-4 h-4 mr-2" />
                        Write Today's Entry
                      </Button>
                    </Link>
                    <Link href="/chatbot">
                      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat with AI
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}