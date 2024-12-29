import Image from 'next/image';
import React, { useState } from 'react';

function SelectOption({ selectedStudyType }) {
    const options = [
        { name: 'Exam', icon: '/exam_1.png' },
        { name: 'Job Interview', icon: '/job.png' },
        { name: 'Practice', icon: '/practice.png' },
        { name: 'Coding Prep', icon: '/code.png' },
        { name: 'Other', icon: '/knowledge.png' },
    ];

    const [selectedOption, setSelectedOption] = useState();

    return (
        <div className='text-center'>
            <h2 className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 mb-4'>
                Select Your Study Goal
            </h2>
            <p className='text-gray-400 text-sm mb-6'>
                Choose the category for which you'd like to generate personalized study material.
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`p-5 flex flex-col items-center justify-center border border-gray-700 rounded-lg shadow-md 
                        bg-gradient-to-br from-gray-800 to-gray-900 cursor-pointer 
                        transition-all hover:scale-105 hover:shadow-lg ${
                            option.name === selectedOption ? 'border-teal-500' : 'border-transparent'
                        }`}
                        onClick={() => {
                            setSelectedOption(option.name);
                            selectedStudyType(option.name);
                        }}
                    >
                        <Image
                            src={option.icon}
                            alt={option.name}
                            width={60}
                            height={60}
                            className='mb-3'
                        />
                        <h2
                            className={`text-sm font-medium ${
                                option.name === selectedOption
                                    ? 'text-teal-400'
                                    : 'text-gray-300'
                            }`}
                        >
                            {option.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectOption;
