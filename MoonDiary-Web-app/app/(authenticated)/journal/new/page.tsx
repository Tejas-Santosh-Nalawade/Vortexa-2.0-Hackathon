"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BackButton } from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { 
  PenTool, 
  Heart, 
  Brain, 
  Smile, 
  Frown, 
  Meh,
  Zap,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

const moods = [
  { value: "happy", label: "Happy", icon: <Smile className="w-5 h-5" />, color: "bg-green-100 hover:bg-green-200 text-green-700" },
  { value: "calm", label: "Calm", icon: <Meh className="w-5 h-5" />, color: "bg-blue-100 hover:bg-blue-200 text-blue-700" },
  { value: "excited", label: "Excited", icon: <Zap className="w-5 h-5" />, color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700" },
  { value: "sad", label: "Sad", icon: <Frown className="w-5 h-5" />, color: "bg-blue-200 hover:bg-blue-300 text-blue-800" },
  { value: "anxious", label: "Anxious", icon: <Brain className="w-5 h-5" />, color: "bg-orange-100 hover:bg-orange-200 text-orange-700" },
  { value: "angry", label: "Angry", icon: <Frown className="w-5 h-5" />, color: "bg-red-100 hover:bg-red-200 text-red-700" }
];

export default function NewJournalEntry() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mood: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create journal entry");
      }

      const result = await response.json();
      
      toast({
        title: "Success!",
        description: "Your journal entry has been saved.",
      });

      router.push("/journal");
    } catch (error) {
      console.error("Error creating journal entry:", error);
      setError("Failed to save journal entry. Please try again.");
      toast({
        title: "Error",
        description: "Failed to save journal entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <BackButton />
          <div className="flex items-center gap-3 mt-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-600 rounded-full flex items-center justify-center">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                New Journal Entry
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Express your thoughts and feelings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-teal-600" />
                Share Your Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Give your entry a title..."
                    className="text-lg"
                    disabled={isLoading}
                  />
                </div>

                {/* Mood Selection */}
                <div className="space-y-3">
                  <Label>How are you feeling?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {moods.map((mood) => (
                      <button
                        key={mood.value}
                        type="button"
                        onClick={() => handleInputChange("mood", mood.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          formData.mood === mood.value
                            ? "border-teal-500 " + mood.color
                            : "border-gray-200 hover:border-gray-300 " + mood.color
                        }`}
                        disabled={isLoading}
                      >
                        <div className="flex items-center gap-2">
                          {mood.icon}
                          <span className="font-medium">{mood.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Your thoughts</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Write about your day, thoughts, feelings, or anything on your mind..."
                    className="min-h-[300px] text-base leading-relaxed"
                    disabled={isLoading}
                  />
                  <p className="text-sm text-gray-500">
                    {formData.content.length} characters
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
                    className="flex-1 bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <PenTool className="w-4 h-4 mr-2" />
                        Save Entry
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}