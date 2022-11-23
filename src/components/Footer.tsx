import { useEffect } from 'react'
import _ from 'lodash'
import { FooterButton } from './ui/FooterButton'
import { ChevronUp, ChevronDown, User, LogOut, Settings } from 'react-feather'
import { uiConfig } from '../config'
import { logout } from '../features/auth/authenticationSlice'
import { useLocation, Navigate } from 'react-router-dom';
import { useAppDispatch, useLocalStorage } from '../app/hooks'
import {
  getDeskAsync,
  getDeviceAsync,
  deskCleared,
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
    } else {
      // no user info in local storage redirect
      console.log("No user Info found in local storage, redirecting", userInfo)
      redirect()
    }
  }, [])

  const RenderedCode = () => {
    return (
      <div id="footer" className="p-4 bg-white min-w-full h-14 fixed bottom-0 rounded-t-xl">
        <div className="px-6 flex direction-column justify-between align-center">
          <FooterButton callBack={Logout}>
            <LogOut size={24} color="orange" />
          </FooterButton>
          <User size={24} color="orange" />
          <Settings size={24} color="orange" />
          <ChevronUp size={24} color="orange" />
          <ChevronDown size={24} color="orange" />
        </div>
      </div>
    )
  }

  const Copywrite = () => {
    return (
      <div className="w-full h-12 mx-auto flex justify-center fixed bottom-0 p-4 ">
        <p className="text-white">Copywrite &copy; 2022 deskfruit Ltd</p>
      </div>
    )
  }


  return (
    <>
      {
        showFooter ? <RenderedCode /> : <Copywrite />
      }
    </>
  )
}
