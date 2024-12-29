import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const FeatureCard = ({ title, description, icon }) => (
  <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 inline-block text-transparent bg-clip-text">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Navigation */}
      <nav className="relative p-5 flex justify-between items-center border-b border-purple-500/20 backdrop-blur-sm">
        <a href="/dashboard" className="flex gap-2 items-center">
          <Image alt="logo" width="30" height="30" src="/logo.svg" />
          <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 inline-block text-transparent bg-clip-text">KnowVo AI</h2>
        </a>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <a href="/dashboard">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white border border-purple-400/50">
              Get Started
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
            Powered by Advanced AI
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 inline-block text-transparent bg-clip-text">
            AI-Powered Learning Assistant
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Let AI create personalized study materials, smart flashcards, and adaptive quizzes.
            Experience the future of learning with our AI technology.
          </p>
          <a href="/dashboard">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-6 px-8 shadow-lg shadow-purple-500/20">
              Start Learning with AI
            </Button>
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            icon="🤖"
            title="AI Content Generation"
            description="Our AI creates comprehensive study materials tailored to your learning style and goals"
          />
          <FeatureCard
            icon="💻"
            title="AI Coding Assistant"
            description="Smart coding exercises with AI-powered hints, solutions, and explanations"
          />
          <FeatureCard
            icon="🎯"
            title="AI Interview Coach"
            description="AI generates realistic interview scenarios and provides detailed feedback"
          />
          <FeatureCard
            icon="🧠"
            title="Smart Flashcards"
            description="AI creates optimal flashcard sets based on your learning patterns"
          />
          <FeatureCard
            icon="📊"
            title="Adaptive Quizzes"
            description="AI-powered quizzes that adapt to your knowledge level and progress"
          />
          <FeatureCard
            icon="💡"
            title="Intelligent Q&A"
            description="AI generates targeted questions and detailed explanations for deep understanding"
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative bg-gradient-to-r from-purple-900 to-blue-900 py-16 mt-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 inline-block text-transparent bg-clip-text">
            Experience the Power of AI Learning
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Join the learning revolution with our AI-powered platform.
            Transform how you learn, practice, and master new skills.
          </p>
          <a href="/dashboard">
            <Button className="bg-white hover:bg-gray-100 text-purple-900 text-lg py-6 px-8 shadow-lg shadow-purple-500/20">
              Start Your AI Learning Journey
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}