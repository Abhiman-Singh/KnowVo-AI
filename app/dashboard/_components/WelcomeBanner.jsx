"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { Sparkles } from 'lucide-react'

function WelcomeBanner() {
  const {user} = useUser();
  
  return (
    <div className='p-8 bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 w-full text-white rounded-xl 
      shadow-lg shadow-purple-500/20 border border-purple-500/20 backdrop-blur-sm'>
      <div className='flex items-center gap-8'>
        <div className='relative'>
          <Image 
            src={'/laptop.png'} 
            alt='laptop' 
            width={120} 
            height={120}
            className='drop-shadow-2xl'
          />
          <div className='absolute -top-2 -right-2 animate-pulse'>
            <Sparkles className='w-6 h-6 text-yellow-300' />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <h2 className='font-bold text-3xl bg-gradient-to-r from-white to-purple-200 inline-block text-transparent bg-clip-text'>
              Hello, {user?.fullName}
            </h2>
            <span className='text-xs bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30'>
              AI Student
            </span>
          </div>
          <p className='text-purple-200'>
            Ready to enhance your learning journey with AI-powered study materials?
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner