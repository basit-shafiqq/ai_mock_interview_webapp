'use client'

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterveiwCard from './InterveiwCard';

function InterviewList() {
    const user = useUser();

    const [interviewList,setInterviewList] = useState();

    useEffect(()=>{
        user&&getInterviewList();
    },[user]);

    const getInterviewList = async () => {

        const result = await db.select().from(MockInterview).where(eq(MockInterview.createdBy, user.user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id));
        setInterviewList(result);
    }
    return (

        <div>
            <h2 className='font-bold'>Previous Interviews</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 gap-5 my-3'>
                {interviewList && interviewList.map((interview, index) => (
                   <InterveiwCard interview={interview} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default InterviewList