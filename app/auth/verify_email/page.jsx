"use client"

import { auth } from "@/lib/firebase";
import { logout, sendEmailVerificationLink } from "@/lib/firebaseAuth";
import Head from "next/head";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const VerifyEmail = () => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);


    const handleResendLink = async () => {

        await sendEmailVerificationLink()

    }





    return (
        <div>
            <Head>
                <title>Email Vefification - Taskflow</title>
            </Head>
            <div className="flex flex-col justify-center items-center mt-5 p-10">
                <div className="bg-gray-100 width p-10 rounded">
                    <h1 className="font-bold text-green-700 text-3xl mb-10">Sign Up Success! 🎉</h1>
                    <h2 className="font-bold text-blue-900 text-lg">Verify Your email to continue</h2>
                    <p className="mt-2 text-">
                        A verification link has been sent to your email.
                        <br />
                        Open your mailbox and click on the link to continue.
                        <br />
                        <br />
                        - Taskflow Team
                    </p>

                    <p href="" onClick={handleResendLink} className="text-sm text-blue-500 mt-5 block underline cursor-pointer">resend link</p>
                    <p href="" onClick={async () => { user ? await logout() : router.back() }} className="text-sm text-blue-500 mt-1 block underline cursor-pointer">go back</p>

                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
