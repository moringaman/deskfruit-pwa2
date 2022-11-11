import { FooterButton } from './ui/FooterButton'
import { ChevronUp, ChevronDown, User, LogOut, Settings } from 'react-feather'
import { uiConfig } from '../config'
import { logout } from '../features/auth/authenticationSlice'
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks'
import {
  deskCleared,
} from '../features/desk/deskSlice'

export default function Footer() {

  const location = useLocation()
  const showFooter = uiConfig.hasFooterMenu.includes(location.pathname.substring(1))
  const dispatch = useAppDispatch()


  const Logout = () => {
    console.log("Logging Out")
    dispatch(deskCleared())
    dispatch(logout())
  }

  const RenderedCode = () => {
    return (
      <div id="footer" className="p-4 bg-white min-w-full h-14 fixed bottom-0 rounded-t-xl">
        <div className="px-6 flex direction-column justify-between align-center">
          <FooterButton callBack={Logout}>
            <LogOut size={24} color="orange" />
          </FooterButton>
          <User size={24} color="orange" />
          <Settings size={24} color="orange" />
          <ChevronUp size={24} color="orange"/>
          <ChevronDown size={24} color="orange" />
        </div>
      </div>
    )
  }


  return (
    <>
      {
        showFooter && <RenderedCode />
      }
    </>
  )
}
