"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import CollegeCard from "@/components/CollegeCard";
import { useRouter } from "next/navigation";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  image: string;
  courses: string[];
}

export default function SavedPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetch(`/api/saved?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Saved Colleges
        </h1>
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No saved colleges yet — go save some! 🔖
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}