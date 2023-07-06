import React from 'react';
import Image from "next/image"
import Link from 'next/link';


const Logo = ({ hideName }) => {
    return (
        <div>
            <Link href="/">
                <div className="image flex  items-center brightness-">
                    <Image className="" alt="Taskflow logo" src="/logo.png" width={80} height={100} />
                    {
                        hideName || (

                            <h1 className="font-bold  text-indigo-500 text-3xl cursor-none pointer-events-none">Taskflow</h1>
                        )

                    }
                </div>
            </Link>
        </div>
    )
}

export default Logo
