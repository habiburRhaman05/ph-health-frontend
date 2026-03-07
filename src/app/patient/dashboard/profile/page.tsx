// src/app/profile/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Phone, Mail, Save, User } from 'lucide-react';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Static Data from your JSON
  const profileData = {
    name: "Habib Rahman",
    email: "thisishabib2005@gmail.com",
    contact: "+8801712345678",
    address: "Kaliganj, Dhaka",
    image: "https://res.cloudinary.com/drngnsgwy/image/upload/v1771653250/ph-health-care/images/01KHBC0F175W1GTD9QRWNSEEN6_avatar.webp"
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      alert("Profile updated successfully! 🎉"); // Replace with toast.success()
    }, 2000);
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar Sidebar */}
        <div className="w-full md:w-1/3 bg-card border rounded-2xl p-6 text-center shadow-sm">
          <div className="relative w-32 h-32 mx-auto mb-4 group">
            <img src={profileData.image} className="rounded-full w-full h-full object-cover border-4 border-primary/10" alt="Avatar" />
            <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
              <Camera size={18} />
            </button>
          </div>
          <h2 className="text-xl font-bold">{profileData.name}</h2>
          <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">Patient</p>
          <div className="mt-6 pt-6 border-t space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail size={16} /> {profileData.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone size={16} /> {profileData.contact}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleUpdate} className="flex-1 bg-card border rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input defaultValue={profileData.name} className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input defaultValue={profileData.contact} className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="col-span-full space-y-2">
              <label className="text-sm font-medium">Residential Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <input defaultValue={profileData.address} className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none" />
              </div>
            </div>
          </div>
          <button 
            disabled={updating}
            className="mt-8 flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {updating ? "Saving Changes..." : <><Save size={18} /> Save Profile</>}
          </button>
        </form>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8 animate-pulse">
      <div className="w-full md:w-1/3 h-80 bg-muted rounded-2xl" />
      <div className="flex-1 h-80 bg-muted rounded-2xl" />
    </div>
  );
}