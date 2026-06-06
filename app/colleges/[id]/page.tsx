"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  image: string;
  courses: string[];
  placements: string;
  overview: string;
}

export default function CollegeDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/colleges/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCollege(data);
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    if (!user) {
      alert("Please login to save colleges!");
      return;
    }
    const res = await fetch("/api/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, collegeId: id }),
    });
    if (res.ok) setSaved(true);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20 text-gray-500">Loading...</div>
      </div>
    );

  if (!college)
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20 text-gray-500">College not found</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {college.name}
              </h1>
              <p className="text-gray-500 mb-1">📍 {college.location}</p>
              <p className="text-gray-500">
                💰 ₹{college.fees.toLocaleString()} / year
              </p>
            </div>
            <div className="text-right">
              <span className="bg-yellow-100 text-yellow-700 text-lg px-3 py-1 rounded-full font-semibold">
                ⭐ {college.rating}
              </span>
            </div>
          </div>
          <button
            onClick={handleSave}
            className={`mt-4 px-6 py-2 rounded-lg font-semibold ${
              saved
                ? "bg-green-100 text-green-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {saved ? "✅ Saved!" : "🔖 Save College"}
          </button>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Overview</h2>
          <p className="text-gray-600">{college.overview}</p>
        </div>

        {/* Courses */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Courses</h2>
          <div className="flex flex-wrap gap-2">
            {college.courses.map((course) => (
              <span
                key={course}
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {course}
              </span>
            ))}
          </div>
        </div>

        {/* Placements */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Placements</h2>
          <p className="text-gray-600">{college.placements}</p>
        </div>
      </div>
    </div>
  );
}