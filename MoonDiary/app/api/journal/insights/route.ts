import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "/lib/prisma";
import { decryptString } from "/lib/encryption";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Get last 30 days of journal entries
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Mock AI emotional analysis (replace with actual AI API in production)
    const emotionalInsights = analyzeEmotions(entries);
    
    return NextResponse.json({
      insights: emotionalInsights,
      totalEntries: entries.length,
      period: "30d",
    });
  } catch (error) {
    console.error("Error generating insights:", error);
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 });
  }
}

// Mock emotional analysis function (replace with actual AI in production)
function analyzeEmotions(entries: any[]) {
  const moods = entries.map(entry => ({
    date: entry.createdAt,
    mood: entry.mood || 'neutral',
    content: decryptString(entry.content),
  }));

  // Simple mood analysis based on keywords and mood tags
  const moodCounts = {
    happy: 0,
    sad: 0,
    anxious: 0,
    calm: 0,
    excited: 0,
    angry: 0,
    neutral: 0,
  };

  const weeklyTrends = [];
  const moodKeywords = {
    happy: ['happy', 'joy', 'excited', 'grateful', 'amazing', 'wonderful', 'love'],
    sad: ['sad', 'depressed', 'down', 'cry', 'lonely', 'empty', 'hurt'],
    anxious: ['anxious', 'worried', 'stress', 'nervous', 'panic', 'fear', 'overwhelmed'],
    calm: ['calm', 'peaceful', 'relaxed', 'serene', 'balanced', 'centered'],
    excited: ['excited', 'thrilled', 'energetic', 'motivated', 'inspired'],
    angry: ['angry', 'frustrated', 'mad', 'annoyed', 'irritated', 'furious'],
  };

  moods.forEach(entry => {
    let detectedMood = entry.mood;
    
    if (detectedMood === 'neutral') {
      // Analyze content for mood indicators
      const content = entry.content.toLowerCase();
      
      Object.entries(moodKeywords).forEach(([mood, keywords]) => {
        if (keywords.some(keyword => content.includes(keyword))) {
          detectedMood = mood;
        }
      });
    }
    
    moodCounts[detectedMood as keyof typeof moodCounts]++;
  });

  // Generate weekly trends
  const weeks = 4;
  for (let i = 0; i < weeks; i++) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
    const weekEnd = new Date();
    weekEnd.setDate(weekEnd.getDate() - i * 7);
    
    const weekEntries = moods.filter(entry => 
      entry.date >= weekStart && entry.date <= weekEnd
    );
    
    if (weekEntries.length > 0) {
      const avgMood = weekEntries.reduce((sum, entry) => {
        const moodScore = getMoodScore(entry.mood);
        return sum + moodScore;
      }, 0) / weekEntries.length;
      
      weeklyTrends.unshift({
        week: `Week ${i + 1}`,
        mood: avgMood,
        entries: weekEntries.length,
      });
    }
  }

  const dominantMood = Object.entries(moodCounts)
    .sort(([,a], [,b]) => b - a)[0][0];

  const totalEntries = moods.length;
  const moodPercentages = Object.entries(moodCounts).reduce((acc, [mood, count]) => {
    acc[mood] = Math.round((count / totalEntries) * 100);
    return acc;
  }, {} as Record<string, number>);

  return {
    dominantMood,
    moodDistribution: moodPercentages,
    weeklyTrends,
    totalEntries,
    recommendations: generateRecommendations(dominantMood, moodCounts),
  };
}

function getMoodScore(mood: string): number {
  const scores: Record<string, number> = {
    happy: 5,
    excited: 5,
    calm: 4,
    neutral: 3,
    anxious: 2,
    sad: 1,
    angry: 1,
  };
  return scores[mood] || 3;
}

function generateRecommendations(dominantMood: string, moodCounts: any) {
  const recommendations = [];
  
  if (moodCounts.anxious > 3) {
    recommendations.push({
      type: 'stress',
      title: 'Try Stress-Relief Techniques',
      description: 'Consider practicing deep breathing or meditation to manage anxiety.',
      action: 'Practice 5-minute breathing exercise',
    });
  }
  
  if (moodCounts.sad > 3) {
    recommendations.push({
      type: 'mood',
      title: 'Boost Your Mood',
      description: 'Engage in activities that bring you joy or connect with loved ones.',
      action: 'Call a friend or go for a walk',
    });
  }
  
  if (moodCounts.happy < 2 && moodCounts.excited < 2) {
    recommendations.push({
      type: 'positivity',
      title: 'Cultivate Positivity',
      description: 'Try gratitude journaling to increase positive emotions.',
      action: 'Write 3 things you are grateful for',
    });
  }
  
  if (recommendations.length === 0) {
    recommendations.push({
      type: 'maintenance',
      title: 'Keep Up the Good Work',
      description: 'Your emotional health looks balanced. Continue your positive habits!',
      action: 'Maintain your current routine',
    });
  }
  
  return recommendations;
}