"use client"

import { FileText, Download, Eye, Pill } from "lucide-react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function PrescriptionsPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tighter italic uppercase">Digital Prescriptions</h1>
        <p className="text-muted-foreground text-sm font-medium">Access your medication history and instructions.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[2rem] border border-border bg-card/30 backdrop-blur-sm overflow-hidden"
      >
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="font-bold uppercase text-[10px] tracking-widest pl-8">Date</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">Medicine</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">Doctor</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-right pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i} className="group border-border/50">
                <TableCell className="font-medium pl-8 py-6">Oct {10+i}, 2024</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg"><Pill className="h-4 w-4 text-primary" /></div>
                    <span className="font-bold">Amoxicillin 500mg</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-medium">Dr. Emily Stone</TableCell>
                <TableCell className="text-right pr-8">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-xl text-primary"><Download className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}