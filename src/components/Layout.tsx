import { Outlet } from 'react-router-dom'
import { Plus } from 'react-feather'
import Footer from './Footer'

export default function Layout() {
    return (
        <div className="overflow-y-hidden max-h-screen">
            <div id="header" className="p-10 bg-transparent fg-white flex">
                <div className="bg-white rounded-full w-72 py-2 pl-16 flex fixed absolute -left-20 top-5 items-center">
                    <h1 className="ml-8
                text-orange-400 text-3xl">
                        deskfruit
                    </h1>
                    <img className="ml-3" src="/logo_blue.png" width="40" />
                </div>
            </div>
            <button className="w-16 h-16 rounded-full absolute bg-orange-400 right-4 top-5 flex items-center justify-center">
                <Plus size={30}/>
            </button>
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
