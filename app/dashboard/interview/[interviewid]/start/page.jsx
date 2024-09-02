'use client';

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionSection from './_components/QuestionSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';

function StartInterview({ params }) {

    const [interviewData, setInterviewData] = useState();
    const [interviewQuestions,setInterViewQuestions] = useState();
    const [activeQuestion, setActiveQuestion] = useState(0);

    const router = useRouter();

    useEffect(() => {
        getInterviewDetails();
    }, []);

    const getInterviewDetails = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewid));
        
        // console.log(JSON.parse(result[0].jsonMockResp));
        setInterviewData(result[0]);
        const question = JSON.parse(result[0].jsonMockResp)
        setInterViewQuestions(question);

    };
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
               
               <QuestionSection interviewQuestions = {interviewQuestions} activeQuestion={activeQuestion}/>
               <RecordAnsSection interviewQuestions = {interviewQuestions} activeQuestion={activeQuestion} interviewData = {interviewData}/>
            </div>

            <div className='flex justify-items-end gap-4'>
               {activeQuestion>0 &&<Button  onClick={()=>setActiveQuestion(activeQuestion-1)} >Prev Question</Button>} 
                {activeQuestion!=4&&<Button onClick={()=>setActiveQuestion(activeQuestion+1)}>Next Question</Button>}
                {activeQuestion==4&&<Button onClick={()=> router.push('/dashboard/interview/'+interviewData.mockId+'/feedback')}>End Interview</Button>}
            </div>
        </div>
    )
}

export default StartInterview