"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Calendar,
  Trash2,
  Edit,
  Smile,
  Frown,
  Meh,
  Brain,
  Zap,
  Heart,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
  updatedAt: string;
}

const moodIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  happy: { icon: <Smile className="w-4 h-4" />, color: "bg-green-100 text-green-700" },
  sad: { icon: <Frown className="w-4 h-4" />, color: "bg-blue-100 text-blue-700" },
  anxious: { icon: <Brain className="w-4 h-4" />, color: "bg-orange-100 text-orange-700" },
  calm: { icon: <Meh className="w-4 h-4" />, color: "bg-blue-100 text-blue-700" },
  excited: { icon: <Zap className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-700" },
  angry: { icon: <Frown className="w-4 h-4" />, color: "bg-red-100 text-red-700" }
};

export default function JournalPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchEntries = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const response = await fetch(`/api/journal?page=${page}&search=${encodeURIComponent(search)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }

      const data = await response.json();
      setEntries(data.entries || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast({
        title: "Error",
        description: "Failed to load journal entries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this journal entry?")) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/journal/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      setEntries(entries.filter(entry => entry.id !== id));
      toast({
        title: "Success",
        description: "Journal entry deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        title: "Error",
        description: "Failed to delete journal entry",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchEntries(1, searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchEntries(page, searchTerm);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Journal
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {entries.length} {entries.length === 1 ? "entry" : "entries"} recorded
                </p>
              </div>
            </div>
            <Link href="/journal/new">
              <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search your journal entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full"
                  />
                </div>
                <Button onClick={handleSearch} variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <span className="ml-2 text-gray-600">Loading your journal entries...</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No journal entries yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Start your emotional wellness journey by writing your first entry
                </p>
                <Link href="/journal/new">
                  <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Write Your First Entry
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Journal Entries */}
        {!loading && entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{entry.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(entry.createdAt)}
                          </div>
                          {entry.mood && moodIcons[entry.mood] && (
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${moodIcons[entry.mood].color}`}>
                              {moodIcons[entry.mood].icon}
                              <span className="capitalize">{entry.mood}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/journal/${entry.id}/edit`)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(entry.id)}
                          disabled={deletingId === entry.id}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {deletingId === entry.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {truncateContent(entry.content)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center gap-2"
          >
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}


