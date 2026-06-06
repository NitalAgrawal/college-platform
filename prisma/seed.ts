import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const colleges = [
    {
      name: "IIT Bombay",
      location: "Mumbai, Maharashtra",
      fees: 200000,
      rating: 4.8,
      image: "https://upload.wikimedia.org/wikipedia/en/1/1d/IIT_Bombay_Logo.svg",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
      placements: "Average package 18 LPA, Highest 1.2 CR",
      overview: "IIT Bombay is one of India's premier engineering institutions.",
    },
    {
      name: "IIT Delhi",
      location: "New Delhi, Delhi",
      fees: 200000,
      rating: 4.7,
      image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Indian_Institute_of_Technology_Delhi_logo.svg",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
      placements: "Average package 16 LPA, Highest 1 CR",
      overview: "IIT Delhi is a top engineering college located in New Delhi.",
    },
    {
      name: "BITS Pilani",
      location: "Pilani, Rajasthan",
      fees: 450000,
      rating: 4.5,
      image: "https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg",
      courses: ["B.Tech", "M.Tech", "MBA"],
      placements: "Average package 14 LPA, Highest 80 LPA",
      overview: "BITS Pilani is a deemed university known for engineering.",
    },
    {
      name: "NIT Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      fees: 150000,
      rating: 4.3,
      image: "https://upload.wikimedia.org/wikipedia/en/5/5c/NIT_Trichy_Logo.png",
      courses: ["B.Tech", "M.Tech", "PhD"],
      placements: "Average package 10 LPA, Highest 45 LPA",
      overview: "NIT Trichy is one of the top NITs in India.",
    },
    {
      name: "VIT Vellore",
      location: "Vellore, Tamil Nadu",
      fees: 180000,
      rating: 4.1,
      image: "https://upload.wikimedia.org/wikipedia/en/8/82/VIT_University_Logo.png",
      courses: ["B.Tech", "M.Tech", "MBA", "BCA"],
      placements: "Average package 8 LPA, Highest 40 LPA",
      overview: "VIT Vellore is a private university with strong placements.",
    },
    {
      name: "Delhi University",
      location: "New Delhi, Delhi",
      fees: 50000,
      rating: 4.0,
      image: "https://upload.wikimedia.org/wikipedia/en/8/84/University_of_Delhi.svg",
      courses: ["BA", "B.Com", "B.Sc", "MA", "PhD"],
      placements: "Average package 6 LPA, Highest 25 LPA",
      overview: "Delhi University is one of India's largest universities.",
    },
  ];

  for (const college of colleges) {
    await prisma.college.create({ data: college });
  }

  console.log("✅ Seed data added!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());