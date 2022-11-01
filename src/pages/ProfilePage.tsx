
import { useAuthRedirect, useAppDispatch } from '../app/hooks'
import { Navigate } from 'react-router-dom'
import { logout } from '../features/auth/authenticationSlice'

import {
  // deskAdded,
  getDeskAsync,
  getDeviceAsync,
  // desk, 
  deskCleared
  // Desk,
} from '../features/desk/deskSlice'
import { useEffect } from 'react'
const ProfilePage = () => {

    useEffect(() => {
const userInfo:any= localStorage.getItem("user")
    console.log(userInfo)
      const { deskId} = JSON.parse(userInfo);
      dispatch(getDeviceAsync(deskId))
      dispatch(getDeskAsync(deskId))
    }, [])

    const dispatch = useAppDispatch()
    const {loggedIn} = useAuthRedirect()
    console.log('Logged in', loggedIn)
    return (
        <>
        { !loggedIn && 
        <Navigate to="/" replace={true} />
        }
        <p>Welcome to the profile page you are logged in</p>
        <button 
        className="mx-auto flex mt-5 mb-5 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {
            console.log("Sign Out")
            dispatch(deskCleared())
            dispatch(logout())
          }}
        >
        Sign Out
        </button>
        </>
    )
}

export default ProfilePage