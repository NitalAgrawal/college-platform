"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CollegeCard from "@/components/CollegeCard";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  image: string;
  courses: string[];
}

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchColleges = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (location) params.append("location", location);
    const res = await fetch(`/api/colleges?${params}`);
    const data = await res.json();
    setColleges(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <main className="min-h-screen bg-teal-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Find Your Dream College
        </h1>
        <p className="text-teal-100 text-lg mb-10">
          Explore top colleges across India — search, compare, and save!
        </p>
        <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="🔍 Search college..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-gray-800 outline-none shadow"
          />
          <input
            type="text"
            placeholder="📍 Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-gray-800 outline-none shadow"
          />
          <button
            onClick={fetchColleges}
            className="bg-white text-teal-700 font-bold px-6 py-3 rounded-xl hover:bg-teal-50 shadow"
          >
            Search
          </button>
        </div>
      </div>

      {/* College List */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-teal-800 mb-6">
          {colleges.length} Colleges Found
        </h2>
        {loading ? (
          <div className="text-center py-20 text-teal-400">Loading...</div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20 text-teal-400">No colleges found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}