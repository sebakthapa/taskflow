"use client"

import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const layout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    console.log("user>", user)
    console.log("loading>", loading)

    if (user && !loading) {
        user.emailVerified ? router.push("/dashboard") : router.push("/auth/verify_email")
    }
    if (!user && !loading) {
        router.push("/auth/signup")
    }
},[user, loading])


  return (
    <div className='flex'>
      {/* <h2>HEHEHEHEHEHEHHE</h2> */}
      {/* <Nav /> */}
      <Sidebar />
      <div>
        {children}

      </div>
    </div>
  )
}

export default layout
