"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Lock, 
  Brain, 
  MessageCircle, 
  Shield, 
  PenTool, 
  TrendingUp, 
  Heart, 
  Users,
  Check,
  Star,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import Link from "next/link";

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
    {
      icon: <Lock className="w-8 h-8 text-violet-400" />,
      title: "Secure Journaling",
      description: "End-to-end encrypted personal journal with military-grade security"
    },
    {
      icon: <Brain className="w-8 h-8 text-lavender-400" />,
      title: "Emotional Analysis",
      description: "AI insights for mood tracking and emotional pattern recognition"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-violet-400" />,
      title: "Empathetic Chatbot",
      description: "24/7 conversational support with understanding AI companion"
    },
    {
      icon: <Shield className="w-8 h-8 text-lavender-400" />,
      title: "Privacy First",
      description: "Your data stays private, always. No third-party sharing ever"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Write Your Story",
      description: "Express your thoughts and feelings in your private digital journal"
    },
    {
      number: 2,
      title: "AI Understanding",
      description: "Our AI analyzes emotions and provides personalized insights"
    },
    {
      number: 3,
      title: "Supportive Chat",
      description: "Chat with your AI companion anytime for emotional support"
    },
    {
      number: 4,
      title: "Secure & Private",
      description: "Your entries are encrypted and backed up safely in the cloud"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Therapy Client",
      content: "MoonDairy has helped me understand my emotional patterns better than ever before. The AI insights are incredibly accurate and helpful.",
      rating: 5
    },
    {
      name: "Dr. James Wilson",
      role: "Licensed Therapist",
      content: "I recommend MoonDairy to my clients. It's a powerful tool for self-reflection and emotional awareness with top-notch privacy protection.",
      rating: 5
    },
    {
      name: "Michael R.",
      role: "User for 2 years",
      content: "The chatbot feature has been a game-changer for my mental health journey. It's like having a supportive friend available 24/7.",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Free Plan",
      price: "$0",
      features: [
        "Basic journaling",
        "AI chatbot support",
        "Local encrypted storage",
        "Basic mood tracking",
        "Community support"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Premium Plan",
      price: "$9.99/mo",
      features: [
        "Advanced AI insights",
        "Cloud backup & sync",
        "Export options (PDF, CSV)",
        "Priority support",
        "Advanced analytics",
        "Unlimited journal entries",
        "Custom themes"
      ],
      cta: "Start Premium Trial",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-teal-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-teal-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Heart className="w-8 h-8 text-teal-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                MindSpace
              </span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-teal-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-teal-600 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-teal-600 transition-colors">Pricing</a>
              <a href="#security" className="text-gray-700 hover:text-teal-600 transition-colors">Security</a>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button className="bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700">
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Your Private Space for Emotional Wellness
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              AI-powered journaling with secure, encrypted storage and personalized mental health insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started for Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-teal-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-teal-600"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-teal-200">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <PenTool className="w-6 h-6 text-teal-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-300">Daily Journaling</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-300">AI Insights</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-6 h-6 text-teal-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-300">Emotional Support</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-300">Complete Privacy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need for Emotional Wellness
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover powerful features designed to support your mental health journey
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-teal-200 hover:border-teal-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Your Journey to Better Mental Health
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simple steps to start your emotional wellness journey
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-100">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-teal-600 to-purple-600 transform -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-teal-600 absolute right-0 top-1/2 transform -translate-y-1/2" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Trusted by Users & Professionals
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See how MoonDairy is making a difference in people's lives
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-teal-200">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-foreground" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-100">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className={`h-full bg-white/80 backdrop-blur-sm ${plan.popular ? 'border-purple-400 ring-2 ring-purple-400' : 'border-teal-200'}`}>
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white text-center py-2 rounded-t-lg">
                      <span className="font-semibold">Most Popular</span>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h3>
                      <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-1">
                        {plan.price}
                      </div>
                      {plan.name === "Premium Plan" && (
                        <p className="text-sm text-gray-400">14-day free trial</p>
                      )}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700' : 'bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700'}`}>
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Your Privacy is Our Priority
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enterprise-grade security for your most personal thoughts
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-100">End-to-End Encryption</h3>
                <p className="text-gray-300 text-sm">Your data is encrypted before it leaves your device</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-100">No Data Sharing</h3>
                <p className="text-gray-300 text-sm">We never share your data with third parties</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-100">GDPR Compliant</h3>
                <p className="text-gray-300 text-sm">Full compliance with data protection regulations</p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-gray-300 mb-4">
                Trusted by mental health professionals and users worldwide
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-400">
                <span>✓ HIPAA Ready</span>
                <span>✓ SOC 2 Type II</span>
                <span>✓ ISO 27001</span>
                <span>✓ GDPR Compliant</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-violet-600 to-lavender-600">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have transformed their emotional wellness with MoonDairy
            </p>
            
            <form onSubmit={handleSignup} className="max-w-md mx-auto mb-6">
              <div className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-white text-teal-600 hover:bg-gray-100 font-semibold">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-teal-600">
                  Sign In
                </Button>
              </Link>
            </div>
            
            <p className="text-sm opacity-75">
              By signing up, you agree to our{' '}
              <a href="#" className="underline hover:no-underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="underline hover:no-underline">Privacy Policy</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-violet-400" />
                <span className="text-xl font-bold">MoonDairy</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your secure space for emotional wellness and personal growth.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-violet-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-violet-400 transition-colors">Pricing</a></li>
                <li><a href="#security" className="hover:text-violet-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-violet-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-gray-800 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 MoonDairy. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}