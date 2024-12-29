import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import React from 'react';

function CourseIntroCard({ course }) {
    return (
        <div className='flex flex-col md:flex-row gap-5 items-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-lg'>
            <div className='flex-shrink-0'>
                <Image 
                    src={'/knowledge.png'} 
                    alt='Course Icon' 
                    width={80} 
                    height={80} 
                    className='rounded-full border border-teal-500 p-2'
                />
            </div>
            <div className='w-full'>
                <h2 className='font-bold text-2xl text-teal-400'>{course?.courseLayout.course_title || 'Loading...'}</h2>
                <p className='text-gray-300 mt-2'>
                    {course?.courseLayout.course_summary || 'Summary is not available.'}
                </p>
                
                <div className='flex justify-between items-center mt-3'>
                    
                    <h2 className='text-sm text-gray-400'>
                        Total Chapters: <span className='text-teal-300'>{course?.courseLayout?.chapters?.length || 0}</span>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default CourseIntroCard;
