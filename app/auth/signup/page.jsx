"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { continueWithGoogle, logout, sendEmailVerificationLink, signup, updateProfileData } from "@/lib/firebaseAuth"
import { auth } from "@/lib/firebase"

import { useRouter } from "next/navigation";
import Head from "next/head";

function Signup() {
    const router = useRouter();

    const [fname, setFname] = useState("seb");
    const [lname, setLname] = useState("thapa");
    const [email, setEmail] = useState("thapasebak059@gmail.com");
    const [password, setPassword] = useState("password@123");
    const [cPassword, setCPassword] = useState("password@123");

    const { handleSubmit, register, formState: { errors }, } = useForm();
    const [user, loading, error] = useAuthState(auth)
    // console.log(user)

    const actionCodeSettings = {

    }


    const handleSignup = async (data) => {
        const { email, password, fname, lname } = data;


        try {

            if (await signup(email, password)) {
                await sendEmailVerificationLink();
                await updateProfileData({ displayName: `${fname} ${lname}` })
            }


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
    // }, [user, loading, router])


    if (!user) {
        return (
            <div className="form-container flex  justify-center items-center mt-10  w-screen " >
                <Head>
                    <title>Sign Up - Taskflow</title>
                </Head>
                <form action="" onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-5 bg-[rgba(200,200,255,.1)] dark:bg-gray-700 p-10 rounded-lg w-[550px] border-solid border-gray-300 border-2">
                    <h2 className="text-2xl font-bold mb-3"> Sign Up</h2>
                    <div className="name flex" >

                        <div className="input-field-container flex flex-col mr-4 ">
                            <div>

                                <input
                                    autoComplete="off"
                                    id="fname"
                                    type="text"
                                    {...register(
                                        "fname",
                                        {
                                            maxLength: { value: 15, message: "Enter less than 15 characters" },
                                            minLength: { value: 3, message: "Enter 3 characters or more" },
                                            required: "This field is required",
                                            onChange: (e) => setFname(e.target.value),
                                            value: fname
                                        }
                                    )}
                                    className="w-full py-2 px-4"
                                    required
                                />
                                <label className="mb-2 text-gray-500" htmlFor="fname">First Name</label>
                            </div>
                            <p className="text-red-500 text-xs">{errors ? errors.fname ? errors.fname.message : "" : ""}</p>
                        </div>

                        <div className="input-field-container flex flex-col ">
                            <div>
                                <input
                                    autoComplete="off"
                                    id="lname"
                                    type="text"
                                    {...register(
                                        "lname",
                                        {
                                            maxLength: { value: 15, message: "Enter less than 15 characters" },
                                            minLength: { value: 3, message: "Enter 3 characters or more" },
                                            required: "This field is required",
                                            onChange: (e) => setLname(e.target.value),
                                            value: lname
                                        }
                                    )}
                                    className="w-full py-2 px-4" required />
                                <label className="mb-2 text-gray-500" htmlFor="lname">Last Name</label>
                            </div>
                            <p className="text-red-500 text-xs">{errors ? errors.lname ? errors.lname.message : "" : ""}</p>
                        </div>

                    </div>

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

                    <div className="input-field-container flex flex-col ">
                        <div>
                            <input
                                autoComplete="off"
                                id="confirmPassword"
                                type="password"
                                {...register(
                                    "cPassword",
                                    {
                                        validate: (fieldValue) => { return fieldValue === password || "Passwords didn't match" },
                                        onChange: (e) => setCPassword(e.target.value),
                                        value: cPassword
                                    }
                                )} className="w-full py-2 px-4" required />
                            <label className="mb-2 text-gray-500" htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                        <p className="text-red-500 text-xs">{errors ? errors.cPassword ? errors.cPassword.message : "" : ""}</p>
                    </div>

                    <div className="button-container w-full mt-5 flex flex-col gap-2">
                        <div className="signin-btn">
                            <button type="submit" className="px-5 py-[12px] border-gray-700 border-solid border-2 hover:bg-gray-700 hover:text-gray-200 transition duration-300 rounded w-full">Sign Up</button>

                        </div>
                        <div className="google-signin">
                            <button onClick={handleGoogleAuth} className="signinwithgoogle-btn flex justify-center items-center px-5 py-[5px] border-blue-500 border-solid border-2 hover:bg-blue-500 hover:text-gray-100 text-blue-500 transition duration-300 rounded w-full">
                                <Image className="h-10 w-10 bg-cover mr-3 rounded-3xl" src="/googleLogo.png" alt="google logo" width="50" height="50" />
                                <span className="text">
                                    Continue with Google
                                </span>
                            </button>
                            <div className="signin mt-5">
                                <p>Already registered? <Link className="hover:underline text-blue-600" href="/auth/signin">Sign in</Link></p>
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
            return (
                router.push("/auth/verify_email")
            )
        }


    }

}

export default Signup
