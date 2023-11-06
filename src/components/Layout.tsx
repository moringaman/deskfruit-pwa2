import { Outlet, useLocation } from 'react-router-dom'
import { Plus } from 'react-feather'
import Footer from './Footer'
import { uiConfig } from '../config'

export default function Layout() {

    const location = useLocation()

    const showNewUserButton = uiConfig.hasAddUserButton.includes(location.pathname.substring(1))
    const showHeader = uiConfig.hasHeader.includes(location.pathname.substring(1))

    return (
        <div className="overflow-y-hidden max-h-screen">
            {showHeader &&
                <div id="header" className="p-10 bg-transparent flex">
                    <div className="ml-10 py-2 pl-16 flex fixed absolute -left-20 top-3 items-center">
                        <img className="h-[40px]" src="logo_sm.svg" alt="X" />
                    </div>
                </div>
            }
            {showNewUserButton &&
                <div className="flex flex-row absolute top-[20px] right-6 items-center">
                    <p className="text-xs w-2 mr-8 leading-tight">Add User</p>
                    <button className="p-3 rounded-full bg-gray drop-shadow-lg flex items-center justify-center">
                        <Plus size={20} color="black" />
                    </button>
                </div>
            }
            <div id="main" className=" bg-transparent flex flex-col tablet:flex-row overflow-hidden">
                {/* <div className="p-4 bg-gray-300 flex hidden tablet:flex h-screen">
                    Sidebar
                </div> */}
                <div className="overflow-y-hidden bg-no-repeat bg-cover bg-top flex-grow min-h-screen w-100">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}
