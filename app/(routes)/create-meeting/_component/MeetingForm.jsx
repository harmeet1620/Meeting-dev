"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LocationOption from '@/app/_utils/LocationOption'
import Image from 'next/image'
import Link from 'next/link'
import ThemeOptions from '@/app/_utils/ThemeOptions'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'





function MeetingForm({ setFormValue }) {

    // const [loction, setloction] = useState();
    const [themeColor, setThemeColor] = useState();
    const [eventName, setEventName] = useState();
    const [duration, setDuration] = useState(30);
    const [loctiontype, setloctionType] = useState();
    const [loctionUrl, setloctionUrl] = useState();
    const router = useRouter();
    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();
    useEffect(() => {
        setFormValue({
            eventName: eventName,
            loctiontype: loctiontype,
            loctionUrl: loctionUrl,
            duration: duration,
            themeColor: themeColor,
        })

    }, [eventName, loctiontype, duration, loctionUrl, themeColor])
    const onCreateClick = async () => {
        const id = Date.now().toString();
        await setDoc(doc(db, 'MeetingEvent', id), {
            id: id,
            eventName: eventName,
            loctiontype: loctiontype,
            loctionUrl: loctionUrl,
            duration: duration,
            themeColor: themeColor,
            businessId: doc(db, 'Business', user?.email),
            createdBy: user?.email
        }).then(resp => {
            toast('New Meeting Event Created!')
            router.replace('/dashboard/meeting-type')
        })
    }


    return (
        <div className='p-9'>
            <Link href={'/dashboard'}>
                <h2 className=' flex gap-2'>
                    <ChevronLeft /> Cancel
                </h2>
            </Link>

            <div className='mt-4'>
                <h2 className=' font-bold text-2xl my-4'> Create New Event</h2>

                <hr></hr>
            </div>

            <div className='flex flex-col gap-3 my-4'>
                <h2 className='font-bold'>Event Name *</h2>
                <Input placeholder="Name of your meeting event"
                    onChange={(event) => setEventName(event.target.value)} />

                <h2 className='font-bold'>Duration *</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline" className="max-w-40">{duration} mins</Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setDuration(15)}>15 Min</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDuration(30)}>30 Min</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDuration(45)}>45 Min</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDuration(60)}>60 Min</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <h2 className='font-bold'>Loction *</h2>
                <div className='grid grid-cols-4 gap-3' >
                    {LocationOption.map((option, index) => (
                        <div key={index} className={` border flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer
                        hover:bg-blue-100 hover:border-primary
                         ${loctiontype == option.name && ' bg-blue-100  border-primary'}`}
                            onClick={() => setloctionType(option.name)} >
                            <Image src={option.icon} alt={option.name} width={30} height={30} />
                            <h2>{option.name}</h2>
                        </div>
                    ))}
                </div>
                {loctiontype && <>
                    <h2 className='font-bold'>Add {loctiontype} Url *</h2>
                    <Input placeholder="Add Url"
                        onChange={(event) => setloctionUrl(event.target.value)} />
                </>}

                <h2 className='font-bold'>Select Theme Color</h2>
                <div className=' flex justify-evenly'>
                    {ThemeOptions.map((color, index) => (
                        <div key={index} style={{ background: color }} className={`h-7  w-7 rounded-full ${themeColor == color && 'border-4 border-black'}`}
                            onClick={() => { setThemeColor(color) }}>
                        </div>
                    ))}
                </div>

            </div>
            <Button className="w-full mt-9"
                disabled={(!eventName || !duration || !loctiontype || !loctionUrl)}
                onClick={() => onCreateClick()}
            > Create</Button>
        </div>
    )
}

export default MeetingForm
