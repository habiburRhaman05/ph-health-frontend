"use client";
import { useState } from "react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">AI Resume Analyzer</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border mb-8">
        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-sm mb-4" />
        <button disabled={loading || !file} className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50">
          {loading ? "Analyzing..." : "Analyze PDF"}
        </button>
      </form>

     {data && (
  <div className="mt-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-slate-800">{data.name}</h2>
      <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-black italic">
        Score: {data.score}%
      </div>
    </div>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 bg-green-50 rounded-xl border border-green-100">
        <h4 className="text-xs font-bold text-green-700 uppercase mb-2">Strengths</h4>
        <ul className="text-sm text-green-800 list-disc ml-4">
          {data.strengths?.map((s: string) => <li key={s}>{s}</li>)}
        </ul>
      </div>
      <div className="p-4 bg-red-50 rounded-xl border border-red-100">
        <h4 className="text-xs font-bold text-red-700 uppercase mb-2">Weaknesses</h4>
        <ul className="text-sm text-red-800 list-disc ml-4">
          {data.weaknesses?.map((w: string) => <li key={w}>{w}</li>)}
        </ul>
      </div>
    </div>
  </div>
)}
    </main>
  );
}