"use client"
import React, { useState } from 'react';
import { Lock, ShieldCheck, MailCheck, Trash2, Key, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  // --- States for Password Change ---
  const [passwordData, setPasswordData] = useState({ old: "", new: "", confirm: "" });
  const [isChanging, setIsChanging] = useState(false);
  const [passError, setPassError] = useState("");

  // --- States for Password Reset ---
  const [resetStep, setResetStep] = useState<'idle' | 'input' | 'success'>('idle');
  const [resetLoading, setResetLoading] = useState(false);

  // --- States for Account Deletion ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [botCheck, setBotCheck] = useState("");

  // Handler: Change Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");

    if (passwordData.new.length < 6) {
      setPassError("New password must be at least 6 characters.");
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      setPassError("Passwords do not match.");
      return;
    }

    setIsChanging(true);
    // Dummy API Call
    setTimeout(() => {
      setIsChanging(false);
      setPasswordData({ old: "", new: "", confirm: "" });
      alert("Password changed successfully! 🔐");
    }, 2000);
  };

  // Handler: Reset Password Request
  const handleResetRequest = () => {
    setResetLoading(true);
    setTimeout(() => {
      setResetLoading(false);
      setResetStep('success');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your security preferences and account status.</p>
      </header>

      {/* 1. Change Password Section */}
      <section className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b bg-muted/30 flex items-center gap-3">
          <Key className="text-primary" size={20} />
          <h2 className="font-semibold text-lg">Change Password</h2>
        </div>
        <form onSubmit={handleChangePassword} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <input 
                type="password"
                required
                value={passwordData.old}
                onChange={(e) => setPasswordData({...passwordData, old: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <input 
                type="password"
                required
                value={passwordData.new}
                onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <input 
                type="password"
                required
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none" 
              />
            </div>
          </div>

          {passError && (
            <div className="flex items-center gap-2 text-destructive text-sm font-medium bg-destructive/10 p-3 rounded-lg">
              <AlertCircle size={16} /> {passError}
            </div>
          )}

          <button 
            disabled={isChanging}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isChanging ? <Loader2 className="animate-spin" size={18} /> : "Update Password"}
          </button>
        </form>
      </section>

      {/* 2. Dynamic Reset Password Section */}
      <section className="bg-card border rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Reset Password</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                If you've forgotten your password, we can send a secure reset link to your registered email.
              </p>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            {resetStep === 'idle' && (
              <button 
                onClick={() => setResetStep('input')}
                className="px-5 py-2 border rounded-lg hover:bg-muted font-medium transition-colors"
              >
                Send Request
              </button>
            )}
          </div>
        </div>

        {resetStep === 'input' && (
          <div className="mt-6 p-4 bg-muted/50 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
            <input 
              disabled 
              value="thisishabib2005@gmail.com" 
              className="flex-1 px-4 py-2 rounded-lg border bg-background text-muted-foreground text-sm cursor-not-allowed"
            />
            <button 
              onClick={handleResetRequest}
              disabled={resetLoading}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 flex items-center gap-2"
            >
              {resetLoading ? <Loader2 className="animate-spin" size={16} /> : "Confirm Email"}
            </button>
          </div>
        )}

        {resetStep === 'success' && (
          <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-3 animate-in zoom-in-95">
            <CheckCircle2 className="text-success" size={20} />
            <span className="text-sm font-medium text-success">Reset link has been sent to your email!</span>
            <button onClick={() => setResetStep('idle')} className="ml-auto text-xs underline underline-offset-4">Resend</button>
          </div>
        )}
      </section>

      {/* 3. Danger Zone */}
      <section className="pt-4 border-t">
        <h2 className="text-lg font-bold text-destructive mb-4">Danger Zone</h2>
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-semibold text-destructive">Delete My Account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete all your data, prescriptions, and appointment history.
            </p>
          </div>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
          >
            <Trash2 size={18} /> Delete Account
          </button>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border shadow-2xl rounded-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-center">Confirm Deletion</h2>
            <p className="text-muted-foreground text-center mt-2 mb-6">
              This action is <span className="text-destructive font-bold">permanent</span>. To continue, type <span className="font-mono bg-muted px-1 rounded text-foreground">delete</span> in the box below.
            </p>
            <input 
              value={botCheck} 
              onChange={(e) => setBotCheck(e.target.value)}
              placeholder="Enter validation text"
              className="w-full px-4 py-3 rounded-xl border mb-6 bg-muted/50 outline-none focus:ring-2 focus:ring-destructive transition-all"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 font-semibold border rounded-xl hover:bg-muted transition-colors">Cancel</button>
              <button 
                onClick={() => botCheck === 'delete' ? alert('Account Deleted') : alert('Validation failed')} 
                className="flex-1 py-3 font-semibold bg-destructive text-destructive-foreground rounded-xl hover:opacity-90 transition-all shadow-lg shadow-destructive/20"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}