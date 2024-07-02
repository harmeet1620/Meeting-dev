"use client"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

const dashboard = () => {
  return (
    <div>
      <h1>u are in dashboard</h1>

      <LogoutLink>logout </LogoutLink>
    </div>
  )
}

export default dashboard
