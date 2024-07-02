"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';


function CreateBusiness() {
    const [businessName, setBusinessName] = useState();
    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();
    const router=useRouter();

    const onCreateBusinessName = async () => {
        console.log("click me", businessName)
        await setDoc(doc(db, 'Business', user.email), {
            businessName: businessName,
            email: user.email,
            userName: user.given_name + " " + user.family_name
        }).then(resp => {
            console.log("donee");
            toast('New Business Created!')
            router.replace('/dashboard')
        })
    }
    return (
        <div className='flex flex-col p-14 items-center gap-20 my-10'>
            <Image src='/logo.svg' width={200} height={200} alt='logo' />
            <div className='flex flex-col items-center gap-4 max-w-3xl'>
                <h2 className='text-4xl font-bold'>What should we call your Business?</h2>
                <p className='text-slate-500'>You can always change this later from settings </p>
                <div className='w-full'>
                    <label className='text-slate-400' >Team Name</label>
                    <Input placeholder="harmeet" className='mt-2 my-4'
                        onChange={(event) => setBusinessName(event.target.value)}
                    />
                    <Button className='w-full'
                        disabled={!businessName}
                        onClick={onCreateBusinessName}
                    >Create Business</Button>
                </div>
            </div>

        </div>
    )
}

export default CreateBusiness
