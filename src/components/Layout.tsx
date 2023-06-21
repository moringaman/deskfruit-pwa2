import { Outlet, useLocation } from 'react-router-dom'
import { Plus } from 'react-feather'
import Footer from './Footer'
import { uiConfig } from '../config'

export default function Layout() {

    const location = useLocation()

  const showNewUserButton = uiConfig.hasAddUserButton.includes(location.pathname.substring(1))

    return (
        <div className="overflow-y-hidden max-h-screen">
            <div id="header" className="p-10 bg-green flex">
                <div className="w-72 py-2 pl-16 flex fixed absolute -left-20 top-3 items-center">
                    <h1 className="ml-8
                text-honeydew text-xl">
                        DESKFRUIT
                    </h1>
                    {/* <img className="ml-3" src="/logo_blue.png" width="40" /> */}
                </div>
            </div>
            { showNewUserButton &&
            <button className="w-28 h-8 rounded-full absolute bg-goldCrayola drop-shadow-lg right-4 top-4 flex items-center justify-center">
                <p className="text-nickel text-xs font-bold mx-2">
                ADD USER 
                    </p><Plus size={20} color="white"/>
            </button>
            }
            <div id="main" className=" bg-gradient-top-green flex flex-col tablet:flex-row overflow-hidden">
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
