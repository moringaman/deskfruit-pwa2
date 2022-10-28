import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <div id="header" className="p-10 bg-transparent fg-white flex">
                <h1 className="text-white text-3xl font-bold">
                deskfruit
                </h1>
                </div>
            <div id="main" className="flex flex-col tablet:flex-row flex-grow">
                {/* <div className="p-4 bg-gray-300 flex hidden tablet:flex h-screen">
                    Sidebar
                </div> */}
                <div className="p-4 bg-hero-pattern bg-no-repeat bg-cover bg-top flex-grow min-h-screen">
                    <Outlet />
                </div>
            </div>
            <div id="footer" className="p-4 bg-gray-500 min-w-full">Footer</div>
        </>
    )
}
