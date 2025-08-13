// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { TrendingUp, Users, DollarSign, Target, Lightbulb, CheckCircle, Star } from 'lucide-react';

// // Mock data
// const mockData = {
//   revenue: [
//     { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
//     { month: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
//     { month: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
//     { month: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
//     { month: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
//     { month: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 }
//   ],
//   businessMetrics: [
//     { name: 'Customer Acquisition', value: 85, color: '#8B4513' },
//     { name: 'Market Research', value: 72, color: '#D2691E' },
//     { name: 'Product Development', value: 91, color: '#CD853F' },
//     { name: 'Financial Planning', value: 68, color: '#DEB887' }
//   ],
//   tasks: [
//     { id: 1, title: 'Review Q2 Financial Reports', priority: 'high', dueDate: '2025-08-15', completed: false },
//     { id: 2, title: 'Investor Meeting Preparation', priority: 'high', dueDate: '2025-08-14', completed: false },
//     { id: 3, title: 'Market Research Analysis', priority: 'medium', dueDate: '2025-08-18', completed: true },
//     { id: 4, title: 'Team Performance Review', priority: 'medium', dueDate: '2025-08-20', completed: false },
//     { id: 5, title: 'Product Launch Strategy', priority: 'low', dueDate: '2025-08-25', completed: false }
//   ]
// };

// // Key Metrics Widget
// const MetricsCard = ({ title, value, change, icon: Icon, color }) => (
//   <div className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-xl shadow-lg border border-amber-200/30 hover:shadow-xl transition-all duration-300">
//     <div className="flex items-center justify-between mb-4">
//       <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
//         <Icon className="h-6 w-6 text-white" />
//       </div>
//       <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
//         {change > 0 ? '+' : ''}{change}%
//       </span>
//     </div>
//     <h3 className="text-2xl font-bold text-amber-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</h3>
//     <p className="text-amber-700 text-sm font-medium">{title}</p>
//   </div>
// );

// // Business Ideas Generator
// const IdeaGenerator = () => {
//   const [currentIdea, setCurrentIdea] = useState(0);
//   const ideas = [
//     "AI-powered customer service for small businesses",
//     "Sustainable packaging solutions for e-commerce",
//     "Virtual reality fitness training platform",
//     "Blockchain-based supply chain transparency",
//     "Smart home energy optimization system",
//     "Micro-learning platform for busy professionals"
//   ];

//   const generateNewIdea = () => {
//     setCurrentIdea((prev) => (prev + 1) % ideas.length);
//   };

//   return (
//     <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-xl border border-amber-300/50">
//       <div className="flex items-center gap-2 mb-4">
//         <Lightbulb className="h-5 w-5 text-amber-700" />
//         <h3 className="text-xl font-bold text-amber-900" style={{ fontFamily: 'Playfair Display, serif' }}>
//           Business Idea Generator
//         </h3>
//       </div>
//       <div className="bg-white p-4 rounded-lg mb-4 border-l-4 border-amber-600">
//         <p className="text-amber-800 font-medium">{ideas[currentIdea]}</p>
//       </div>
//       <button 
//         onClick={generateNewIdea}
//         className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
//       >
//         Generate New Idea
//       </button>
//     </div>
//   );
// };

// // Task Management Widget
// const TaskManager = ({ tasks, onToggleTask }) => {
//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'high': return 'text-red-600 bg-red-100';
//       case 'medium': return 'text-yellow-600 bg-yellow-100';
//       case 'low': return 'text-green-600 bg-green-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200/30">
//       <div className="flex items-center gap-2 mb-6">
//         <CheckCircle className="h-5 w-5 text-amber-700" />
//         <h3 className="text-xl font-bold text-amber-900" style={{ fontFamily: 'Playfair Display, serif' }}>
//           Task Management
//         </h3>
//       </div>
//       <div className="space-y-3">
//         {tasks.map(task => (
//           <div 
//             key={task.id} 
//             className={`p-4 rounded-lg border transition-all duration-300 ${
//               task.completed 
//                 ? 'bg-green-50 border-green-200 opacity-75' 
//                 : 'bg-amber-50 border-amber-200 hover:shadow-md'
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={task.completed}
//                   onChange={() => onToggleTask(task.id)}
//                   className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
//                 />
//                 <div>
//                   <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-amber-900'}`}>
//                     {task.title}
//                   </h4>
//                   <p className="text-sm text-amber-600">Due: {task.dueDate}</p>
//                 </div>
//               </div>
//               <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
//                 {task.priority}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition-colors duration-300 font-medium">
//         Add New Task
//       </button>
//     </div>
//   );
// };

// // Monitor Component
// const Monitor = ({ currentUser }) => {
//   const [tasks, setTasks] = useState(mockData.tasks);
//   const [activeTab, setActiveTab] = useState('overview');

//   const toggleTask = (taskId) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#fef7ed] to-amber-50 p-6" style={{ fontFamily: 'Playfair Display, serif' }}>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-amber-900 mb-4">
//             Welcome back, {currentUser?.name || 'Entrepreneur'}! 🚀
//           </h1>
//           <p className="text-xl text-amber-700 mb-6">
//             Your entrepreneurial command center - manage, learn, and grow your business
//           </p>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex justify-center space-x-4 mb-8">
//           {['overview', 'analytics', 'learning'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-2 rounded-full transition-all duration-300 font-medium capitalize ${
//                 activeTab === tab 
//                   ? 'bg-amber-700 text-white shadow-lg' 
//                   : 'bg-white text-amber-700 hover:bg-amber-100'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tabs Content */}
//         {activeTab === 'overview' && (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <MetricsCard title="Monthly Revenue" value="$24.5K" change={12.5} icon={DollarSign} color="from-green-500 to-green-600" />
//               <MetricsCard title="Active Customers" value="1,247" change={-2.1} icon={Users} color="from-blue-500 to-blue-600" />
//               <MetricsCard title="Conversion Rate" value="3.8%" change={8.2} icon={Target} color="from-purple-500 to-purple-600" />
//               <MetricsCard title="Growth Rate" value="15.3%" change={5.7} icon={TrendingUp} color="from-orange-500 to-orange-600" />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//               <TaskManager tasks={tasks} onToggleTask={toggleTask} />
//               <IdeaGenerator />
//               <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200/30">
//                 <h3 className="text-xl font-bold text-amber-900 mb-6">Quick Actions</h3>
//                 <div className="space-y-3">
//                   <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white p-3 rounded-lg transition-all duration-300 font-medium">
//                     Schedule Investor Meeting
//                   </button>
//                   <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-lg transition-all duration-300 font-medium">
//                     Create Marketing Campaign
//                   </button>
//                   <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white p-3 rounded-lg transition-all duration-300 font-medium">
//                     Generate Financial Report
//                   </button>
//                   <button className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white p-3 rounded-lg transition-all duration-300 font-medium">
//                     Find Co-founder Match
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Analytics Tab */}
//         {activeTab === 'analytics' && (
//           <div className="space-y-8">
//             {/* Revenue Chart */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200/30">
//                 <h3 className="text-xl font-bold text-amber-900 mb-6">Revenue vs Expenses</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={mockData.revenue}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="revenue" fill="#D97706" />
//                     <Bar dataKey="expenses" fill="#F59E0B" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Business Metrics Pie Chart */}
//               <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200/30">
//                 <h3 className="text-xl font-bold text-amber-900 mb-6">Business Performance</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={mockData.businessMetrics}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={100}
//                       dataKey="value"
//                       label={({name, value}) => `${name}: ${value}%`}
//                     >
//                       {mockData.businessMetrics.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Monitor;



// CHANGES

import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Lightbulb,
  CheckCircle,
  Star,
  Activity,
  Bell,
  Zap,
  ShieldCheck,
  ScanLine,
  MessageSquare,
  RefreshCcw,
  Sun,
  Moon,
  AlertCircle,
} from "lucide-react";

const FONT = { fontFamily: "Playfair Display, serif" };
const THEME_COLORS = {
  bg: "#fef7ed",
  primary: "#92400e",
  primarySoft: "#D97706",
  accent: "#8B4513",
  cardStart: "#fff",
  cardEnd: "#fff7ed",
};

const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch (_) {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {}
  }, [key, value]);
  return [value, setValue];
};

const seedRevenue = [
  { month: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { month: "Mar", revenue: 2000, expenses: 9800, profit: -7800 },
  { month: "Apr", revenue: 2780, expenses: 3908, profit: -1128 },
  { month: "May", revenue: 1890, expenses: 4800, profit: -2910 },
  { month: "Jun", revenue: 2390, expenses: 3800, profit: -1410 },
];

const businessMetrics = [
  { name: "Customer Acquisition", value: 85, color: "#8B4513" },
  { name: "Market Research", value: 72, color: "#D2691E" },
  { name: "Product Development", value: 91, color: "#CD853F" },
  { name: "Financial Planning", value: 68, color: "#DEB887" },
];

const starterTasks = [
  { id: 1, title: "Onboard 3 mentors", priority: "high", dueDate: "2025-08-15", completed: false },
  { id: 2, title: "Automate GST Filing setup", priority: "high", dueDate: "2025-08-14", completed: false },
  { id: 3, title: "Run ITC leakage scan", priority: "medium", dueDate: "2025-08-18", completed: true },
  { id: 4, title: "Validate 5 business ideas", priority: "medium", dueDate: "2025-08-20", completed: false },
  { id: 5, title: "Plan Q3 growth experiments", priority: "low", dueDate: "2025-08-25", completed: false },
];

const useRealtime = (onTick, intervalMs = 2500) => {
  useEffect(() => {
    const id = setInterval(() => onTick?.(), intervalMs);
    return () => clearInterval(id);
  }, [onTick, intervalMs]);
};

const Metric = ({ title, value, change, icon: Icon, gradient }) => (
  <div className="bg-gradient-to-br p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl"
       style={{ backgroundImage: `linear-gradient(135deg, ${THEME_COLORS.cardStart}, ${THEME_COLORS.cardEnd})`, borderColor: "#f5d9a6" }}>
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <span className={`text-sm font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
        {change >= 0 ? "+" : ""}{change}%
      </span>
    </div>
    <h3 className="text-2xl font-bold text-amber-900" style={FONT}>{value}</h3>
    <p className="text-amber-700 text-sm font-medium">{title}</p>
  </div>
);

const IdeaGenerator = () => {
  const ideas = useMemo(() => [
    "Mentor marketplace for Tier-2/3 founders",
    "Automated GST + e-invoicing co-pilot",
    "ITC leakage radar with vendor risk scoring",
    "Idea analyzer using market signals & LLM benchmarking",
    "Founder CRM with grant & investor matching",
  ], []);
  const [idx, setIdx] = useState(0);
  return (
    <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-2xl border border-amber-200">
      <div className="flex items-center gap-2 mb-4"><Lightbulb className="h-5 w-5 text-amber-700" /><h3 className="text-xl font-bold text-amber-900" style={FONT}>Business Idea Generator</h3></div>
      <div className="bg-white p-4 rounded-lg mb-4 border-l-4 border-amber-600">
        <p className="text-amber-800 font-medium">{ideas[idx]}</p>
      </div>
      <button onClick={() => setIdx((idx + 1) % ideas.length)} className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium">Generate New Idea</button>
    </div>
  );
};

const TaskManager = ({ tasks, onToggle, onAdd }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const badge = (p) => ({ high: "text-red-700 bg-red-100", medium: "text-yellow-700 bg-yellow-100", low: "text-green-700 bg-green-100" }[p] || "text-gray-700 bg-gray-100");
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
      <div className="flex items-center gap-2 mb-6"><CheckCircle className="h-5 w-5 text-amber-700" /><h3 className="text-xl font-bold text-amber-900" style={FONT}>Task Management</h3></div>
      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.id} className={`p-4 rounded-lg border transition-all ${t.completed ? "bg-green-50 border-green-200 opacity-75" : "bg-amber-50 border-amber-200"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 text-amber-600" checked={t.completed} onChange={() => onToggle(t.id)} />
                <div>
                  <h4 className={`font-medium ${t.completed ? "line-through text-gray-500" : "text-amber-900"}`}>{t.title}</h4>
                  <p className="text-sm text-amber-700">Due: {t.dueDate || "—"}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge(t.priority)}`}>{t.priority}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-5 gap-2">
        <input placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} className="sm:col-span-2 border rounded-lg px-3 py-2" />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border rounded-lg px-3 py-2">
          <option>high</option><option>medium</option><option>low</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border rounded-lg px-3 py-2" />
        <button onClick={() => { if (!title.trim()) return; onAdd({ title, priority, dueDate }); setTitle(""); setPriority("medium"); setDueDate(""); }} className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-3 py-2 flex items-center justify-center gap-2"><CheckCircle className="h-4 w-4"/>Add</button>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon: Icon, footer, tone = "from-amber-50 to-orange-50" }) => (
  <div className={`p-6 bg-gradient-to-br ${tone} rounded-2xl border border-amber-200 hover:shadow-lg transition-all`}>
    <div className="flex items-center gap-3 mb-2"><Icon className="h-6 w-6 text-amber-800"/><h4 className="font-bold text-amber-900" style={FONT}>{title}</h4></div>
    <p className="text-sm text-amber-800 mb-3">{desc}</p>
    {footer}
  </div>
);

const LiveChip = ({ online }) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${online ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
    <span className={`h-2 w-2 rounded-full ${online ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
    {online ? "Live" : "Offline"}
  </span>
);

export default function Monitor({ currentUser }) {
  const [themeDark, setThemeDark] = useLocalStorage("themeDark", false);
  const [tasks, setTasks] = useLocalStorage("tasks", starterTasks);
  const [revenue, setRevenue] = useState(seedRevenue);
  const [activeTab, setActiveTab] = useState("overview");
  const [notif, setNotif] = useState([]);
  const [online, setOnline] = useState(true);

  useRealtime(() => {
    setRevenue((prev) => {
      const next = [...prev];
      const i = next.length - 1;
      const drift = Math.round((Math.random() - 0.4) * 800);
      next[i] = {
        ...next[i],
        revenue: Math.max(0, next[i].revenue + drift),
        expenses: Math.max(0, next[i].expenses + Math.round((Math.random() - 0.5) * 400)),
      };
      next[i].profit = next[i].revenue - next[i].expenses;
      return next;
    });

    const r = Math.random();
    if (r > 0.7) {
      const events = [
        { t: "Mentor match found in FinTech", icon: Users },
        { t: "GST filing draft ready for review", icon: ShieldCheck },
        { t: "Potential ITC leakage detected: Vendor #A12", icon: AlertCircle },
        { t: "Idea Analyzer scored 'B+' for D2C coffee", icon: Lightbulb },
      ];
      const e = events[Math.floor(Math.random() * events.length)];
      setNotif((N) => [{ id: Date.now(), ...e }, ...N].slice(0, 6));
    }
  }, 3000);

  const totals = useMemo(() => {
    const r = revenue.reduce((a, d) => a + d.revenue, 0);
    const e = revenue.reduce((a, d) => a + d.expenses, 0);
    const p = r - e;
    const growth = ((revenue[revenue.length - 1].revenue - revenue[0].revenue) / Math.max(1, revenue[0].revenue)) * 100;
    return { r, e, p, growth: Number(growth.toFixed(1)) };
  }, [revenue]);

  const toggleTask = (id) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const addTask = ({ title, priority, dueDate }) => setTasks((ts) => [{ id: Date.now(), title, priority, dueDate, completed: false }, ...ts]);

  return (
    <div className={`${themeDark ? "bg-[#1b130c]" : "bg-gradient-to-br from-[#fef7ed] to-amber-50"} min-h-screen p-6`} style={FONT}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-4xl font-bold ${themeDark ? "text-amber-100" : "text-amber-900"}`}>Welcome back, {currentUser?.name || "Entrepreneur"}! 🚀</h1>
            <p className={`${themeDark ? "text-amber-200/80" : "text-amber-700"}`}>Your live command center — manage, learn, and grow.</p>
          </div>
          <div className="flex items-center gap-3">
            <LiveChip online={online} />
            <button onClick={() => setThemeDark((v) => !v)} className="inline-flex items-center gap-2 rounded-full px-4 py-2 border bg-white hover:bg-amber-50">
              {themeDark ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
              Theme
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-3 mb-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "analytics", label: "Analytics" },
            { id: "intelligence", label: "Intelligence" }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-2 rounded-full font-medium transition ${activeTab === tab.id ? "bg-amber-700 text-white shadow-lg" : "bg-white text-amber-700 hover:bg-amber-100"}`}>{tab.label}</button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Metric title="Monthly Revenue" value={`$${(revenue.at(-1).revenue/1000).toFixed(1)}K`} change={Math.round((Math.random()-0.5)*10)} icon={DollarSign} gradient="from-green-500 to-green-600" />
              <Metric title="Active Customers" value="1,247" change={-2.1} icon={Users} gradient="from-blue-500 to-blue-600" />
              <Metric title="Conversion Rate" value="3.9%" change={2.2} icon={Target} gradient="from-purple-500 to-purple-600" />
              <Metric title="Growth Rate" value={`${totals.growth}%`} change={5.7} icon={TrendingUp} gradient="from-orange-500 to-orange-600" />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-amber-900">Live Revenue</h3><button onClick={() => setRevenue(seedRevenue)} className="text-amber-700 hover:text-amber-900 inline-flex items-center gap-2 text-sm"><RefreshCcw className="h-4 w-4"/>Reset</button></div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenue} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#D97706" fill="url(#rev)" />
                    <Area type="monotone" dataKey="expenses" stroke="#F59E0B" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-4"><Bell className="h-5 w-5 text-amber-700"/><h3 className="text-xl font-bold text-amber-900">Live Updates</h3></div>
                <div className="space-y-3 max-h-[320px] overflow-auto pr-2">
                  {notif.length === 0 && <p className="text-amber-700 text-sm">No updates yet. Streaming events will appear here.</p>}
                  {notif.map((n) => (
                    <div key={n.id} className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-center gap-3">
                      <n.icon className="h-4 w-4 text-amber-800"/>
                      <span className="text-sm text-amber-900">{n.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
  <FeatureCard 
    title="Mentor Matching" 
    icon={Users} 
    desc="AI finds the best mentors by industry, stage, and goals. Smart intros + session scheduling." 
    footer={
      <button 
        onClick={() => setTab("MentorMatch")} 
        className="mt-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm"
      >
        Find Mentor
      </button>
    } 
  />
  
  <FeatureCard 
    title="Automated GST Filing" 
    icon={ShieldCheck} 
    desc="Auto-prepare GSTR-1/3B, reconcile invoices, and file with one click. Status tracking included." 
    footer={
      <button 
        onClick={() => setTab("GSTFiling")} 
        className="mt-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm"
      >
        Go to GST Filing
      </button>
    } 
  />
  
  <FeatureCard 
    title="ITC Leakage Detector" 
    icon={ScanLine} 
    desc="Detect mismatches, vendor anomalies, and blocked credits. Reduce loss with alerts." 
    footer={
      <button 
        onClick={() => setTab("ITCLeakage")} 
        className="mt-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm"
      >
        Check Supplier Risk
      </button>
    } 
  />
  
  <FeatureCard 
    title="Business Idea Analyzer" 
    icon={Lightbulb} 
    desc="Scores ideas using market data, competition, and unit economics. Actionable validation." 
    footer={
      <button 
        onClick={() => setTab("ideas")} 
        className="mt-2 bg-white border px-3 py-1 rounded text-sm"
      >
        Analyze Idea
      </button>
    } 
  />
</div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
              <div className="xl:col-span-2"><TaskManager tasks={tasks} onToggle={toggleTask} onAdd={addTask} /></div>
              <div className="xl:col-span-1"><IdeaGenerator/></div>
            </div>
          </>
        )}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-6">Revenue vs Expenses</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#D97706" />
                    <Bar dataKey="expenses" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-6">Business Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={businessMetrics} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({name, value}) => `${name}: ${value}%`}>
                      {businessMetrics.map((e, i) => (<Cell key={i} fill={e.color}/>))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        {activeTab === "intelligence" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-8 w-8"/>
                <h2 className="text-3xl font-bold" style={FONT}>Startup Intelligence Feed</h2>
              </div>
              <p className="text-amber-100 text-lg">Real-time insights on funding, growth, and market trends</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                    <DollarSign className="h-5 w-5"/>
                    Latest Funding Rounds
                  </h3>
                  <LiveChip online={true}/>
                </div>
                <div className="space-y-4 max-h-[500px] overflow-auto">
                  {[
                    { company: "HealthTech Startup", sector: "HealthTech", amount: "$2.5M", stage: "Seed", time: "2h ago", trend: "up" },
                    { company: "EduFinance", sector: "EdTech", amount: "$8M", stage: "Series A", time: "5h ago", trend: "up" },
                    { company: "LogiFlow", sector: "Logistics", amount: "$15M", stage: "Series B", time: "1d ago", trend: "stable" },
                    { company: "GreenEnergy Co", sector: "CleanTech", amount: "$25M", stage: "Series B", time: "2d ago", trend: "up" },
                    { company: "FoodTech Solutions", sector: "FoodTech", amount: "$1.2M", stage: "Pre-Seed", time: "3d ago", trend: "down" },
                  ].map((fund, i) => (
                    <div key={i} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-amber-900">{fund.company}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-600">{fund.amount}</span>
                          <TrendingUp className={`h-4 w-4 ${fund.trend === 'up' ? 'text-green-500' : fund.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}/>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex gap-3">
                          <span className="px-2 py-1 bg-amber-600 text-white rounded-full text-xs">{fund.sector}</span>
                          <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs">{fund.stage}</span>
                        </div>
                        <span className="text-amber-700">{fund.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                  <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500"/>
                    Hot Sectors This Week
                  </h3>
                  <div className="space-y-3">
                    {[
                      { sector: "AI/ML", deals: 23, growth: "+45%" },
                      { sector: "FinTech", deals: 18, growth: "+12%" },
                      { sector: "HealthTech", deals: 15, growth: "+38%" },
                      { sector: "CleanTech", deals: 12, growth: "+67%" },
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-amber-900">{s.sector}</h4>
                          <p className="text-xs text-amber-700">{s.deals} deals</p>
                        </div>
                        <span className="text-green-600 font-bold text-sm">{s.growth}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                  <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500"/>
                    Success Stories
                  </h3>
                  <div className="space-y-4">
                    {[
                      { company: "MindfulAI", achievement: "Hit $1M ARR in 8 months", metric: "300% MoM growth" },
                      { company: "EcoDeliver", achievement: "Secured major retail partnership", metric: "500+ cities" },
                    ].map((story, i) => (
                      <div key={i} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-1">{story.company}</h4>
                        <p className="text-sm text-green-800 mb-2">{story.achievement}</p>
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">{story.metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5"/>
                  Featured Case Study
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3">How Zepto Cracked 10-Minute Delivery</h4>
                  <div className="space-y-3 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Founded:</span><span className="font-medium">2021</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Latest Valuation:</span><span className="font-medium">$900M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Key Metric:</span><span className="font-medium">2M+ orders/month</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border-l-4 border-blue-500">
                    <p className="text-sm text-blue-900"><strong>Key Learning:</strong> Micro-fulfillment centers + predictive inventory = game changer for hyperlocal delivery</p>
                  </div>
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">Read Full Analysis</button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5"/>
                  Competitive Intelligence
                </h3>
                <div className="space-y-4">
                  {[
                    { competitor: "Similar Startup A", metric: "User Growth", value: "+125% QoQ", status: "threat" },
                    { competitor: "Similar Startup B", metric: "Funding", value: "$5M raised", status: "neutral" },
                    { competitor: "Similar Startup C", metric: "Market Share", value: "15% in Tier-2", status: "opportunity" },
                  ].map((comp, i) => (
                    <div key={i} className={`p-4 rounded-lg border ${comp.status === 'threat' ? 'bg-red-50 border-red-200' : comp.status === 'opportunity' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{comp.competitor}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${comp.status === 'threat' ? 'bg-red-600 text-white' : comp.status === 'opportunity' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}>
                          {comp.status}
                        </span>
                    </div>
                      <div className="text-sm text-gray-700">
                        <span>{comp.metric}: </span>
                        <span className="font-semibold">{comp.value}</span>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .cream { background-color: ${THEME_COLORS.bg}; }
      `}</style>
    </div>
  );
}



