"use client"
import React, { useState, useEffect } from 'react';
import { 
  FileText, Upload, Plus, Trash2, Edit3, Search, 
  Filter, MoreVertical, Download, Eye, Loader2, 
  AlertCircle, FilePlus, Calendar, HardDrive
} from 'lucide-react';
import { ReportDetailsOverlay } from '@/features/reports/ReportDetailsOverlay';

// --- Types ---
interface MedicalReport {
  id: string;
  title: string;
  category: string;
  date: string;
  doctor: string;
  fileSize: string;
}

const INITIAL_REPORTS: MedicalReport[] = [
  { id: '1', title: 'Full Blood Count', category: 'Pathology', date: '2025-12-10', doctor: 'Dr. Marcus Thorne', fileSize: '1.2 MB' },
  { id: '2', title: 'Chest X-Ray', category: 'Radiology', date: '2026-01-15', doctor: 'Dr. Sarah Jenkins', fileSize: '4.5 MB' },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // CRUD States
  const [currentReport, setCurrentReport] = useState<Partial<MedicalReport>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
const [selectedReport, setSelectedReport] = useState<any>(null);

  // Initial Data Fetch Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setReports(INITIAL_REPORTS);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- CRUD Operations ---
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);

    setTimeout(() => {
      if (isEditing) {
        setReports(reports.map(r => r.id === currentReport.id ? currentReport as MedicalReport : r));
      } else {
        const newReport = {
          ...currentReport,
          id: Math.random().toString(36).substr(2, 9),
          fileSize: '0.5 MB', // dummy
        } as MedicalReport;
        setReports([newReport, ...reports]);
      }
      setIsActionLoading(false);
      setIsModalOpen(false);
      setCurrentReport({});
      alert(isEditing ? "Report updated!" : "Report uploaded!");
    }, 1500);
  };


const handleViewDetails = (report: any) => {
  setSelectedReport(report);
  setIsViewOpen(true);
};

  const handleDelete = (id: string) => {
    if (!confirm("Delete this report permanently?")) return;
    setIsActionLoading(true);
    setTimeout(() => {
      setReports(reports.filter(r => r.id !== id));
      setIsActionLoading(false);
    }, 1000);
  };

  const openEdit = (report: MedicalReport) => {
    setCurrentReport(report);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Reports</h1>
          <p className="text-muted-foreground mt-1">Upload and manage your lab results and imaging records.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(false); setCurrentReport({}); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <Upload size={20} /> Upload Report
        </button>
      </div>

      {/* Stats Bar */}
      {!isLoading && reports.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border rounded-2xl p-4 flex items-center gap-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg"><FileText size={20}/></div>
                <div><p className="text-xs text-muted-foreground">Total</p><p className="font-bold">{reports.length}</p></div>
            </div>
            <div className="bg-card border rounded-2xl p-4 flex items-center gap-4">
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg"><HardDrive size={20}/></div>
                <div><p className="text-xs text-muted-foreground">Storage</p><p className="font-bold">5.7 MB</p></div>
            </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input 
          type="text" 
          placeholder="Search by report name..." 
          className="w-full pl-12 pr-4 py-3 rounded-xl border bg-card focus:ring-2 focus:ring-primary outline-none transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Content Area */}
      {isLoading ? (
        <LoadingState />
      ) : filteredReports.length === 0 ? (
        <EmptyState hasSearch={searchQuery.length > 0} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="group bg-card border rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all relative">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-muted rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileText size={24} />
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(report)} className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Edit3 size={16}/></button>
                  <button onClick={() => handleDelete(report.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive"><Trash2 size={16}/></button>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-1 truncate">{report.title}</h3>
              <p className="text-sm text-primary font-medium mb-4">{report.category}</p>
              
              <div className="space-y-2 border-t pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={14} /> Issued on {new Date(report.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <AlertCircle size={14} /> {report.doctor}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button 
                onClick={() => handleViewDetails(report)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-muted font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all">
                  <Eye size={16} /> View
                </button>
                <button className="p-2 border rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleSave}
            className="bg-card border shadow-2xl rounded-3xl max-w-lg w-full p-8 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{isEditing ? "Edit Report" : "Upload New Report"}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Report Title</label>
                <input 
                  required
                  placeholder="e.g. Annual Checkup Result"
                  className="w-full px-4 py-3 rounded-xl border bg-muted/30 outline-none focus:ring-2 focus:ring-primary"
                  value={currentReport.title || ""}
                  onChange={(e) => setCurrentReport({...currentReport, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border bg-muted/30 outline-none focus:ring-2 focus:ring-primary"
                    value={currentReport.category || "General"}
                    onChange={(e) => setCurrentReport({...currentReport, category: e.target.value})}
                  >
                    <option>Pathology</option>
                    <option>Radiology</option>
                    <option>Cardiology</option>
                    <option>General</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Date</label>
                  <input 
                    type="date"
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-muted/30 outline-none focus:ring-2 focus:ring-primary"
                    value={currentReport.date || ""}
                    onChange={(e) => setCurrentReport({...currentReport, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Prescribing Doctor</label>
                <input 
                  placeholder="Dr. Name"
                  className="w-full px-4 py-3 rounded-xl border bg-muted/30 outline-none focus:ring-2 focus:ring-primary"
                  value={currentReport.doctor || ""}
                  onChange={(e) => setCurrentReport({...currentReport, doctor: e.target.value})}
                />
              </div>

              {!isEditing && (
                <div className="border-2 border-dashed rounded-2xl p-8 text-center bg-muted/10 hover:bg-primary/5 transition-colors cursor-pointer group">
                  <FilePlus className="mx-auto mb-2 text-muted-foreground group-hover:text-primary" size={32} />
                  <p className="text-sm font-medium">Click to select file or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-10">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="flex-1 py-3 font-bold border rounded-xl hover:bg-muted"
              >
                Cancel
              </button>
              <button 
                disabled={isActionLoading}
                className="flex-1 py-3 font-bold bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                {isActionLoading ? <Loader2 className="animate-spin" size={20}/> : (isEditing ? "Save Changes" : "Upload Report")}
              </button>
            </div>
          </form>
        </div>
      )}


      {/* Global Action Overlay */}
      {isActionLoading && !isModalOpen && (
        <div className="fixed inset-0 bg-background/20 backdrop-blur-[2px] z-[60] flex items-center justify-center">
            <div className="bg-card border p-4 rounded-xl shadow-xl flex items-center gap-3">
                <Loader2 className="animate-spin text-primary" size={20}/>
                <span className="font-medium text-sm">Processing...</span>
            </div>
        </div>
      )}
  {/* report details overlay */}
      <ReportDetailsOverlay 
  report={selectedReport} 
  isOpen={isViewOpen} 
  onClose={() => setIsViewOpen(false)} 
/>

    </div>
  );
}

// --- UI States Components ---

function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-card border rounded-2xl p-6 animate-pulse space-y-4">
          <div className="h-12 w-12 bg-muted rounded-xl" />
          <div className="h-6 w-3/4 bg-muted rounded-lg" />
          <div className="h-4 w-1/2 bg-muted rounded-lg" />
          <div className="space-y-2 pt-4">
            <div className="h-3 w-full bg-muted rounded" />
            <div className="h-3 w-full bg-muted rounded" />
          </div>
          <div className="flex gap-3 pt-4">
            <div className="h-10 flex-1 bg-muted rounded-lg" />
            <div className="h-10 w-12 bg-muted rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="text-center py-24 bg-card border border-dashed rounded-[2rem] animate-in zoom-in-95">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <FileText size={40} className="text-muted-foreground/50" />
      </div>
      <h3 className="text-xl font-bold">
        {hasSearch ? "No matching reports found" : "Your medical vault is empty"}
      </h3>
      <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
        {hasSearch 
          ? "Try adjusting your search query or check the spelling." 
          : "Start by uploading your first lab result, prescription, or scan report."}
      </p>
    </div>
  );
}