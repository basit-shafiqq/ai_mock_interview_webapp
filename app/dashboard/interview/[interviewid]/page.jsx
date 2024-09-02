'use client';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnable, setWebCamEnable] = useState(false);

    const router = useRouter();

    useEffect(() => {
        getInterviewDetails();
    }, [params.interviewid]);

    const getInterviewDetails = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewid));

        setInterviewData(result[0]);
    };

    return (
        <div className="flex flex-col items-center my-10 space-y-10">
            <h2 className="text-4xl font-extrabold text-primary">Lets Get Started</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
              
                <div className="col-span-2 flex flex-col space-y-6">
                  
                    <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-200">
                        {interviewData ? (
                            <>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    {interviewData.jobPosition}
                                </h2>
                                <p className="text-base text-gray-600 mb-2">
                                    <strong>Job Description:</strong> {interviewData.jobDescription}
                                </p>
                                <p className="text-base text-gray-600">
                                    <strong>Experience Required:</strong> {interviewData.jobExperience}
                                </p>
                            </>
                        ) : (
                            <p className="text-lg text-gray-500">Loading interview details...</p>
                        )}
                    </div>

                  
                    <div className="bg-yellow-100 p-8 rounded-lg shadow-lg border border-yellow-200 flex items-start space-x-4">
                        <Lightbulb className="h-8 w-8 text-yellow-600" />
                        <div>
                            <h2 className="text-xl font-bold text-yellow-800">Information</h2>
                            <p className="text-base text-yellow-700">
                                This is an AI-powered mock interview. Prepare yourself as you would for a real interview. The AI will ask you questions, evaluate your responses, and provide feedback.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center items-center bg-white p-10 rounded-lg shadow-lg border border-gray-200">
                    {webCamEnable ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnable(true)}
                            onUserMediaError={() => setWebCamEnable(false)}
                            mirrored={true}
                            className="rounded-lg border border-gray-300 shadow-inner"
                            style={{ height: 400, width: 400 }}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300 p-12">
                            <WebcamIcon className="h-20 w-20 text-gray-600 mb-4" />
                            <Button
                                className="mt-4 text-lg font-medium px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                                onClick={() => setWebCamEnable(true)}
                            >
                                Enable WebCam
                            </Button>
                        </div>
                    )}
                </div>
            </div>

                <Button onClick={()=>router.push("/dashboard/interview/"+params.interviewid+"/start")} className="px-8 py-4 text-lg font-semibold rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-200">
                    Start Your Interview
                </Button>
        </div>
    );
}

export default Interview;
