'use client';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  const getFeedBack = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewid))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
  };

  useEffect(() => {
    getFeedBack();
  }, [params.interviewid]);

  return (
    <div className='p-10 bg-gray-50 rounded-lg shadow-md'>
      <h2 className='text-4xl font-bold text-green-600 mb-4'>Congratulations!</h2>
      <h3 className='text-2xl font-semibold text-gray-800 mb-2'>Here’s Your Interview Feedback</h3>
      <p className='text-gray-600 text-lg mb-4'>Your overall interview rating: <strong className='text-green-500'>{feedbackList.length > 0 ? feedbackList[0].rating : "N/A"}</strong></p>
      <p className='text-gray-700 text-lg mb-6'>Below are the questions, your answers, and feedback for improvement:</p>

      {feedbackList.length > 0 ? feedbackList.map((item, index) => (
        <Collapsible key={index} className='mb-4'>
          <CollapsibleTrigger className='p-4 bg-gray-100 rounded-lg text-left flex justify-between items-center cursor-pointer hover:bg-gray-200'>
            <span className='font-medium text-gray-800'>Q{index + 1}: {item.question}</span>
            <ChevronsUpDown className='text-gray-600'/>
          </CollapsibleTrigger>
          <CollapsibleContent className='p-4 bg-white border-t border-gray-200'>
            <p className='mb-2'><strong>Correct Answer:</strong> {item.correctAns}</p>
            <p className='mb-2'><strong>Your Answer:</strong> <span className='text-blue-500'>{item.userAns}</span></p>
            <p className='mb-2'><strong>Rating:</strong> <span className={item.rating === 'Excellent' ? 'text-green-500' : item.rating === 'Good' ? 'text-yellow-500' : 'text-red-500'}>{item.rating}</span></p>
            <p><strong>Feedback:</strong> <span className='text-purple-500'>{item.feedback}</span></p>
          </CollapsibleContent>
        </Collapsible>
      )) : (
        <p className='text-gray-500'>No feedback available.</p>
      )}

      <div className='mt-6'>
        <Button onClick={()=>router.replace('/dashboard')} className='bg-blue-500 text-white hover:bg-blue-600'>Go Home</Button>
      </div>
    </div>
  );
}

export default Feedback;
