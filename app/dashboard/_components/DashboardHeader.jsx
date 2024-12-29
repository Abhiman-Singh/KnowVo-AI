"use client"
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <header className='p-4 border-b border-gray-700 bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg flex justify-between items-center'>
      <h1 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500'>
        AI Learning Dashboard
      </h1>
      <div className='flex items-center gap-6'>
        <a href="/dashboard">
                    <Button className="bg-white hover:bg-gray-100 text-purple-900 text-lg py-6 px-8 shadow-lg shadow-purple-500/20">
                      DashBoard
                    </Button>
                  </a>
       
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 border-2 border-purple-500 shadow-lg"
            }
          }}
        />
      </div>
    </header>
  )
}

export default DashboardHeader
