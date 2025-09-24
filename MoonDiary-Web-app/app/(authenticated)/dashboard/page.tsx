"use client";

import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Brain, 
  TrendingUp, 
  Calendar, 
  Plus, 
  BookOpen, 
  MessageCircle,
  Lightbulb,
  Activity,
  Smile,
  Frown,
  Meh,
  Zap
} from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

interface EmotionalInsight {
  dominantMood: string;
  moodDistribution: Record<string, number>;
  weeklyTrends: Array<{ week: string; mood: number; entries: number }>;
  totalEntries: number;
  recommendations: Array<{
    type: string;
    title: string;
    description: string;
    action: string;
  }>;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useUser();
  const { toast } = useToast();
  const [insights, setInsights] = useState<EmotionalInsight | null>(null);
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");

  const moodIcons: Record<string, any> = {
    happy: <Smile className="w-6 h-6 text-yellow-500" />,
    sad: <Frown className="w-6 h-6 text-blue-500" />,
    anxious: <Brain className="w-6 h-6 text-purple-500" />,
    calm: <Meh className="w-6 h-6 text-green-500" />,
    excited: <Zap className="w-6 h-6 text-orange-500" />,
    angry: <Frown className="w-6 h-6 text-red-500" />,
    neutral: <Meh className="w-6 h-6 text-gray-500" />,
  };

  const moodColors: Record<string, string> = {
    happy: "#FCD34D",
    sad: "#3B82F6",
    anxious: "#8B5CF6",
    calm: "#10B981",
    excited: "#F97316",
    angry: "#EF4444",
    neutral: "#6B7280",
  };

  const fetchInsights = useCallback(async () => {
    try {
      const response = await fetch(`/api/journal/insights`);
      if (!response.ok) throw new Error("Failed to fetch insights");
      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch emotional insights.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchRecentEntries = useCallback(async () => {
    try {
      const response = await fetch(`/api/journal?page=1`);
      if (!response.ok) throw new Error("Failed to fetch entries");
      const data = await response.json();
      setRecentEntries(data.entries.slice(0, 3));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch recent entries.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchInsights(), fetchRecentEntries()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchInsights, fetchRecentEntries]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="flex items-center justify-center h-96">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.firstName || user?.emailAddresses[0].emailAddress.split('@')[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            How are you feeling today? Let's check in on your emotional journey.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Link href="/journal">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Write Journal</h3>
                      <p className="text-sm text-muted-foreground">Express your thoughts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/chatbot">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">AI Support</h3>
                      <p className="text-sm text-muted-foreground">Chat with our AI helper</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/insights">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">View Insights</h3>
                      <p className="text-sm text-muted-foreground">Detailed analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats and Trends */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emotional Overview */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-6 h-6 text-primary" />
                    <span>Emotional Overview</span>
                  </CardTitle>
                  <CardDescription>Your mood distribution over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  {insights && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {Object.entries(insights.moodDistribution).map(([mood, percentage]) => (
                        <motion.div
                          key={mood}
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-4 bg-secondary/20 rounded-lg"
                        >
                          <div className="flex justify-center mb-2">
                            {moodIcons[mood]}
                          </div>
                          <p className="text-sm font-medium capitalize text-foreground">{mood}</p>
                          <p className="text-2xl font-bold text-foreground">{percentage}%</p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {insights && insights.weeklyTrends.length > 0 && (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={insights.weeklyTrends}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                          <XAxis dataKey="week" stroke="#6b7280" />
                          <YAxis domain={[0, 5]} stroke="#6b7280" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="mood" 
                            stroke="#8b5cf6" 
                            strokeWidth={3}
                            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Journal Entries */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>Recent Journal Entries</span>
                    </span>
                    <Link href="/journal">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentEntries.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No journal entries yet</p>
                      <Link href="/journal">
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Write Your First Entry
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentEntries.map((entry, index) => (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-foreground">{entry.title}</h4>
                            <div className="flex items-center space-x-2">
                              {entry.mood && moodIcons[entry.mood]}
                              <span className="text-sm text-muted-foreground">
                                {new Date(entry.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {entry.content.substring(0, 150)}...
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Recommendations and Stats */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span>AI Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {insights && insights.recommendations.length > 0 ? (
                    <div className="space-y-4">
                      {insights.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20"
                        >
                          <h4 className="font-medium text-foreground mb-2">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                          <Button size="sm" variant="outline" className="w-full">
                            {rec.action}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No recommendations available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <span>This Month</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Journal Entries</span>
                      <span className="font-bold text-foreground">
                        {insights?.totalEntries || 0}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Dominant Mood</span>
                      <div className="flex items-center space-x-2">
                        {insights && moodIcons[insights.dominantMood]}
                        <span className="font-medium capitalize text-foreground">
                          {insights?.dominantMood || 'Unknown'}
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Streak</span>
                      <span className="font-bold text-green-600">7 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mood Tracker */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">How are you feeling right now?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(moodIcons).slice(0, 4).map(([mood, icon]) => (
                      <motion.button
                        key={mood}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
                        onClick={() => {
                          toast({
                            title: "Mood logged!",
                            description: `You selected: ${mood}`,
                          });
                        }}
                      >
                        {icon}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
