"use client"
import { Button } from '@/components/ui/button';
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Clock, Copy, MapPin, Pen, Settings, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function Meetinglist() {

    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        user && getEventList();
    }, [user])
    const getEventList = async () => {
        setEventList([]);
        const q = query(collection(db, "MeetingEvent"), where("createdBy", "==", user?.email),
            orderBy('id', 'desc'));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setEventList(prevEvent => [...prevEvent, doc.data()])
        });
    }

    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-7'>
            {eventList.length > 0 ? eventList?.map((event, index) => (
                <div className='border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3'
                    style={{ borderTopColor: event?.themeColor }}>

                    <div className='flex justify-end'>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Settings className=' cursor-pointer' /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Pen/>  Edit</DropdownMenuItem>
                                <DropdownMenuItem><Trash/> Delete</DropdownMenuItem>
                               
                                
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                    <h2 className='font-medium text-xl '>{event?.eventName}</h2>
                    <div className='flex justify-between'>
                        <h2 className='flex gap-2 text-gray-500 '><Clock />{event.duration} Mins</h2>

                        <h2 className='flex gap-2 text-gray-500 '><MapPin />{event.loctiontype} </h2>
                    </div>
                    <hr></hr>
                    <div className='flex justify-between'>
                        <h2 className='flex gap-2 text-sm  text-primary items-center cursor-pointer'
                            onClick={() => {
                                navigator.clipboard.writeText(event.loctionUrl);
                                toast('Url copied on clicpboard')
                            }}
                        ><Copy className='h-4 w-4' />Copy Link  </h2>

                        <Button className='text-primary border-primary rounded-full' variant='outline'>Share</Button>
                    </div>

                </div>
            ))
                : <h2>Loading......</h2>
            }
        </div>
    )
}

export default Meetinglist
