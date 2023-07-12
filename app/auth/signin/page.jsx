"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { continueWithGoogle, logout, sendEmailVerificationLink, signin } from "@/lib/firebaseAuth"
import { auth } from "@/lib/firebase"

import { useRouter } from "next/navigation";
import Head from "next/head";

function Signin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { handleSubmit, register, formState: { errors }, } = useForm();
    const [user, loading, error] = useAuthState(auth)


    const handleSignin = async (data) => {
        const { email, password } = data;


        try {

            await signin(email, password);


        } catch (err) {
            console.log(err);
            const msg = err.message;
            const dm = msg.slice(msg.indexOf("(") + 1, msg.indexOf(")"))
            // alert(dm);
        }
    }



    const handleGoogleAuth = async (e) => {
        e.preventDefault();
        console.log("google");
        await continueWithGoogle();
        console.log(user)
    }


    // useEffect(() => {
    //     if (user && !loading) {
    //         user.emailVerified && router.push('/dashboard')
    //     }
    // }, [user, loading, error, router])


    if (!user) {
        return (
            <div className="form-container flex  justify-center items-center mt-10  w-screen " >
                <Head>
                    <title>Sign In - Taskflow</title>
                </Head>
                <form action="" onSubmit={handleSubmit(handleSignin)} className="flex flex-col gap-5 bg-[rgba(230,230,250,.2)] bg_blur p-10 rounded-lg w-[550px] border-solid border-gray-300 border-2">
                    <h2 className="text-2xl font-bold mb-3"> Sign In</h2>
                    <div className="input-field-container flex flex-col ">
                        <div>
                            <input
                                autoComplete="off"
                                id="email"
                                type="text"
                                {...register(
                                    "email",
                                    {
                                        maxLength: { value: 50, message: "Enter less than 50 characters" },
                                        required: "This field is required",
                                        pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Enter a valid Email" },
                                        onChange: (e) => setEmail(e.target.value),
                                        value: email
                                    }
                                )}
                                className={`w-full py-2 px-4`} required />
                            <label className="mb-2 text-gray-500" htmlFor="email">Email</label>
                        </div>
                        <p className="text-red-500 text-xs">{errors ? errors.email ? errors.email.message : "" : ""}</p>
                    </div>

                    <div className="input-field-container flex flex-col ">
                        <div>
                            <input
                                autoComplete="off"
                                id="password"
                                type="password"
                                {...register(
                                    "password",
                                    {
                                        required: "This field is required",
                                        minLength: { value: 8, message: "Enter 8 characters or more" },
                                        pattern: { value: /(?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z]))((?=.*\W)|(?=.*_))^[^ ]+$/, message: "Password must contain letter, symbol & digit" },
                                        onChange: (e) => setPassword(e.target.value),
                                        value: password
                                    }
                                )}
                                className="w-full py-2 px-4"
                                required />
                            <label className="mb-2 text-gray-500" htmlFor="password">Password</label>
                        </div>
                        <p className="text-red-500 text-xs">{errors ? errors.password ? errors.password.message : "" : ""}</p>
                    </div>

                    <div className="button-container w-full mt-5 flex flex-col gap-2">
                        <div className="signin-btn">
                            <button type="submit" className="px-5 py-[12px] border-gray-700 border-solid border-2 hover:bg-gray-700 hover:text-gray-200 transition duration-300 rounded w-full">Sign In</button>

                        </div>
                        <div className="google-signin">
                            <button onClick={handleGoogleAuth} className="signinwithgoogle-btn flex justify-center items-center px-5 py-[5px] border-blue-500 border-solid border-2 hover:bg-blue-500 hover:text-gray-100 text-blue-500 transition duration-300 rounded w-full">
                                <Image className=" h-10 w-10 bg-cover mr-3 rounded-3xl" src="/googleLogo.png" alt="google logo" width="50" height="50" />
                                <span className="text">
                                    Continue with Google
                                </span>
                            </button>
                            <div className="signin mt-5">
                                <p>Not registered yet? <Link className="hover:underline text-blue-600" href="/auth/signup">Sign up</Link></p>
                            </div>
                        </div>

                    </div>
                </form>
            </div >
        )
    } else {
        if (user.emailVerified) {
            router.push("/dashboard")
        } else {
            router.push("/auth/verify_email")
        }


    }

}

export default Signin
