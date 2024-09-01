'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/lib/geminiAiModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';




function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobExp, setJobExp] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResp, setJsonResp] = useState();
    const router = useRouter();

    const user = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobExp, jobDescription, jobPosition);
        const inputPrompt = "Job position:" + jobPosition + ", Job Description:" + jobDescription + ", Years of experience: " + jobExp + ", based on this info give me " + process.env.NEXT_PUBLIC_QUESTION_COUNT + " interview questions with answers in json format";
        const result = await chatSession.sendMessage(inputPrompt);
        const cleanResult = result.response.text().replace('```json', "").replace('```', "");
        setJsonResp(cleanResult);
        // console.log(JSON.parse(cleanResult));
        console.log((jsonResp));

        if (cleanResult) {
            const dbResp = await db.insert(MockInterview).values({
                jsonMockResp: cleanResult,
                jobPosition: jobPosition,
                jobDescription: jobDescription,
                jobExperience: jobExp,
                createdBy: user.user.primaryEmailAddress.emailAddress,
                createdAt: moment().format("DD-MM-yyyy"),
                mockId: uuidv4()
            }).returning({ mockId: MockInterview.mockId });

            if(dbResp){
                setOpenDialog(false);
                router.push('/dashboard/interview/'+dbResp[0].mockId)
            }
        }
        else{
            alert("Error generating mock interview questions");
        }


        setLoading(false);
    };

    return (
        <div>
            <div
                onClick={() => setOpenDialog(true)}
                className='p-10 bg-secondary border rounded-lg hover:scale-105 transition-all cursor-pointer hover:shadow-md'
            >
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <h2>Add details about your job position/role, job description, and experience</h2>
                            <div className='m-3 p-3'>
                                <label className='m-1'>Job Role</label>
                                <Input
                                    placeholder="Ex. FullStack Dev."
                                    required
                                    value={jobPosition}
                                    onChange={(event) => setJobPosition(event.target.value)}
                                />
                            </div>
                            <div className='m-3 p-3'>
                                <label className='m-1'>Job Description</label>
                                <Textarea
                                    placeholder="Ex. React, Nodejs etc"
                                    required
                                    value={jobDescription}
                                    onChange={(event) => setJobDescription(event.target.value)}
                                />
                            </div>
                            <div className='m-3 p-3'>
                                <label className='m-1'>Years of Experience</label>
                                <Input
                                    placeholder="Ex. 2"
                                    type="number"
                                    max='30'
                                    required
                                    value={jobExp}
                                    onChange={(event) => setJobExp(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex gap-5 justify-end'>
                            <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? <><LoaderCircle className='animate-spin' /></> : ""}
                                Start Interview</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
