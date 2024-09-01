import Image from 'next/image'
import React from 'react'
import Webcam from 'react-webcam'
import logo from './../../../../../../public/webcam.png'
import { Button } from '@/components/ui/button'

function RecordAnsSection() {
    return (
        <div className='flex flex-col justify-center items-center bg-black p-6 rounded-lg shadow-lg' style={{
            height: 400,
            width: 600,
            marginTop: 44,
        }}>
            <div className='relative mb-4'>
                <Image src={logo} width={200} height={200} alt="Webcam Logo" className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
            </div>
            <Webcam 
                style={{
                    width: '100%',
                    height: 300,
                }} 
                mirrored={true} 
            />
            <div className='flex justify-center items-center mt-6'>
                <Button className='hover:bg-slate-600 transition-all hover:text-white' variant="outline">Record Answer</Button>
            </div>
        </div>
    )
}

export default RecordAnsSection
