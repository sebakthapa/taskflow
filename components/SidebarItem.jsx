import Link from 'next/link'
import React from 'react'

const SidebarItem = ({ icon, text, path }) => {
    const isActive = path.toLowerCase() === text.toLowerCase();
    return (
        <div className={`sidebarItem cursor-pointeR ${isActive ? "pointer-events-none" : "opacity-90"}`}>
        <Link href={`/${text.toLowerCase()}`} >
            <div className={`flex justify-start items-center p-3  gap-2 mb-2 `} >
                {isActive && (
                    <div className="w-[5px] h-12 bg-gray-100 color-gray-100 rounded-r mr-1">
                        
                    </div>
                )
                }
                <div className="icon">
                    {icon}
                </div>
                <div className="text capitalize">
                    {text}
                </div>
            </div>
            </Link>
            </div>
    )
}

export default SidebarItem
