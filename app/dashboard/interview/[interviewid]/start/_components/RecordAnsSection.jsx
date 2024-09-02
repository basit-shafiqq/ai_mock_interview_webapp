'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import logo from './../../../../../../public/webcam.png'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner'
import { chatSession } from '@/lib/geminiAiModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'

function RecordAnsSection({ interviewQuestions, activeQuestion, interviewData }) {


    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const user = useUser();

    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {

        results.map((result) => {
            setUserAnswer(prevAns => prevAns + result.transcript)
        })
    }, [results]);

    useEffect(() => {

        if (!isRecording && userAnswer.length > 5) {
            updateUserData();
        }
        // if(userAnswer.length<5){
        //     setLoading(false);
        //     toast("Your answer was too short! Record again!");
        //     return;
        // }


    }, [userAnswer])

    const saveUserAnswerToDb = async () => {
        if (isRecording) {

            stopSpeechToText();
        }
        else {
            startSpeechToText();
        }
    }

    const updateUserData = async () => {
        setLoading(true)
        const feedbackPrompt = "Question" + interviewQuestions[activeQuestion].question +
            ",User answer is: " + userAnswer + "Depending on the answer given by the user for the given question give us the rating and feedback in terms of area of improvement if any in 3 to 5 lines in json format with rating field and feedback field .";
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json', "").replace('```', "");;
        // console.log(mockJsonResp);
        const jsonResp = JSON.parse(mockJsonResp);

        const dbResp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData.mockId,
            question: interviewQuestions[activeQuestion].question,
            correctAns: interviewQuestions[activeQuestion].answer,
            userAns: userAnswer,
            feedback: jsonResp.feedback,
            rating: jsonResp.rating,
            userEmail: user.user.primaryEmailAddress.emailAddress,
            createdAt: moment().format("DD-MM,yyyy")
        })

        if (dbResp) {
            toast("User data saved!");
            setResults([]);
            setUserAnswer('');
        }
        setResults([]);

        setLoading(false);
    }

    return (
        <div className='flex flex-col justify-center items-center bg-black p-6 rounded-lg shadow-lg' style={{
            height: 400,
            width: 600,
            marginTop: 44,
        }}>
            <div className='relative mb-4'>
                <Image src={logo} width={200} height={200} alt="Webcam Logo" className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
            </div>
            <Webcam
                style={{
                    width: '100%',
                    height: 300,
                }}
                mirrored={true}
            />
            <div disabled={loading} onClick={saveUserAnswerToDb} className='flex justify-center items-center mt-6'>
                <Button className='hover:bg-slate-600 transition-all hover:text-white' variant="outline">{isRecording ? 'Stop Recording' : 'Start Recording'}</Button>
            </div>
            <h1>Recording: {isRecording.toString()}</h1>

        </div>
    )
}

export default RecordAnsSection
