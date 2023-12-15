
import _ from 'lodash'
import WebSocketComponent from './WebSocketComponent'
import { FooterButton } from './ui/FooterButton'
import { ChevronUp, ChevronDown, User, LogOut, Settings } from 'react-feather'
import { uiConfig } from '../config'
import { logout } from '../features/auth/authenticationSlice'
import { useLocation, Navigate } from 'react-router-dom';
import { useAppDispatch, useLocalStorage } from '../app/hooks'
import { useEffect } from 'react'
import {
  getDeskAsync,
  getDeviceAsync,
  deskCleared,
  getDeskPosition,
} from '../features/desk/deskSlice'

export default function Footer() {

  const location = useLocation()
  const showFooter = uiConfig.hasFooterMenu.includes(location.pathname.substring(1))
  const dispatch = useAppDispatch()
  const userInfo: any = useLocalStorage("user") //localStorage.getItem("user")

  const redirect = () => {
      return (
        <Navigate to="/" replace={true} />
      )
  }

  if(_.isEmpty(userInfo)) {
    redirect()
  }
  const { deskId } = userInfo || '' //JSON.parse(userInfo);

  console.log("show footer ", showFooter)
  const Logout = () => {
    console.log("Logging Out")
    dispatch(deskCleared())
    dispatch(logout())
  }

  useEffect(() => {
      // const userInfo: any = useLocalStorage("user") //localStorage.getItem("user")
    if (!_.isEmpty(userInfo)) {
      console.log(userInfo)
      const { deskId } = userInfo //JSON.parse(userInfo);
      dispatch(getDeviceAsync(deskId))
      dispatch(getDeskAsync(deskId))
      dispatch(getDeskPosition(deskId))
    } else {
      // no user info in local storage redirect
      console.log("No user Info found in local storage, redirecting", userInfo)
      redirect()
    }
  }, [dispatch, userInfo])

  const RenderedCode = () => {
    return (
      <div id="footer" className="p-4 min-w-full h-14 fixed bottom-0 rounded-t-xl">
        <div className="px-6 flex direction-column justify-between align-center">
          <FooterButton callBack={Logout} color="nickel">
            <LogOut size={20} color="white" />
          </FooterButton>
          <User size={24} color="white" />
          <Settings size={24} color="white" />
          <ChevronUp size={24} color="white" />
          <ChevronDown size={24} color="white" />
        </div>
      </div>
    )
  }

  const Copywrite = () => {
    return (
      <div className="w-full h-12 mx-auto flex justify-center fixed bottom-0 p-4 ">
        <p className="text-gray text-xs">Copywrite &copy; 2022 deskfruit Ltd</p>
      </div>
    )
  }


  return (
    <>
      {
        showFooter ? <><RenderedCode />
        {deskId && <WebSocketComponent deskId={deskId} />}
        </> : <Copywrite />
      }
    </>
  )
}
