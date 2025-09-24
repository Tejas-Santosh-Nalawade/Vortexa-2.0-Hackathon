"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Brain, 
  BookOpen, 
  MessageCircle,
  Plus,
  Calendar,
  TrendingUp,
  User
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useUser();

  const quickActions = [
    {
      title: "New Journal Entry",
      description: "Share your thoughts and feelings",
      icon: <Plus className="w-8 h-8" />,
      href: "/journal/new",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "View Journal",
      description: "Read your past entries",
      icon: <BookOpen className="w-8 h-8" />,
      href: "/journal",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "AI Insights",
      description: "Understand your emotional patterns",
      icon: <Brain className="w-8 h-8" />,
      href: "/insights",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Chat with AI",
      description: "Talk to your emotional support companion",
      icon: <MessageCircle className="w-8 h-8" />,
      href: "/chatbot",
      color: "bg-teal-500 hover:bg-teal-600"
    }
  ];

  const stats = [
    {
      title: "Total Entries",
      value: "0",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      title: "Days Journaling",
      value: "0",
      icon: <Calendar className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      title: "Mood Insights",
      value: "Coming Soon",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-purple-600"
    },
    {
      title: "AI Chats",
      value: "0",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "text-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.firstName || "Friend"}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Ready to continue your emotional wellness journey?
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className={`${action.color} p-4 rounded-full text-white mb-4 transition-colors duration-200`}>
                      {action.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-teal-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <Heart className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Your Emotional Wellness Journey Starts Here
                  </h3>
                  <p className="text-white/90 mb-4">
                    Begin by writing your first journal entry or chat with our AI companion for emotional support.
                  </p>
                  <div className="flex gap-3">
                    <Link href="/journal/new">
                      <Button variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
                        Start Journaling
                      </Button>
                    </Link>
                    <Link href="/chatbot">
                      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
                        Chat with AI
                      </Button>
                    </Link>
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
