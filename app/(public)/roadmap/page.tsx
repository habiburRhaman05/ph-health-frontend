'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Code2,
  Server,
  Cloud,
  Brain,
  Rocket,
  CheckCircle2,
  Clock,
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  Lightbulb,
  GraduationCap,
  Briefcase,
  Github,
  Globe,
  Database,
  Shield,
  TestTube,
  Layers,
  Terminal,
  Smartphone,
  Bot,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  Trophy,
  Heart,
  Coffee,
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

interface Skill {
  name: string
  icon: React.ElementType
  priority: 'must' | 'should' | 'nice'
}

interface Milestone {
  title: string
  done: boolean
}

interface Phase {
  id: number
  title: string
  subtitle: string
  duration: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  description: string
  skills: Skill[]
  projects: string[]
  resources: string[]
  milestones: Milestone[]
  weeklyHours: string
  tip: string
}

const phases: Phase[] = [
  {
    id: 1,
    title: 'Foundation Mastery',
    subtitle: 'Month 1–3',
    duration: '3 months',
    icon: Code2,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    description:
      'Solidify your core frontend & backend fundamentals. Stop tutorial hell — build real things. Master TypeScript deeply, learn advanced React patterns, and make your current healthcare project production-quality.',
    skills: [
      { name: 'TypeScript (Advanced)', icon: Code2, priority: 'must' },
      { name: 'React/Next.js Deep Dive', icon: Layers, priority: 'must' },
      { name: 'REST API Design', icon: Server, priority: 'must' },
      { name: 'PostgreSQL / Prisma', icon: Database, priority: 'must' },
      { name: 'Git & GitHub Flow', icon: Github, priority: 'must' },
      { name: 'Tailwind CSS Mastery', icon: Smartphone, priority: 'should' },
    ],
    projects: [
      'Complete your PH-HealthCare app with full CRUD, auth, role-based access',
      'Build a personal portfolio website with blog (Next.js + MDX)',
      'Create a REST API with Express/Nest.js + PostgreSQL',
    ],
    resources: [
      'TypeScript Handbook (official docs)',
      'Josh W Comeau — Joy of React course',
      'Prisma docs + PostgreSQL tutorial',
      'The Odin Project (for gaps)',
    ],
    milestones: [
      { title: 'Can build full-stack CRUD app from scratch', done: false },
      { title: 'Portfolio website is live with 3+ projects', done: false },
      { title: 'Comfortable with TypeScript generics & utility types', done: false },
      { title: 'Can design and build RESTful APIs', done: false },
    ],
    weeklyHours: '25-30 hrs/week',
    tip: 'Focus on DEPTH over breadth. Don\'t jump to new frameworks — master what you have first.',
  },
  {
    id: 2,
    title: 'Testing & Quality',
    subtitle: 'Month 3–5',
    duration: '2 months',
    icon: TestTube,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description:
      'This is what separates junior devs from hireable devs. Learn testing, clean code, and professional workflows. Companies value developers who write reliable, maintainable code.',
    skills: [
      { name: 'Unit Testing (Jest/Vitest)', icon: TestTube, priority: 'must' },
      { name: 'Integration Testing', icon: Layers, priority: 'must' },
      { name: 'E2E Testing (Playwright)', icon: Globe, priority: 'should' },
      { name: 'Clean Code Principles', icon: Code2, priority: 'must' },
      { name: 'Error Handling Patterns', icon: Shield, priority: 'must' },
      { name: 'Code Review Skills', icon: BookOpen, priority: 'should' },
    ],
    projects: [
      'Add comprehensive tests to your healthcare app (80%+ coverage)',
      'Build a task management app with TDD approach',
      'Contribute to 2-3 open source projects (even small fixes count!)',
    ],
    resources: [
      'Testing JavaScript by Kent C. Dodds',
      'Clean Code by Robert C. Martin (book)',
      'Playwright docs for E2E testing',
      'Good First Issues on GitHub',
    ],
    milestones: [
      { title: 'Can write unit & integration tests confidently', done: false },
      { title: 'First open source contribution merged', done: false },
      { title: 'Healthcare app has 80%+ test coverage', done: false },
      { title: 'Understand SOLID principles & apply them', done: false },
    ],
    weeklyHours: '20-25 hrs/week',
    tip: 'Open source contributions are GOLD on your resume. Start small — fix typos, docs, then bugs.',
  },
  {
    id: 3,
    title: 'DevOps & Deployment',
    subtitle: 'Month 5–7',
    duration: '2 months',
    icon: Cloud,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    description:
      'Learn to deploy and maintain your apps professionally. Understanding CI/CD, Docker, and cloud basics makes you significantly more valuable than devs who only code locally.',
    skills: [
      { name: 'Docker Fundamentals', icon: Server, priority: 'must' },
      { name: 'CI/CD (GitHub Actions)', icon: Rocket, priority: 'must' },
      { name: 'Vercel / AWS Basics', icon: Cloud, priority: 'must' },
      { name: 'Linux & Terminal', icon: Terminal, priority: 'should' },
      { name: 'Environment Management', icon: Shield, priority: 'should' },
      { name: 'Monitoring Basics', icon: TrendingUp, priority: 'nice' },
    ],
    projects: [
      'Dockerize your healthcare app (frontend + backend + DB)',
      'Set up CI/CD pipeline with GitHub Actions (lint, test, deploy)',
      'Deploy full-stack app to AWS/Vercel with custom domain + SSL',
    ],
    resources: [
      'Docker official getting started guide',
      'GitHub Actions documentation',
      'Vercel deployment docs',
      'FreeCodeCamp — DevOps for beginners',
    ],
    milestones: [
      { title: 'Can dockerize any full-stack application', done: false },
      { title: 'CI/CD pipeline auto-deploys on push', done: false },
      { title: 'All projects are live with custom domains', done: false },
      { title: 'Comfortable with basic terminal/Linux commands', done: false },
    ],
    weeklyHours: '20-25 hrs/week',
    tip: 'Having live, deployed projects impresses interviewers 10x more than local GitHub repos.',
  },
  {
    id: 4,
    title: 'AI Tools & System Design',
    subtitle: 'Month 7–9',
    duration: '2 months',
    icon: Brain,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    description:
      'The AI-augmented developer is the future. Learn to leverage AI tools to 10x your productivity, and understand system design to think beyond just code.',
    skills: [
      { name: 'AI Coding Tools (Copilot, Codebuff)', icon: Bot, priority: 'must' },
      { name: 'System Design Basics', icon: Layers, priority: 'must' },
      { name: 'Database Design & Optimization', icon: Database, priority: 'must' },
      { name: 'Caching (Redis basics)', icon: Zap, priority: 'should' },
      { name: 'Authentication & Security', icon: Shield, priority: 'must' },
      { name: 'API Rate Limiting & Pagination', icon: Server, priority: 'should' },
    ],
    projects: [
      'Build a real-time chat app (WebSockets + Redis)',
      'Design system architecture docs for your healthcare app',
      'Build a project using AI tools from start to finish — track time saved',
    ],
    resources: [
      'System Design Interview by Alex Xu (book)',
      'ByteByteGo YouTube channel',
      'Codebuff / GitHub Copilot docs',
      'Redis University (free courses)',
    ],
    milestones: [
      { title: 'Can explain basic system design (load balancing, caching, DB scaling)', done: false },
      { title: 'Use AI tools daily to boost productivity by 2-3x', done: false },
      { title: 'Built a real-time feature (chat, notifications, etc.)', done: false },
      { title: 'Understand OAuth2, JWT, session management deeply', done: false },
    ],
    weeklyHours: '20-25 hrs/week',
    tip: 'AI won\'t replace you — but a developer WHO USES AI will replace one who doesn\'t.',
  },
  {
    id: 5,
    title: 'Job Hunting & Career Launch',
    subtitle: 'Month 9–12',
    duration: '3 months',
    icon: Rocket,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    description:
      'Time to convert your skills into a job. Polish your portfolio, practice interviews, build your network, and start applying strategically. Treat job hunting like a full-time job.',
    skills: [
      { name: 'DSA (LeetCode Easy/Medium)', icon: Brain, priority: 'must' },
      { name: 'Behavioral Interview Prep', icon: Briefcase, priority: 'must' },
      { name: 'Resume & LinkedIn Optimization', icon: GraduationCap, priority: 'must' },
      { name: 'Networking & Personal Brand', icon: Globe, priority: 'must' },
      { name: 'Technical Communication', icon: BookOpen, priority: 'should' },
      { name: 'Freelancing Basics', icon: Briefcase, priority: 'nice' },
    ],
    projects: [
      'Solve 100+ LeetCode problems (focus: Arrays, Strings, Trees, Graphs)',
      'Create a standout portfolio with case studies for each project',
      'Write 5+ technical blog posts on Dev.to or Medium',
      'Apply to 10-15 jobs per week consistently',
    ],
    resources: [
      'NeetCode.io for DSA roadmap',
      'Pramp.com for mock interviews',
      'Dev.to for technical blogging',
      'LinkedIn for networking — connect with 5 people/day',
    ],
    milestones: [
      { title: 'Portfolio has 5+ polished, deployed projects', done: false },
      { title: 'Solved 100+ LeetCode problems', done: false },
      { title: 'Applied to 100+ relevant positions', done: false },
      { title: '🎉 Landed your first developer job!', done: false },
    ],
    weeklyHours: '30-35 hrs/week',
    tip: 'Apply even if you don\'t meet 100% of requirements. Most job "requirements" are wish lists.',
  },
]

const honestTips = [
  {
    icon: Coffee,
    title: 'Consistency > Intensity',
    description: 'Coding 2 hours daily for 12 months beats 10 hours for 2 months then quitting. Build the habit.',
  },
  {
    icon: Heart,
    title: 'Build Things You Care About',
    description: 'Your healthcare project is perfect. Passion projects teach more than 100 tutorials.',
  },
  {
    icon: Star,
    title: 'Your First Job Won\'t Be Perfect',
    description: 'Accept any relevant dev role to start. Experience compounds. You can always switch later.',
  },
  {
    icon: Trophy,
    title: 'Network Is Everything',
    description: '70% of jobs come through networking. Join communities, attend meetups, help others online.',
  },
]

function PhaseCard({ phase, isExpanded, onToggle }: { phase: Phase; isExpanded: boolean; onToggle: () => void }) {
  const Icon = phase.icon

  return (
    <motion.div
      variants={itemVariants}
      layout
      className={`relative rounded-xl border ${phase.borderColor} bg-card overflow-hidden transition-all duration-300 hover:shadow-lg`}
    >
      {/* Phase Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 sm:p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Icon */}
          <div className={`flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl ${phase.bgColor} ${phase.color}`}>
            <Icon className="h-7 w-7" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className={`${phase.color} ${phase.borderColor}`}>
                Step {phase.id}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {phase.duration}
              </Badge>
              <span className="text-xs text-muted-foreground">{phase.subtitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mt-2">{phase.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {phase.description}
            </p>
          </div>

          {/* Expand Toggle */}
          <div className="flex-shrink-0 mt-2">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-8 space-y-6">
              <Separator />

              {/* Weekly Commitment */}
              <div className={`rounded-lg ${phase.bgColor} p-4 flex items-center gap-3`}>
                <Clock className={`h-5 w-5 ${phase.color}`} />
                <div>
                  <p className="text-sm font-medium">Weekly Commitment</p>
                  <p className={`text-lg font-bold ${phase.color}`}>{phase.weeklyHours}</p>
                </div>
              </div>

              {/* Skills Grid */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Skills to Learn
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {phase.skills.map((skill) => {
                    const SkillIcon = skill.icon
                    return (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3 rounded-lg border border-border p-3 bg-background hover:bg-muted/30 transition-colors"
                      >
                        <SkillIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium flex-1">{skill.name}</span>
                        <Badge
                          variant={skill.priority === 'must' ? 'default' : 'outline'}
                          className={`text-[10px] px-1.5 ${
                            skill.priority === 'must'
                              ? ''
                              : skill.priority === 'should'
                                ? 'text-amber-600 border-amber-300'
                                : 'text-muted-foreground'
                          }`}
                        >
                          {skill.priority === 'must' ? 'Must' : skill.priority === 'should' ? 'Should' : 'Nice'}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Projects to Build
                </h4>
                <div className="space-y-2">
                  {phase.projects.map((project, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <ArrowRight className={`h-4 w-4 mt-0.5 flex-shrink-0 ${phase.color}`} />
                      <span className="text-sm">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources & Milestones side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Resources */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Resources
                  </h4>
                  <div className="space-y-2">
                    {phase.resources.map((resource, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`h-1.5 w-1.5 rounded-full ${phase.color.replace('text-', 'bg-')}`} />
                        {resource}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Milestones
                  </h4>
                  <div className="space-y-2">
                    {phase.milestones.map((milestone, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${phase.color} opacity-40`} />
                        {milestone.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className={`rounded-lg border ${phase.borderColor} p-4 flex items-start gap-3`}>
                <Lightbulb className={`h-5 w-5 mt-0.5 flex-shrink-0 ${phase.color}`} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pro Tip</p>
                  <p className="text-sm mt-1">{phase.tip}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function RoadmapPage() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1)

  const togglePhase = (id: number) => {
    setExpandedPhase(expandedPhase === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-96 w-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-40 h-80 w-80 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 right-1/3 h-60 w-60 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Badge variant="outline" className="px-4 py-1 text-sm">
                <Rocket className="h-3.5 w-3.5 mr-1.5" />
                1-Year Developer Roadmap
              </Badge>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-blue-400 to-primary/60 bg-clip-text text-transparent">
                From Zero Experience
              </span>
              <br />
              <span>To Job-Ready Developer</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance"
            >
              An honest, no-BS roadmap for junior developers with no job experience.
              Follow these 5 steps over the next 12 months to become a high-demand full-stack developer.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4"
            >
              {[
                { icon: Clock, label: 'Duration', value: '12 Months' },
                { icon: Target, label: 'Steps', value: '5 Phases' },
                { icon: Code2, label: 'Projects', value: '10+ Built' },
                { icon: Briefcase, label: 'Goal', value: 'First Job' },
              ].map((stat, i) => {
                const StatIcon = stat.icon
                return (
                  <div key={i} className="rounded-lg border border-border bg-card/50 backdrop-blur p-4 text-center">
                    <StatIcon className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-8 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Your Journey Overview</h2>
          </div>
          <div className="space-y-3">
            {phases.map((phase) => {
              const Icon = phase.icon
              return (
                <div key={phase.id} className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 flex-shrink-0 ${phase.color}`} />
                  <span className="text-sm font-medium w-36 sm:w-44 truncate">{phase.title}</span>
                  <div className="flex-1">
                    <Progress value={0} className="h-2 bg-muted" />
                  </div>
                  <span className="text-xs text-muted-foreground w-20 text-right">{phase.subtitle}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Phases Timeline */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">The 5-Step Roadmap</h2>
              <p className="mt-3 text-muted-foreground">
                Click each phase to explore the detailed plan
              </p>
            </motion.div>

            {/* Timeline Line + Cards */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

              <div className="space-y-6">
                {phases.map((phase) => (
                  <div key={phase.id} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-5 top-9 hidden sm:flex">
                      <div className={`h-4 w-4 rounded-full border-2 ${phase.borderColor} ${phase.bgColor}`} />
                    </div>

                    {/* Card */}
                    <div className="sm:ml-16">
                      <PhaseCard
                        phase={phase}
                        isExpanded={expandedPhase === phase.id}
                        onToggle={() => togglePhase(phase.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Honest Tips Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">Honest Advice</h2>
              <p className="mt-3 text-muted-foreground">
                Things I wish someone told me when I was starting out
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {honestTips.map((tip, i) => {
                const TipIcon = tip.icon
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <TipIcon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{tip.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Summary */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">Your Target Tech Stack</h2>
              <p className="mt-3 text-muted-foreground">
                The technologies that will get you hired in 2025
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'TypeScript', category: 'Language' },
                { name: 'React', category: 'Frontend' },
                { name: 'Next.js', category: 'Framework' },
                { name: 'Node.js', category: 'Runtime' },
                { name: 'PostgreSQL', category: 'Database' },
                { name: 'Prisma', category: 'ORM' },
                { name: 'Docker', category: 'DevOps' },
                { name: 'Git/GitHub', category: 'Version Control' },
                { name: 'Tailwind CSS', category: 'Styling' },
                { name: 'Jest/Vitest', category: 'Testing' },
                { name: 'GitHub Actions', category: 'CI/CD' },
                { name: 'AI Tools', category: 'Productivity' },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-lg border border-border bg-card p-4 text-center hover:border-primary/40 transition-colors cursor-default"
                >
                  <p className="font-semibold text-sm">{tech.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{tech.category}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final Motivation CTA */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-blue-500/10 border border-primary/20 p-8 sm:p-12 text-center"
          >
            <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              The Best Time to Start Was Yesterday.
              <br />
              The Second Best Time Is <span className="text-primary">Now</span>.
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              You already have the skills to begin. You&apos;re building a healthcare app — that&apos;s more than
              most junior devs can say. Now follow this roadmap consistently for 12 months
              and your future self will thank you.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Rocket className="h-4 w-4 text-primary" />
              <span>You&apos;ve got this. Start with Step 1 today.</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
