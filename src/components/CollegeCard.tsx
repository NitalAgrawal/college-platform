"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  image: string;
  courses: string[];
}

export default function CollegeCard({ college }: { college: College }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!user) {
      alert("Please login to save colleges!");
      return;
    }
    const res = await fetch("/api/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, collegeId: college.id }),
    });
    if (res.ok) setSaved(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-teal-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-teal-900">{college.name}</h3>
        <span className="bg-teal-50 text-teal-700 text-sm px-2 py-1 rounded-full font-semibold">
          ⭐ {college.rating}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-1">📍 {college.location}</p>
      <p className="text-gray-500 text-sm mb-4">
        💰 ₹{college.fees.toLocaleString()} / year
      </p>
      <div className="flex flex-wrap gap-1 mb-5">
        {college.courses.slice(0, 3).map((course) => (
          <span
            key={course}
            className="bg-teal-50 text-teal-600 text-xs px-2 py-1 rounded-full border border-teal-200"
          >
            {course}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Link
          href={`/colleges/${college.id}`}
          className="flex-1 text-center bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 text-sm font-semibold transition"
        >
          View Details
        </Link>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            saved
              ? "bg-teal-100 text-teal-700"
              : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
          }`}
        >
          {saved ? "✅ Saved" : "🔖 Save"}
        </button>
      </div>
    </div>
  );
}