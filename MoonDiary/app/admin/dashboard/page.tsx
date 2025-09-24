"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  FileText, 
  Home, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Settings, 
  Users,
  User,
  Bell,
  Search,
  ChevronDown,
  Plus
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastActive: string;
};

type Activity = {
  id: string;
  user: string;
  action: string;
  time: string;
  details: string;
};

type Report = {
  id: string;
  title: string;
  date: string;
  status: 'pending' | 'reviewed' | 'resolved';
  priority: 'low' | 'medium' | 'high';
};

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Mock data
  const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastActive: '2 mins ago' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastActive: '1 hour ago' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', lastActive: '1 day ago' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'suspended', lastActive: '3 days ago' },
  ];

  const activities: Activity[] = [
    { id: '1', user: 'John Doe', action: 'signed in', time: '2 mins ago', details: 'From Chrome on Windows' },
    { id: '2', user: 'Jane Smith', action: 'created a report', time: '1 hour ago', details: 'Report #1234' },
    { id: '3', user: 'System', action: 'scheduled maintenance', time: '3 hours ago', details: 'Scheduled for 2:00 AM' },
  ];

  const reports: Report[] = [
    { id: '1', title: 'Login issues', date: '2024-03-15', status: 'pending', priority: 'high' },
    { id: '2', title: 'Feature request', date: '2024-03-14', status: 'reviewed', priority: 'medium' },
    { id: '3', title: 'Bug report', date: '2024-03-13', status: 'resolved', priority: 'low' },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">AP</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-md hover:bg-gray-700"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-3 p-2 rounded-md bg-gray-700 text-white">
              <Home className="w-5 h-5" />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white">
              <Users className="w-5 h-5" />
              {isSidebarOpen && <span>Users</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white">
              <FileText className="w-5 h-5" />
              {isSidebarOpen && <span>Reports</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white">
              <BarChart3 className="w-5 h-5" />
              {isSidebarOpen && <span>Analytics</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white">
              <MessageSquare className="w-5 h-5" />
              {isSidebarOpen && <span>Messages</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white">
              <Calendar className="w-5 h-5" />
              {isSidebarOpen && <span>Calendar</span>}
            </button>
            
            <button className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white">
              <Settings className="w-5 h-5" />
              {isSidebarOpen && <span>Settings</span>}
            </button>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 text-red-400 hover:text-red-300"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <button className="p-2 rounded-full hover:bg-gray-700 relative">
                <Bell className="h-5 w-5 text-gray-300" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                {isSidebarOpen && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Admin</span>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
                <Users className="h-5 w-5 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">1,234</div>
                <p className="text-xs text-green-400 mt-1">+12.5% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Active Now</CardTitle>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">42</div>
                <p className="text-xs text-gray-400 mt-1">+5 from yesterday</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Reports Pending</CardTitle>
                <FileText className="h-5 w-5 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">18</div>
                <p className="text-xs text-yellow-400 mt-1">3 unassigned</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-gray-700">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-700 rounded-full">
                        <User className="h-4 w-4 text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          <span className="text-white">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-400">{activity.details}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Reports */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Recent Reports</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-gray-700">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-white">{report.title}</h4>
                          <p className="text-xs text-gray-400 mt-1">{report.date}</p>
                        </div>
                        <Badge 
                          variant={report.status === 'resolved' ? 'success' : report.status === 'reviewed' ? 'warning' : 'destructive'}
                          className="text-xs"
                        >
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-600 text-gray-300">
                          {report.priority} priority
                        </span>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-gray-600 h-6 px-2">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
