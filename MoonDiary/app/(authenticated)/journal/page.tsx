"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Heart, Sparkles, Search, Plus, Calendar, TrendingUp } from "lucide-react";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  mood?: string | null;
  createdAt: string;
  emotionalAnalysis?: {
    sentiment: string;
    stressLevel: number;
    emotions: string[];
  };
};

const moodOptions = [
  { emoji: "😊", label: "Happy", color: "bg-yellow-100 text-yellow-800" },
  { emoji: "😔", label: "Sad", color: "bg-blue-100 text-blue-800" },
  { emoji: "😰", label: "Anxious", color: "bg-purple-100 text-purple-800" },
  { emoji: "😤", label: "Frustrated", color: "bg-red-100 text-red-800" },
  { emoji: "😌", label: "Calm", color: "bg-green-100 text-green-800" },
  { emoji: "🤔", label: "Thoughtful", color: "bg-gray-100 text-gray-800" },
  { emoji: "💪", label: "Motivated", color: "bg-orange-100 text-orange-800" },
  { emoji: "😴", label: "Tired", color: "bg-indigo-100 text-indigo-800" },
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [search, setSearch] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showNewEntry, setShowNewEntry] = useState(false);

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch(`/api/journal?search=${encodeURIComponent(search)}`);
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  }, [search]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const analyzeEmotions = async (text: string) => {
    // Mock AI analysis - in production, this would call your AI service
    const emotions = [];
    if (text.includes("happy") || text.includes("joy") || text.includes("excited")) emotions.push("happiness");
    if (text.includes("sad") || text.includes("down") || text.includes("cry")) emotions.push("sadness");
    if (text.includes("anxious") || text.includes("worried") || text.includes("stress")) emotions.push("anxiety");
    if (text.includes("angry") || text.includes("frustrated") || text.includes("mad")) emotions.push("anger");
    if (text.includes("calm") || text.includes("peaceful") || text.includes("relaxed")) emotions.push("calmness");
    
    return {
      sentiment: emotions.length > 0 ? emotions[0] : "neutral",
      stressLevel: Math.floor(Math.random() * 10) + 1,
      emotions: emotions.length > 0 ? emotions : ["neutral"]
    };
  };

  const addEntry = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsAnalyzing(true);
    
    try {
      // Analyze emotions before saving
      const emotionalAnalysis = await analyzeEmotions(content);
      
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          content, 
          mood: selectedMood,
          emotionalAnalysis 
        }),
      });
      
      if (res.ok) {
        setTitle("");
        setContent("");
        setSelectedMood("");
        setShowNewEntry(false);
        fetchEntries();
      }
    } catch (error) {
      console.error("Error saving entry:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getMoodStyle = (mood: string) => {
    const moodOption = moodOptions.find(m => m.label === mood);
    return moodOption?.color || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background/80 p-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Your Mental Health Journal
          </h1>
          <p className="text-muted-foreground text-lg">
            Express your thoughts and track your emotional journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Entry Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Heart className="h-6 w-6 text-primary" />
                      New Journal Entry
                    </CardTitle>
                    <CardDescription>
                      Write about your thoughts, feelings, and experiences
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowNewEntry(!showNewEntry)}
                    className="lg:hidden"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <AnimatePresence>
                {(showNewEntry || true) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder="Give your entry a title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="mood">How are you feeling?</Label>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {moodOptions.map((mood) => (
                            <Button
                              key={mood.label}
                              variant={selectedMood === mood.label ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedMood(mood.label)}
                              className={`flex flex-col items-center gap-1 h-auto py-2 ${
                                selectedMood === mood.label ? mood.color : ""
                              }`}
                            >
                              <span className="text-lg">{mood.emoji}</span>
                              <span className="text-xs">{mood.label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="content">Your Thoughts</Label>
                        <Textarea
                          id="content"
                          placeholder="Write about your day, feelings, and experiences..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="mt-1 min-h-[200px] resize-none"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={addEntry}
                          disabled={!title.trim() || !content.trim() || isAnalyzing}
                          className="flex items-center gap-2"
                        >
                          {isAnalyzing ? (
                            <>
                              <Brain className="h-4 w-4 animate-pulse" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" />
                              Save Entry
                            </>
                          )}
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          AI will analyze your emotions
                        </span>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Search and Entries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Recent Entries
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search entries..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {entries.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No journal entries yet</p>
                          <p className="text-sm">Start writing to track your emotional journey</p>
                        </div>
                      ) : (
                        entries.map((entry, index) => (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg border bg-card/50 hover:bg-card/70 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg">{entry.title}</h3>
                              {entry.mood && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodStyle(entry.mood)}`}>
                                  {moodOptions.find(m => m.label === entry.mood)?.emoji} {entry.mood}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {new Date(entry.createdAt).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                            <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap">
                              {entry.content}
                            </p>
                            {entry.emotionalAnalysis && (
                              <div className="pt-3 border-t border-border/50">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                  <Brain className="h-3 w-3" />
                                  <span>AI Analysis:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {entry.emotionalAnalysis.emotions.map((emotion) => (
                                    <span
                                      key={emotion}
                                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                                    >
                                      {emotion}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Sidebar with Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="backdrop-blur-sm bg-card/80 border-primary/20 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{entries.length}</div>
                    <div className="text-sm text-muted-foreground">Total Entries</div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Mood Distribution</h4>
                    <div className="space-y-2">
                      {moodOptions.slice(0, 4).map((mood) => {
                        const count = entries.filter(e => e.mood === mood.label).length;
                        const percentage = entries.length > 0 ? (count / entries.length) * 100 : 0;
                        return (
                          <div key={mood.label} className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                              <span>{mood.emoji}</span>
                              <span>{mood.label}</span>
                            </span>
                            <span className="text-muted-foreground">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Daily Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "Taking time to reflect on your emotions can help you understand yourself better and improve your mental well-being."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


