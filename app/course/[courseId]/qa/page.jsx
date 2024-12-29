'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ViewQuestionAnswer() {
  const { courseId } = useParams();
  const [qa, setQa] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [qaData, setQAData] = useState(null)

  useEffect(() => {
    GetQA();
  }, []);

  const GetQA = async () => {
    try {
        setIsLoading(true)
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'Question/Answer',
      });
      console.log(result.data); 
      setQAData(result.data);
      setQa(result.data?.content?.questions || []);
      
    } catch (error) {
      console.error('Error fetching QA:', error);
      
    }
    setIsLoading(false)
  };

 

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-2 items-center mb-6">
        {stepCount !== 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount - 1)}
          >
            Previous
          </Button>
        )}
        {qa.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index <= stepCount ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount(stepCount + 1)}
          disabled={stepCount >= qa.length - 1}
        >
          Next
        </Button>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="mb-8 p-6 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Question {stepCount + 1}:
          </h2>
          <p className="mb-6">{qa[stepCount]?.question}</p>
          
          <h3 className="text-lg font-semibold mb-2">Answer:</h3>
          <p className="text-gray-700">{qa[stepCount]?.answer}</p>
        </div>

        {stepCount === qa.length - 1 && (
          <div className="flex items-center gap-10 flex-col justify-center">
            <h2>End of Questions</h2>
            <Button onClick={() => router.back()}>Go to Course Page</Button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .prose h2 {
          color: #1a1a1a;
          margin-bottom: 1rem;
        }
        .prose h3 {
          color: #2a2a2a;
          margin: 1.5rem 0 1rem;
        }
        .prose p {
          margin: 1rem 0;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

export default ViewQuestionAnswer;