"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send, User, Bot, Heart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI mental health companion. I'm here to listen, support, and help you work through your thoughts and feelings. How are you doing today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Mock AI responses - replace with actual AI API in production
    const responses = {
      greeting: [
        "I'm here for you. It's wonderful that you're reaching out and taking care of your mental health.",
        "Thank you for sharing that with me. Your feelings are valid and important.",
        "I'm glad you're here. Taking the step to talk about your feelings is really brave."
      ],
      stress: [
        "It sounds like you're going through a stressful time. Let's work through this together. Have you tried any deep breathing exercises?",
        "Stress can feel overwhelming, but there are techniques that can help. Would you like to explore some coping strategies?",
        "I hear that you're feeling stressed. Remember, it's okay to take things one step at a time. What small action could you take right now to care for yourself?"
      ],
      anxiety: [
        "Anxiety can be really challenging to deal with. You're not alone in feeling this way. What usually helps you feel more grounded?",
        "I understand that anxiety can feel overwhelming. Sometimes it helps to focus on what we can control in the present moment.",
        "Thank you for sharing about your anxiety. Have you considered trying mindfulness or meditation techniques?"
      ],
      sadness: [
        "I'm so sorry you're feeling this way. Your feelings are completely valid, and it's okay to not be okay sometimes.",
        "Sadness is a natural part of the human experience. Sometimes it helps to talk about what's weighing on your heart.",
        "I can hear the sadness in your words. Remember, reaching out for support is a sign of strength, not weakness."
      ],
      positive: [
        "That's wonderful to hear! I'm so happy that you're feeling good. What's been bringing you joy lately?",
        "It makes me happy to hear you're doing well! Keep nurturing those positive feelings and experiences.",
        "I love hearing about your positive experiences! What can you do today to maintain this good energy?"
      ],
      general: [
        "That's really insightful. Thank you for sharing your thoughts with me.",
        "I appreciate you opening up. Sometimes just expressing what we're feeling can be incredibly healing.",
        "Your perspective is valuable. How are you feeling about everything we discussed?",
        "Thank you for trusting me with your thoughts. What would you like to explore further?",
        "I'm here to support you through whatever you're experiencing. What would be most helpful for you right now?"
      ]
    };

    // Simple keyword detection for response selection
    const messageLower = userMessage.toLowerCase();
    let category = "general";

    if (messageLower.includes("stress") || messageLower.includes("overwhelm")) {
      category = "stress";
    } else if (messageLower.includes("anxious") || messageLower.includes("anxiety") || messageLower.includes("worry")) {
      category = "anxiety";
    } else if (messageLower.includes("sad") || messageLower.includes("depress") || messageLower.includes("down")) {
      category = "sadness";
    } else if (messageLower.includes("good") || messageLower.includes("great") || messageLower.includes("happy")) {
      category = "positive";
    } else if (messageLower.includes("hello") || messageLower.includes("hi") || messageLower.includes("hey")) {
      category = "greeting";
    }

    const categoryResponses = responses[category as keyof typeof responses];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const aiResponse = await generateAIResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast({
        title: "Error",
        description: "Sorry, I couldn't process your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "I'm feeling stressed about work",
    "I need help managing my anxiety",
    "I'm having trouble sleeping",
    "I want to improve my mood",
    "I'm feeling overwhelmed",
    "Tell me a grounding technique",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Mental Health Companion
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            A safe space to share your thoughts and feelings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Prompts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span>Quick Prompts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInputMessage(prompt)}
                      className="w-full text-left p-3 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="h-[600px] flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Conversation</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[450px] p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {message.sender === "bot" && (
                                <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              )}
                              <div>
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                              {message.sender === "user" && (
                                <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Share your thoughts..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> This AI companion is for emotional support and is not a substitute for professional mental health care. 
                If you're experiencing a mental health crisis, please reach out to a mental health professional or crisis hotline.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}