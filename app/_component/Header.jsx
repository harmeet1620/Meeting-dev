"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
      <div className='flex justify-between items-center p-5 shadow-sm'>
        <Image src='/logo.svg' alt='logo' width={100} height={100}
          className='w-[150px] md:w-[200px]'
        />

        <ul className='hidden md:flex gap-14 font-medium text-lg'>
          <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Product</li>
          <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Price</li>
          <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Contact</li>
          <li className='hover:text-primary transition-all duration-300 cursor-pointer'>About us</li>
        </ul>

        <div className='flex gap-5'>
          <LoginLink><Button variant='ghost'>login</Button></LoginLink>
          <RegisterLink><Button >Get Started</Button></RegisterLink>



        </div>
      </div>
    </div>
  )
}

export default Header
