"use client"
import './globals.css'
import { Inter } from 'next/font/google';
import Darkmode from "darkmode-js"
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import BoxLoader from "@/components/BoxLoader"



const inter = Inter({ subsets: ['latin'] })



const addDarkmodeWidget = () => {
  const options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }

  const darkmode = new Darkmode(options);
  darkmode.showWidget();
}



export default function RootLayout({ children }) {
  // const [preferredScheme, setPreferredScheme] = useState("");
  const [user, loading, error] = useAuthState(auth)

  const handleDarkMode = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // // Whenever the user explicitly chooses light mode
    // localStorage.theme = 'light'

    // // Whenever the user explicitly chooses dark mode
    // localStorage.theme = 'dark'

    // // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem('theme')
  }


  useEffect(() => {
    // addDarkmodeWidget();
    // handleDarkMode();

    // if(!user){}
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        {loading ? <BoxLoader /> : (
          <>
            {children}

          </>
        )}
      </body>
    </html>
  )
}
