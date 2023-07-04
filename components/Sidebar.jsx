"use client"

import React, { useState } from 'react'
import Logo from './Logo'
import SidebarItem from './SidebarItem';
import { LuLayoutDashboard, LuSalad } from "react-icons/lu"
import { BiTask } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { CgGym } from "react-icons/cg"
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();
    const path = pathname.slice(1);
    return (
        <div className='w-fit bg-[#6200ee] text-gray-100 text-lg font-semibold h-screen p-10'>
            <div className="logo invert brightness-0 mb-10">
                <Logo />
                <div className="tagline ">
                    <p className="font-semibold text-xs text-gray-500">Streamline Your Workflow for Success</p>
                </div>
            </div>
            <div className="links mt-5">
                <SidebarItem path={path} icon={<LuLayoutDashboard />} text="dashboard" />
                <SidebarItem path={path} icon={<BiTask />} text="tasks" />
                <SidebarItem path={path} icon={<RiMoneyDollarCircleLine />} text="finance" />
                <SidebarItem path={path} icon={<LuSalad />} text="diet" />
                <SidebarItem path={path} icon={<CgGym />} text="workout" />

            </div>
        </div>
    )
}

export default Sidebar
