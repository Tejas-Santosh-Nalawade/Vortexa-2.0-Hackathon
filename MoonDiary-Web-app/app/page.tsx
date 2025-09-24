"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Heart,
  Lock,
  Brain,
  MessageCircle,
  Shield,
  PenTool,
  Check,
  Star,
  ArrowRight,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect authenticated users to dashboard
  if (isLoaded && user) {
    router.push("/dashboard");
    return null;
  }

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thank you!",
        description: "We'll keep you updated on MoonDiary's progress.",
      });
      setEmail("");
    }
  };

  const features = [
    {
      icon: <Lock className="w-8 h-8 text-teal-600" />,
      title: "End-to-End Encryption",
      description: "Your thoughts are protected with military-grade encryption. Only you can access your journal entries."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "AI-Powered Insights",
      description: "Get personalized emotional insights and mood tracking powered by advanced AI technology."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-teal-600" />,
      title: "24/7 AI Companion",
      description: "Chat with your empathetic AI companion anytime for emotional support and guidance."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Privacy First",
      description: "Your data never leaves your control. We prioritize your privacy above everything else."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Mental Health Advocate",
      content: "MoonDiary has transformed how I understand my emotions. The AI insights are incredibly accurate and helpful.",
      rating: 5
    },
    {
      name: "Dr. James Wilson",
      role: "Licensed Therapist",
      content: "I recommend MoonDiary to my clients. It's a powerful tool for self-reflection with excellent privacy protection.",
      rating: 5
    },
    {
      name: "Michael R.",
      role: "User for 2 years",
      content: "The AI companion feature has been life-changing. It's like having a supportive friend available 24/7.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                MoonDiary
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 text-gray-700">
              <a href="#features" className="hover:text-teal-600 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-teal-600 transition-colors">How It Works</a>
              <a href="#testimonials" className="hover:text-teal-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="hover:text-teal-600 transition-colors">Pricing</a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex space-x-4">
              <Button variant="ghost" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-teal-600">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-teal-600">How It Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-teal-600">Testimonials</a>
                <a href="#pricing" className="text-gray-700 hover:text-teal-600">Pricing</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Button variant="ghost" onClick={handleSignIn} className="w-full">
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleGetStarted}
                    className="w-full bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-purple-600 to-teal-600 bg-clip-text text-transparent leading-tight">
              Your Safe Space for
              <br />
              Emotional Wellness
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered journaling with military-grade encryption. Track your emotions, 
              gain insights, and chat with your personal AI companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl text-lg"
              >
                Start Your Journey Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-teal-600 text-teal-600 rounded-full font-semibold hover:bg-teal-50 text-lg"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>10,000+ Happy Users</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Everything You Need for
              <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"> Mental Wellness</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to support your emotional journey with privacy and security at the core.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 bg-gradient-to-br from-teal-50 to-purple-50 rounded-full">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-teal-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Simple Steps to
              <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"> Better Mental Health</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Write Your Thoughts",
                description: "Express yourself freely in your encrypted digital journal. No judgment, just you and your thoughts."
              },
              {
                step: "02",
                title: "Get AI Insights",
                description: "Our AI analyzes your emotions and provides personalized insights to help you understand your patterns."
              },
              {
                step: "03",
                title: "Chat & Grow",
                description: "Talk with your AI companion anytime for support, guidance, and emotional wellness strategies."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Trusted by
              <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"> Thousands</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands who have transformed their mental health with MoonDiary.
            </p>
            
            <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto mb-8">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/70"
                  required
                />
                <Button 
                  type="submit"
                  variant="secondary"
                  className="bg-white text-teal-600 hover:bg-gray-100"
                >
                  Get Started
                </Button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                variant="secondary"
                className="bg-white text-teal-600 hover:bg-gray-100 font-semibold"
              >
                Create Free Account
              </Button>
              <Button 
                onClick={handleSignIn}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-600"
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-teal-400" />
                <span className="text-xl font-bold">MoonDiary</span>
              </div>
              <p className="text-gray-400">
                Your secure space for emotional wellness and mental health growth.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MoonDiary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}