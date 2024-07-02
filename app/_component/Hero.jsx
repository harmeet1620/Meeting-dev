import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div className='flex flex-col justify-center items-center my-20 '>
            <div className='hidden lg:block'>
                <Image src='/ceo1.jpg' alt='profile1' width={100} height={100}
                    className='h-[100px] object-cover rounded-full absolute right-36' />

                <Image src='/ceo2.jpg' alt='profile1' width={100} height={100}
                    className='h-[100px] object-cover rounded-full absolute top-48 left-16' />

                <Image src='/ceo3.jpg' alt='profile1' width={100} height={100}
                    className='h-[100px] object-cover rounded-full absolute bottom-20 left-36' />

                <Image src='/ceo4.jpg' alt='profile1' width={100} height={100}
                    className='h-[100px] object-cover rounded-full absolute right-16 bottom-32' />
            </div>
            <div className='text-center max-w-3xl'>
                <h2 className='font-bold text-[60px] text-slate-500'>Easy Scheduling ahead</h2>
                <h2 className='text-xl mt-5 text-slate-500'>Calendy is your sheduling automation platform for eliminating the back and forth emails to find the perfect time  -and so much more.</h2>
                <div className='flex gap-4 flex-col mt-5'>
                    <h3 className='text-sm'>Sign Up from Google and Facebook</h3>
                    <div className='flex justify-center gap-8'>
                        <Button className='flex p-7 gap-4'>
                            <Image src="/google.png" alt='google_logo' width={40} height={40} />
                            Sign Up from Google</Button>
                        <Button className='flex p-7 gap-4'>
                            <Image src='/facebook.png' alt='facebook_logo' width={40} height={40} />
                            Sign Up from Facebook</Button>
                    </div>
                    <hr></hr>
                    <h2><Link href="" className='text-primary'>Sign Up Free with Email</Link>No Credit card required</h2>
                </div>
            </div>

        </div>
    )
}

export default Hero
