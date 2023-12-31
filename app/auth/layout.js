"use client"

import AuthNav from "@/components/AuthNav";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BoxLoader from "@/components/BoxLoader"

function Layout({ children }) {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        console.log("user>", user)
        console.log("loading>", loading)

        if (user) {
            user.emailVerified ? router.push("/dashboard") : router.push("/auth/verify_email")
        }
        if (!user && !loading) {
            router.push("/auth/signup")
        }
    }, [user, loading])

    return (
        <>

            {
                loading ? <BoxLoader /> : (
                    <>
                        <AuthNav />
                        {children}
                    </>
                )
            }
        </>
    )
}

export default Layout
