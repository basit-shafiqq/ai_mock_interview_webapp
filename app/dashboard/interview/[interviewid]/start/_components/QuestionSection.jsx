import { Lightbulb } from 'lucide-react';
import React, { useState } from 'react';

function QuestionSection({ interviewQuestions, activeQuestion }) {


    return interviewQuestions && (
        <div className='p-5 border rounded-lg my-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                {interviewQuestions && interviewQuestions.length > 0 ? (
                    interviewQuestions.map((question, index) => (
                        <div key={index} className='p-4 bg-white border border-gray-200 rounded-lg shadow-md'>
                            <h2 className={`'text-xl cursor-pointer font-semibold bg-secondary p-2 text-gray-400 rounded-t-lg rounded-lg' ${activeQuestion == index && "bg-green-300 text-black "}`}>Question #{index + 1}</h2>
                        </div>
                    ))
                ) : (
                    <p>No questions available.</p>
                )}


            </div>
            <h2 className='my-5 text-md md:text-lg'>{interviewQuestions[activeQuestion].question}</h2>

            <div className='border rounded-lg p-5 bg-blue-100'>
                <h2 className='flex gap-2 items-center text-blue-500'>
                    <Lightbulb/>
                    <strong>Note:</strong>
                </h2>

                <h2 className='text-blue-400'>Click on the record button when you feel ready to answer the question!</h2>
            </div>
        </div>
    );
}

export default QuestionSection;
