import React from 'react'
import SideNavLayout from './_component/SideNavLayout'
import DashboardHeader from './_component/DashboardHeader'
import { Toaster } from '@/components/ui/sonner'

function Dashboardlayout({ children }) {
    return (
        <div>
            <div className='hidden md:block md:w-64 bg-slate-50 h-screen fixed'><SideNavLayout /></div>
            <div className='md:ml-64'>
                <DashboardHeader />
                <Toaster/>
                {children}</div>

        </div>
    )
}

export default Dashboardlayout
