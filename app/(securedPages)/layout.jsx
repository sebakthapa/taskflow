"use client"

import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import { auth } from '@/lib/firebase'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { DailyTaskProvider, MonthlyTasksProvider } from "@/context/taskContext"
import { PersonalFinanceContextProvider, TeamFinanceContext, TeamFinanceContextProvider } from '@/context/financeContext'
import BoxLoader from "@/components/BoxLoader"
import Head from 'next/head'

const Layout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  const pathName = usePathname();
  const pageName = pathName.slice(1, pathName.length);

  useEffect(() => {
    console.log("user>", user)
    console.log("loading>", loading)

    if (user && !loading) {
      user.emailVerified || router.push("/auth/verify_email")
    }
    if (!user && !loading) {
      router.push("/auth/signup")
    }
  }, [user, loading, router])


  return (
    <div className='flex w-full '>
      <Head>
        <title >Taskflow</title>
      </Head>
      {/* <h2>HEHEHEHEHEHEHHE</h2> */}
      {/* <Nav /> */}
      <Sidebar />
                {!user ? <BoxLoader /> : (
      <div className='w-full '>
        <DailyTaskProvider>
          <MonthlyTasksProvider>
            <TeamFinanceContextProvider>
              <PersonalFinanceContextProvider>
                  <>
                    <h1 className="text-3xl p-5 font-bold uppercase">my {pageName}</h1>
                    {children}

                  </>
              </PersonalFinanceContextProvider>
            </TeamFinanceContextProvider>
          </MonthlyTasksProvider>
        </DailyTaskProvider>

      </div>
                )}
    </div>
  )
}

export default Layout
