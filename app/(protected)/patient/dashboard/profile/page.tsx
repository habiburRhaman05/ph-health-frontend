"use client"

import { User, Mail, Phone, ShieldCheck, Camera, Save } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function PatientProfilePage() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-10">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-black tracking-tighter italic uppercase">Security & Profile</h1>
        <p className="text-muted-foreground text-sm font-medium">Manage your personal information and account security.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group cursor-pointer">
            <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-tr from-primary to-blue-400 p-1">
              <div className="h-full w-full rounded-[2.3rem] bg-background flex items-center justify-center overflow-hidden">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-[2.3rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="text-white h-6 w-6" />
            </div>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-primary">Change Avatar</p>
        </div>

        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 space-y-6 bg-card/30 p-8 rounded-[2rem] border border-border"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Full Name</Label>
              <Input defaultValue="John Doe" className="h-11 rounded-xl bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Contact Number</Label>
              <Input defaultValue="+880 1700 000000" className="h-11 rounded-xl bg-background/50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Email Address</Label>
            <Input disabled value="john.doe@example.com" className="h-11 rounded-xl bg-muted/50" />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-tight">
              <ShieldCheck className="h-4 w-4" /> Verified Patient
            </div>
            <Button className="font-bold rounded-xl px-8 gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}