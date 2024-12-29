"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem'
import { Button } from '@/components/ui/button'
import { RefreshCw, BookOpen } from 'lucide-react'
import { CourseCountContext } from '@/app/_context/CourseCountContext'

function CourseList() {
    const { user } = useUser()
    const [courseList, setCourseList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const {totalCourse, setTotalCourse} = useContext(CourseCountContext);

    const getCourseList = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('/api/courses', {
                createdBy: user?.primaryEmailAddress?.emailAddress
            })
            setCourseList(data.result)
            setTotalCourse(data.result?.length);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            getCourseList()
        }
    }, [user])

    return (
        <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                    <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 inline-block text-transparent bg-clip-text">
                        Your AI Study Materials
                    </h2>
                </div>
                <Button 
                    variant="outline" 
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-all"
                    onClick={getCourseList}
                    disabled={isLoading}
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!isLoading ? courseList?.map((course, index) => (
                    <CourseCardItem course={course} key={index} />
                )) : (
                    [...Array(6)].map((_, index) => (
                        <div key={index} 
                            className='h-56 w-full rounded-xl bg-gradient-to-r from-purple-900/10 to-blue-900/10 
                            animate-pulse border border-purple-500/20'
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default CourseList