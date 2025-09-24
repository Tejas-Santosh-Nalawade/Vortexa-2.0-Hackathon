"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

type WeeklyTrend = { week: string; mood: number; entries: number };

export default function InsightsPage() {
  const [weeklyTrends, setWeeklyTrends] = useState<WeeklyTrend[]>([]);
  const [moodDistribution, setMoodDistribution] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/journal/insights");
      if (!res.ok) return;
      const data = await res.json();
      setWeeklyTrends(data.insights.weeklyTrends);
      setMoodDistribution(
        Object.entries(data.insights.moodDistribution).map(([name, value]) => ({ name, value }))
      );
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Insights</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Weekly Mood Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#000000" />
                  <YAxis domain={[0, 5]} stroke="#000000" />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb" }} />
                  <Line type="monotone" dataKey="mood" stroke="#000000" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moodDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#000000" />
                  <YAxis stroke="#000000" />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb" }} />
                  <Bar dataKey="value" fill="#000000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


