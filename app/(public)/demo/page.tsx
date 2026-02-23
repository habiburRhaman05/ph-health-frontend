"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { 
  Activity, Users, Sun, Moon, Star, DollarSign, 
  CheckCircle2, XCircle, ShieldCheck, TrendingUp,
  Calendar, MoreHorizontal, Bell, Search, Zap,
  ArrowUpRight
} from 'lucide-react';

export default function PhHealthMasterDashboard() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stats, setStats] = useState<any>(null);

  // Simulation of a complex Prisma Aggregation query
  useEffect(() => {
    const initDashboard = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2200));
      
      setStats({
        totalPatients: 12840,
        efficiency: 94,
        payments: [
          { status: 'success', amount: 42000, count: 720 },
          { status: 'failed', amount: 3200, count: 120 }
        ],
        reviews: [
          { rating: 5, count: 85 },
          { rating: 4, count: 30 },
          { rating: 3, count: 7 },
          { rating: 2, count: 2 },
        ],
        appointments: [
          { name: 'Completed', value: 1450, color: 'hsl(var(--chart-2))' },
          { name: 'Pending', value: 340, color: 'hsl(var(--chart-3))' },
          { name: 'Cancelled', value: 120, color: 'hsl(var(--destructive))' }
        ],
        topDoctors: [
          { id: 1, name: "Dr. Ariful Islam", specialty: "Cardiologist", rating: 4.9, status: "Available", image: "https://i.pravatar.cc/150?u=1" },
          { id: 2, name: "Dr. Sarah Taylor", specialty: "Pediatrician", rating: 4.8, status: "Busy", image: "https://i.pravatar.cc/150?u=2" },
          { id: 3, name: "Dr. James Wilson", specialty: "Neurologist", rating: 4.7, status: "Available", image: "https://i.pravatar.cc/150?u=3" },
        ],
        revenueData: [
          { day: 'Mon', revenue: 4000, patients: 120 },
          { day: 'Tue', revenue: 5500, patients: 150 },
          { day: 'Wed', revenue: 4800, patients: 140 },
          { day: 'Thu', revenue: 7000, patients: 210 },
          { day: 'Fri', revenue: 6200, patients: 180 },
          { day: 'Sat', revenue: 3000, patients: 90 },
          { day: 'Sun', revenue: 2500, patients: 75 }
        ]
      });
      setLoading(false);
    };
    initDashboard();
  }, []);

  const successData = stats?.payments.find((p: any) => p.status === 'success');
  const totalReviews = stats?.reviews.reduce((acc: number, curr: any) => acc + curr.count, 0);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8 transition-colors duration-500 selection:bg-primary/30">
        
        {/* --- DYNAMIC HEADER --- */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6 max-w-7xl mx-auto">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-5">
            <div className="w-16 h-16 bg-primary rounded-[1.75rem] flex items-center justify-center shadow-2xl shadow-primary/40 relative">
              <Zap className="text-primary-foreground fill-current" size={32} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-background animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter leading-none mb-1">HEALTH<span className="text-primary">CORE</span></h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">Advanced Hospital Ecosystem v4.0</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
              <input type="text" placeholder="Search Patients or Records..." className="w-full bg-card border-2 border-border rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-0 focus:border-primary outline-none transition-all shadow-sm" />
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-4 bg-card border-2 border-border rounded-2xl shadow-lg hover:border-primary/50 transition-all active:scale-90">
              {isDarkMode ? <Sun className="text-chart-3" /> : <Moon className="text-primary" />}
            </button>
          </div>
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {loading ? (
              <DashboardSkeleton key="skeleton" />
            ) : (
              <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-12 gap-6">
                
                {/* 1. FINANCIAL PERFORMANCE (Bento Large) */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ActionCard 
                    title="Revenue Settled" 
                    value={`$${successData.amount.toLocaleString()}`} 
                    subtitle={`${successData.count} Secured Transactions`}
                    icon={<ShieldCheck className="text-emerald-500" />}
                    color="emerald"
                  />
                  <ActionCard 
                    title="System Efficiency" 
                    value={`${stats.efficiency}%`} 
                    subtitle="Current Operational Bandwidth"
                    icon={<Activity className="text-primary" />}
                    color="primary"
                  />
                  
                  {/* Revenue Area Chart */}
                  <div className="col-span-1 md:col-span-2 bg-card p-8 rounded-[2.5rem] border shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-8 relative z-10">
                      <h3 className="font-black text-lg uppercase tracking-tight flex items-center gap-2">
                        <TrendingUp size={20} className="text-primary"/> Revenue Analytics
                      </h3>
                      <select className="bg-muted border-none text-[10px] font-black uppercase rounded-lg px-3 py-1 outline-none">
                        <option>Current Week</option>
                        <option>Last Week</option>
                      </select>
                    </div>
                    <div className="h-64 w-full relative z-10">
                      <ResponsiveContainer>
                        <AreaChart data={stats.revenueData}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Tooltip content={<CustomTooltip />} />
                          <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={5} fill="url(#colorRev)" />
                          <XAxis dataKey="day" hide />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                  </div>
                </div>

                {/* 2. PATIENT FEEDBACK & APPOINTMENTS (Right Column) */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                  {/* Fulfillment Pie Chart */}
                  <div className="bg-slate-900 dark:bg-card p-8 rounded-[2.5rem] border shadow-xl text-white dark:text-foreground">
                    <h3 className="font-black text-sm uppercase tracking-widest mb-6">Appointment Pulse</h3>
                    <div className="h-48 w-full">
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie data={stats.appointments} innerRadius={55} outerRadius={75} paddingAngle={10} dataKey="value" stroke="none">
                            {stats.appointments.map((e: any, i: number) => <Cell key={i} fill={e.color} />)}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-4">
                      {stats.appointments.map((a: any) => (
                        <div key={a.name} className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-white/50 dark:text-muted-foreground uppercase">{a.name}</span>
                          <span className="text-sm font-black" style={{ color: a.color }}>{a.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sentiment distribution */}
                  <div className="bg-card p-8 rounded-[2.5rem] border shadow-sm">
                    <h3 className="font-black text-sm uppercase tracking-widest mb-6">Reviews ({totalReviews})</h3>
                    <div className="space-y-4">
                      {stats.reviews.map((r: any) => (
                        <div key={r.rating} className="flex items-center gap-3">
                          <span className="text-[10px] font-black w-4">{r.rating}</span>
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(r.count / totalReviews) * 100}%` }} className="h-full bg-chart-3" />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground">{r.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. TOP PERFORMING DOCTORS (Full Width Footer) */}
                <div className="col-span-12 bg-card p-8 rounded-[2.5rem] border shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black text-lg uppercase tracking-tight">Active Specialists</h3>
                    <button className="p-2 hover:bg-muted rounded-xl transition-colors"><MoreHorizontal/></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.topDoctors.map((doc: any) => (
                      <div key={doc.id} className="flex items-center justify-between p-5 bg-muted/20 rounded-[2rem] border-2 border-transparent hover:border-primary/10 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <img src={doc.image} className="w-14 h-14 rounded-2xl grayscale group-hover:grayscale-0 transition-all" alt="" />
                          <div>
                            <p className="font-black text-sm">{doc.name}</p>
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">{doc.specialty}</p>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${doc.status === 'Available' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-chart-3'}`} />
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/** --- SUB-COMPONENTS FOR CLEANER CODE --- **/

function ActionCard({ title, value, subtitle, icon, color }: any) {
  const colorMap: any = {
    emerald: "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5",
    primary: "border-primary/20 text-primary bg-primary/5"
  };

  return (
    <motion.div whileHover={{ y: -5 }} className={`bg-card p-8 rounded-[2.5rem] border-2 shadow-sm ${colorMap[color]} group`}>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-card border rounded-2xl shadow-sm group-hover:rotate-12 transition-transform">{icon}</div>
        <ArrowUpRight size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{title}</p>
      <p className="text-4xl font-black tracking-tighter text-foreground">{value}</p>
      <p className="text-[10px] font-bold uppercase mt-2 opacity-60 tracking-tight">{subtitle}</p>
    </motion.div>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border-2 p-4 rounded-2xl shadow-2xl">
        <p className="text-xs font-black text-muted-foreground mb-1 uppercase tracking-widest">{payload[0].payload.day}</p>
        <p className="text-lg font-black text-primary">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-6 animate-pulse">
      <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-44 bg-muted rounded-[2.5rem]" />
        <div className="h-44 bg-muted rounded-[2.5rem]" />
        <div className="col-span-1 md:col-span-2 h-72 bg-muted rounded-[2.5rem]" />
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="h-64 bg-muted rounded-[2.5rem]" />
        <div className="h-44 bg-muted rounded-[2.5rem]" />
      </div>
      <div className="col-span-12 h-44 bg-muted rounded-[2.5rem]" />
    </div>
  );
}