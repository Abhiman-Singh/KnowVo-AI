"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCw, ChevronRight, Brain } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CourseCardItem({course}) {
  return (
    <div className='bg-white/10 border border-purple-500/30 rounded-xl p-6 
      hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300
      backdrop-blur-md'>
      <div>
        <div className='flex justify-between items-center'>
          <div className='relative'>
            <Image 
              src={'/knowledge.png'} 
              alt='other' 
              width={50} 
              height={50} 
              className='drop-shadow-lg'
            />
            <div className='absolute -top-1 -right-1'>
              <Brain className='w-4 h-4 text-purple-300' />
            </div>
          </div>
          <h2 className='text-xs px-3 py-1 rounded-full bg-purple-400/20 border border-purple-300/30 text-purple-200'>
            20 Dec 2024
          </h2>
        </div>
        
        <h2 className='mt-4 font-medium text-lg text-white'>
          {course?.courseLayout?.course_title}
        </h2>
        
        <p className='text-sm line-clamp-2 text-gray-200 mt-2'>
          {course?.courseLayout?.course_summary}
        </p>
        
        <div className='mt-4'>
          <Progress 
            value={0} 
            className="h-1.5 bg-white/5"
          />
        </div>
        
        <div className='mt-4 flex justify-end'>
          {course?.status == 'Generating' ? (
            <div className='text-sm px-3 py-1.5 flex gap-2 items-center rounded-full bg-white/10 text-white border border-white/20'>
              <RefreshCw className='h-4 w-4 animate-spin'/>
              Generating...
            </div>
          ) : (
            <Link href={'/course/'+course?.courseId}>
              <Button className="bg-white hover:bg-gray-100 text-purple-900">
                View Course
                <ChevronRight className='w-4 h-4 ml-1' />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCardItem