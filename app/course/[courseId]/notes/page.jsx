'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState();
  const [stepCount, setStepCount] = useState(0);
  const route=useRouter();

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'notes'
      });
      setNotes(result.data);
    
  };



  return notes && (
    <div className="p-6 max-w-4xl mx-auto">
        <div className='flex gap-2 items-center mb-6'>
            {stepCount != 0 && <Button variant='outline' size='sm' onClick={() => setStepCount(stepCount - 1)}>Previous</Button>}
          {notes?.map((item, index) => (
          <div 
            key={index} 
            className={`w-full h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-200'}`}
          />
          ))}
          
          <Button variant='outline' size='sm' onClick={() => setStepCount(stepCount + 1)}  disabled={stepCount >= notes.length}>
            Next
          </Button>
        </div>

      <div className="prose prose-lg max-w-none">
        <div 
          className="notes-content"
          dangerouslySetInnerHTML={{ 
            __html: (notes[stepCount]?.notes || '').replace('```html', ' ').replace('```',' ')
          }}
        />
        {notes?.length==stepCount&&<div className='flex items-center gap-10 flex-col justify-center'>
            <h2>End of Notes</h2>
            <Button onClick={()=>route.back(    )}>Go to Course Page</Button>
                </div>}
                
      </div>

      <style jsx global>{`
        .notes-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }
        .notes-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 1rem;
          color: #2a2a2a;
        }
        .notes-content p {
          margin: 1rem 0;
          line-height: 1.6;
        }
        .notes-content ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .notes-content li {
          margin: 0.5rem 0;
        }
        .notes-content strong {
          color: #4a4a4a;
        }
      `}</style>
    </div>
  );
}

export default ViewNotes;