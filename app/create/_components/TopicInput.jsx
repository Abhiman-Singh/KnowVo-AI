import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

function TopicInput({ setTopic, setDifficultyLevel }) {
    return (
        <div className='mt-10 w-full flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg'>
            <h2 className='text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400'>
                Enter or Paste Your Content
            </h2>
            <p className='text-gray-400 text-sm mb-4'>
                Provide the topic or text for which you want to generate personalized study material.
            </p>
            <Textarea
                placeholder='Start writing or paste your content here...'
                className='mt-2 w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:border-teal-500 focus:ring-2 focus:ring-teal-400'
                onChange={(event) => setTopic(event.target.value)}
            />

            <h2 className='mt-6 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400'>
                Select the Difficulty Level
            </h2>
            <p className='text-gray-400 text-sm mb-4'>
                Choose the level of difficulty for your generated study material.
            </p>
            <Select onValueChange={(value) => setDifficultyLevel(value)}>
                <SelectTrigger className="w-full bg-gray-700 text-white border border-gray-600 rounded-md hover:border-teal-500 focus:ring-2 focus:ring-teal-400">
                    <SelectValue placeholder="Select Difficulty Level" />
                </SelectTrigger>
                <SelectContent className='bg-gray-800 text-white border border-gray-700 rounded-lg shadow-lg'>
                    <SelectItem value="Easy" className="hover:bg-teal-500 hover:text-white">
                        Easy
                    </SelectItem>
                    <SelectItem value="Moderate" className="hover:bg-teal-500 hover:text-white">
                        Moderate
                    </SelectItem>
                    <SelectItem value="Hard" className="hover:bg-teal-500 hover:text-white">
                        Hard
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default TopicInput;
