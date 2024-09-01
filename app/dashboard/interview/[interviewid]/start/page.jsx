'use client';

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionSection from './_components/QuestionSection';
import RecordAnsSection from './_components/RecordAnsSection';

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
               <RecordAnsSection/>
            </div>
        </div>
    )
}

export default StartInterview