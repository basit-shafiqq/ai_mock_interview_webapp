import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function InterviewCard({ interview }) {
    return (
        <div className='border shadow-md p-6 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300'>
            <h2 className='font-bold text-xl text-blue-600 mb-2'>{interview?.jobPosition}</h2>
            <p className='text-gray-600 text-sm mb-1'>{interview?.jobExperience} Years of Experience</p>
            <p className='text-gray-500 text-xs mb-4'>Created at: {new Date(interview.createdAt).toLocaleDateString()}</p>

            <div className='flex justify-between gap-4'>

                <Link href={"dashboard/interview/"+interview.mockId+"/feedback"}>
                    <Button variant="outline" className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'>
                        Feedback
                    </Button>
                </Link>
                <Link href={"/dashboard/interview/" + interview.mockId}>
                    <Button className='w-full bg-blue-500 hover:bg-blue-600 text-white'>
                        Start Again
                    </Button>
                </Link>
            </div>
        </div >
    );
}

export default InterviewCard;
