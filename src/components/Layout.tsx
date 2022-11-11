import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
    return (
        <div className="overflow-y-hidden max-h-screen">
            <div id="header" className="p-10 bg-transparent fg-white flex">
                <div className="bg-white rounded-full w-72 py-3 pl-16 fixed absolute -left-20 top-5">
                <h1 className="ml-10
                text-blue text-3xl font-bold">
                deskfruit
                </h1>
                </div>
                </div>
            <div id="main" className="flex flex-col tablet:flex-row overflow-hidden">
                {/* <div className="p-4 bg-gray-300 flex hidden tablet:flex h-screen">
                    Sidebar
                </div> */}
                <div className="overflow-y-hidden bg-hero-pattern bg-no-repeat bg-cover bg-top flex-grow min-h-screen w-100">
                    <Outlet />
                </div>
            </div>
                <Footer />
        </div>
    )
}
