"use client"

import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { DailyTaskProvider, MonthlyTasksProvider } from "@/context/taskContext"

const layout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    console.log("user>", user)
    console.log("loading>", loading)

    if (user && !loading) {
      user.emailVerified || router.push("/auth/verify_email")
    }
    if (!user && !loading) {
      router.push("/auth/signup")
    }
  }, [user, loading])


  return (
    <div className='flex w-full '>
      {/* <h2>HEHEHEHEHEHEHHE</h2> */}
      {/* <Nav /> */}
      <Sidebar />
      <div className='w-full '>
        <DailyTaskProvider>
          <MonthlyTasksProvider>
            {children}
          </MonthlyTasksProvider>
        </DailyTaskProvider>

      </div>
    </div>
  )
}

export default layout
