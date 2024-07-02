import { Input } from '@/components/ui/input'
import React from 'react'
import Meetinglist from './_component/Meetinglist'

function MeetingType() {

    return (
        <div className='p-5'>
            <div className='flex flex-col gap-5'>
                <h2 className='font-bold text-3xl'>MeetingType</h2>
                <Input placeholder="Search" className="max-w-xs" />
                <hr />
            </div>
            <Meetinglist/>
        </div>
    )
}

export default MeetingType
