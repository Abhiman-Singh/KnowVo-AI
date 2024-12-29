"use client"
import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'

function Dashboard() {
  return (
    <div className="min-h-screen bg-black">
      {/* Add a subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none" />
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="transform hover:-translate-y-1 transition-transform duration-300">
          <WelcomeBanner />
        </div>

        {/* Courses Section */}
        <div className="bg-purple-900/5 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
          <CourseList />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

export default Dashboard