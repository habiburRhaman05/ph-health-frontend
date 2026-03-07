
import React from 'react';
import { 
  X, Download, Calendar, User, Tag, 
  FileText, Shield, ExternalLink, HardDrive, Clock 
} from 'lucide-react';

interface DetailProps {
  report: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportDetailsOverlay = ({ report, isOpen, onClose }: DetailProps) => {
  if (!report) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-background/60 backdrop-blur-sm z-[70] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-over Content */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-2xl bg-card border-l shadow-2xl z-[80] transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Shield size={20} />
            </div>
            <h2 className="text-xl font-bold">Report Details</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100vh-140px)] space-y-8">
          
          {/* Document Preview Thumbnail */}
          <div className="relative aspect-video w-full bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed border-muted-foreground/20 overflow-hidden group">
            <FileText size={48} className="text-muted-foreground/40 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="bg-background px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg">
                 <ExternalLink size={14} /> Full Preview
               </button>
            </div>
          </div>

          {/* Core Info */}
          <section className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Document Title</p>
              <h3 className="text-2xl font-bold leading-tight">{report.title}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 mb-1">
                   <Tag size={10} /> Category
                </p>
                <p className="font-semibold">{report.category}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 mb-1">
                   <HardDrive size={10} /> Size
                </p>
                <p className="font-semibold">{report.fileSize || "1.2 MB"}</p>
              </div>
            </div>
          </section>

          {/* Details List */}
          <section className="space-y-6">
            <h4 className="font-bold text-sm border-b pb-2">Record Information</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Ordering Physician</p>
                  <p className="font-semibold">{report.doctor}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Examination Date</p>
                  <p className="font-semibold">{new Date(report.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Uploaded At</p>
                  <p className="font-semibold">March 06, 2026</p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Note */}
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3">
            <Shield className="text-primary shrink-0" size={18} />
            <p className="text-xs text-muted-foreground leading-relaxed">
              This document is encrypted and only visible to you and your authorized healthcare providers. 
              <strong> PH-Health-Care</strong> ensures your data remains HIPAA compliant.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t flex gap-3">
          <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">
            <Download size={18} /> Download PDF
          </button>
          <button className="w-12 h-12 flex items-center justify-center border rounded-xl hover:bg-muted transition-colors">
            <X size={20} className="text-muted-foreground" onClick={onClose} />
          </button>
        </div>
      </div>
    </>
  );
};