import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useState } from 'react';

function QuestionSection({ interviewQuestions, activeQuestion }) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel(); // Stop speaking
                setIsSpeaking(false);
            } else {
                const speech = new SpeechSynthesisUtterance(text);
                speech.onend = () => setIsSpeaking(false); // Reset state when done
                window.speechSynthesis.speak(speech);
                setIsSpeaking(true);
            }
        } else {
            alert("Sorry, your browser doesn't support text-to-speech!");
        }
    };

    return interviewQuestions && (
        <div className='p-5 border rounded-lg my-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                {interviewQuestions && interviewQuestions.length > 0 ? (
                    interviewQuestions.map((question, index) => (
                        <div key={index} className={`p-4 bg-green-300 border border-gray-200 rounded-lg shadow-md ${activeQuestion === index ? 'bg-green-500 text-black' : 'bg-white'}`}>
                            <h2 className={`text-xl cursor-pointer font-semibold p-2 rounded-t-lg ${activeQuestion === index ? 'text-black' : 'text-gray-400'}`}>
                                Question #{index + 1}
                            </h2>
                        </div>
                    ))
                ) : (
                    <p>No questions available.</p>
                )}
            </div>
            <h2 className='my-5 text-md md:text-lg'>{interviewQuestions[activeQuestion].question}</h2>

            <div className='flex items-center space-x-4'>
                <Volume2 
                    className='cursor-pointer transition-colors duration-300' 
                    onClick={() => textToSpeech(interviewQuestions[activeQuestion].question)} 
                    style={{ 
                        color: isSpeaking ? '#f87171' : '#3b82f6', 
                        fontSize: '2rem', 
                        transform: isSpeaking ? 'scale(1.2)' : 'scale(1)' 
                    }}
                />
                <span className='text-sm text-gray-500'>
                    {isSpeaking ? 'Speaking...' : 'Click to Listen'}
                </span>
            </div>

            <div className='border rounded-lg p-5 bg-blue-100 mt-4'>
                <h2 className='flex gap-2 items-center text-blue-500'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>

                <h2 className='text-blue-400'>Click on the record button when you feel ready to answer the question!</h2>
            </div>
        </div>
    );
}

export default QuestionSection;
