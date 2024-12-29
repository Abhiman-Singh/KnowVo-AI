"use client"
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LayoutDashboard, Shield, UserCircle, Brain } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

function SideBar() {
    const MenuList = [
        {
            name: 'AI Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            name: 'Upgrade Plan',
            icon: Shield,
            path: '/dashboard/upgrade'
        },
        {
            name: 'My Profile',
            icon: UserCircle,
            path: '/dashboard/profile'
        }
    ]
    const { totalCourse, setTotalCourse } = useContext(CourseCountContext);
    const path = usePathname();

    return (
        <div className='h-screen bg-gradient-to-b from-black via-purple-950 to-black p-6 text-white relative'>
            {/* Logo Section */}
            <div className='flex gap-3 items-center'>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
                <h2 className='font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 inline-block text-transparent bg-clip-text'>
                    KnowVo AI
                </h2>
            </div>

            {/* Create New Button */}
            <div className='mt-10'>
                <Link href={'/create'} className='w-full'>
                    <Button className='w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border border-purple-400/50'>
                        <Brain className="w-4 h-4 mr-2" />
                        Create with AI
                    </Button>
                </Link>

                {/* Menu Items */}
                <div className='mt-8 space-y-2'>
                    {MenuList.map((menu, index) => (
                        <Link href={menu.path} key={index}>
                            <div className={`flex gap-4 items-center p-3 rounded-lg cursor-pointer mt-3
                                transition-all duration-200 
                                ${path === menu.path 
                                    ? 'bg-purple-600/20 border border-purple-500/40 shadow-lg shadow-purple-500/10' 
                                    : 'hover:bg-purple-900/40 border border-transparent'
                                }`}>
                                <menu.icon className={`w-5 h-5 ${path === menu.path ? 'text-purple-400' : 'text-gray-400'}`} />
                                <h2 className={path === menu.path ? 'text-purple-300' : 'text-gray-300'}>
                                    {menu.name}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Credits Card */}
            <div className='absolute bottom-6 left-6 right-6'>
                <div className='border border-purple-500/20 bg-purple-900/20 backdrop-blur-sm p-4 rounded-xl'>
                    <div className='flex items-center justify-between mb-2'>
                        <h2 className='text-lg text-purple-300'>AI Credits</h2>
                        <span className='text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 inline-block text-transparent bg-clip-text'>
                            {5-totalCourse}
                        </span>
                    </div>
                    <Progress 
                        value={(totalCourse/5)*100} 
                        className="bg-purple-950 h-2"
                    />
                    <h2 className='text-sm text-gray-400 mt-2'>
                        {totalCourse} out of 5 AI Credits Used
                    </h2>
                    <Link 
                        href={'/dashboard/upgrade'} 
                        className='mt-3 block text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:opacity-80 transition-opacity'
                    >
                        ✨ Upgrade for unlimited AI access
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SideBar