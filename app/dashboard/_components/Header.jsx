"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '../../../public/logo.svg'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {
    const path = usePathname();
    useEffect(()=>{
       
    },[]);
  return (
    <div className='flex p-6 items-center justify-between bg-secondary shadow-md'>
        <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
  <Image src={logo} width={40} height={80} alt="Logo" className="rounded-md"/>
  <h2 className="text-3xl font-bold text-gray-800">InterVuAi</h2>
</div>

        <ul className='hidden md:flex gap-8'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/faqs' && 'text-primary font-bold'}`}>FAQs</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/howitworks' && 'text-primary font-bold'}`}>How It Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header