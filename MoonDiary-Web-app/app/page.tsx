"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input"; // Make sure you have this component

import {
  Lock,
  Brain,
  MessageCircle,
  Shield,
  PenTool,
  Heart,
  Check,
  Star,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome to MindSpace!",
      description: "Your journey to emotional wellness begins here.",
    });
  };

  const features = [
    { icon: <Lock className="w-8 h-8 text-violet-400" />, title: "Secure Journaling", description: "End-to-end encrypted personal journal with military-grade security" },
    { icon: <Brain className="w-8 h-8 text-lavender-400" />, title: "Emotional Analysis", description: "AI insights for mood tracking and emotional pattern recognition" },
    { icon: <MessageCircle className="w-8 h-8 text-violet-400" />, title: "Empathetic Chatbot", description: "24/7 conversational support with understanding AI companion" },
    { icon: <Shield className="w-8 h-8 text-lavender-400" />, title: "Privacy First", description: "Your data stays private, always. No third-party sharing ever" }
  ];

  const steps = [
    { number: 1, title: "Write Your Story", description: "Express your thoughts and feelings in your private digital journal" },
    { number: 2, title: "AI Understanding", description: "Our AI analyzes emotions and provides personalized insights" },
    { number: 3, title: "Supportive Chat", description: "Chat with your AI companion anytime for emotional support" },
    { number: 4, title: "Secure & Private", description: "Your entries are encrypted and backed up safely in the cloud" }
  ];

  const testimonials = [
    { name: "Sarah M.", role: "Therapy Client", content: "MoonDairy has helped me understand my emotional patterns better than ever before. The AI insights are incredibly accurate and helpful.", rating: 5 },
    { name: "Dr. James Wilson", role: "Licensed Therapist", content: "I recommend MoonDairy to my clients. It's a powerful tool for self-reflection and emotional awareness with top-notch privacy protection.", rating: 5 },
    { name: "Michael R.", role: "User for 2 years", content: "The chatbot feature has been a game-changer for my mental health journey. It's like having a supportive friend available 24/7.", rating: 5 }
  ];

  const plans = [
    { name: "Free Plan", price: "$0", features: ["Basic journaling","AI chatbot support","Local encrypted storage","Basic mood tracking","Community support"], cta: "Get Started Free", popular: false },
    { name: "Premium Plan", price: "$9.99/mo", features: ["Advanced AI insights","Cloud backup & sync","Export options (PDF, CSV)","Priority support","Advanced analytics","Unlimited journal entries","Custom themes"], cta: "Start Premium Trial", popular: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-teal-100">
      {/* Hero & Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-teal-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-teal-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">MindSpace</span>
          </motion.div>
          <div className="hidden md:flex space-x-8 text-gray-700">
            <a href="#features" className="hover:text-teal-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-teal-600 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-teal-600 transition-colors">Pricing</a>
            <a href="#security" className="hover:text-teal-600 transition-colors">Security</a>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Button className="bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700">Get Started</Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
          Your Private Space for Emotional Wellness
        </motion.h1>
        <p className="text-xl text-gray-700 mb-8">AI-powered journaling with secure, encrypted storage and personalized mental health insights.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="px-8 py-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl">Get Started for Free</Button>
          <Button className="px-8 py-4 bg-white text-teal-600 rounded-full font-semibold shadow-lg hover:shadow-xl border-2 border-teal-600">Learn More</Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <Card className="h-full bg-white/80 backdrop-blur-sm border-teal-200 hover:border-teal-300 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dashboard CTA Form */}
      <section className="py-16 px-4 bg-gradient-to-r from-violet-600 to-lavender-600 text-white">
        <motion.div className="max-w-md mx-auto text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full bg-white text-teal-600 font-semibold hover:bg-gray-100">Create Free Account</Button>
            <Link href="/sign-in">
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-teal-600">Sign In</Button>
            </Link>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
