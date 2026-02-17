'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CheckCircle,
  Search,
  Calendar,
  MessageSquare,
  Star,
  Users,
  Clock,
  Shield,
  ArrowRight,
} from 'lucide-react'
import { FeaturedDoctorsCarousel } from '@/features/doctors/components/FeaturedDoctorsCarousel'
import { SPECIALTIES } from '@/features/shared/constants'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('')

  const steps = [
    {
      number: 1,
      title: 'Search Doctors',
      description: 'Browse our network of verified healthcare professionals',
      icon: Search,
    },
    {
      number: 2,
      title: 'Book Appointment',
      description: 'Choose your preferred date and time for consultation',
      icon: Calendar,
    },
    {
      number: 3,
      title: 'Get Consultation',
      description: 'Connect with your doctor and get expert medical advice',
      icon: MessageSquare,
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Verified Doctors',
      description: 'All doctors are verified and licensed professionals',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Book appointments at your convenience anytime',
    },
    {
      icon: Users,
      title: 'Quality Care',
      description: 'Access to experienced and highly-rated doctors',
    },
    {
      icon: Star,
      title: 'Transparent Pricing',
      description: 'No hidden charges, clear consultation fees',
    },
  ]

  const testimonials = [
    {
      name: 'Ahmed Hassan',
      role: 'Patient',
      content: 'Great experience! Booked an appointment in minutes and got expert advice.',
      rating: 5,
    },
    {
      name: 'Fatima Khan',
      role: 'Patient',
      content: 'Very professional doctors and easy to use platform. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Ali Raza',
      role: 'Patient',
      content: 'Best healthcare platform in Pakistan. Saved me time and money.',
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'Sign up, browse doctors by specialty, select your preferred time slot, and confirm your appointment. You will receive a confirmation email immediately.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and mobile payment solutions like JazzCash and Easypaisa.',
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time.',
    },
    {
      question: 'Are the doctors qualified?',
      answer: 'Yes, all doctors on our platform are verified, licensed, and have extensive experience in their respective fields.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            {/* Main Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl font-bold text-balance">
                <span className="bg-gradient-to-r from-primary via-blue-500 to-primary/60 bg-clip-text text-transparent">
                  Healthcare at Your
                </span>
                <br />
                <span>Fingertips</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
                Connect with verified doctors, book appointments instantly, and receive expert medical advice from the comfort of your home.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" asChild className="h-12 px-8 text-base">
                <Link href="/doctors">
                  Find Doctors
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base">
                <Link href="/auth">Get Started</Link>
              </Button>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="mx-auto max-w-2xl">
              <div className="rounded-xl border border-border bg-card/50 backdrop-blur p-2 sm:p-4 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALTIES.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search by doctor name..." className="border-0" />
                  <Button className="w-full">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
            >
              {[
                { number: '500+', label: 'Doctors' },
                { number: '10K+', label: 'Appointments' },
                { number: '4.9★', label: 'Rating' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold">{stat.number}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
              <p className="mt-4 text-muted-foreground">
                Three simple steps to get expert medical consultation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {index < steps.length - 1 && (
                        <div className="hidden sm:block absolute top-8 -right-4 w-8 h-0.5 bg-primary/20" />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <FeaturedDoctorsCarousel />
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">Why Choose Us?</h2>
              <p className="mt-4 text-muted-foreground">
                Leading healthcare platform with trusted doctors and seamless service
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="rounded-lg border border-border bg-card p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">What Our Users Say</h2>
              <p className="mt-4 text-muted-foreground">
                Thousands of patients trust us for their healthcare needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="font-semibold mb-2 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-8 sm:p-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of patients who trust PH-HealthCare for their medical needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/doctors">Find Doctors Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth">Create Account</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
