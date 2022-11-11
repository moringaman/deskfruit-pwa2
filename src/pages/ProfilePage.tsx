
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuthRedirect, useAppDispatch } from '../app/hooks'
import { Navigate } from 'react-router-dom'
import { logout } from '../features/auth/authenticationSlice'

import {
  // deskAdded,
  getDeskAsync,
  getDeviceAsync,
  desk, 
  deskCleared,
  User
  // Desk,
} from '../features/desk/deskSlice'
import { useEffect } from 'react'
import { Plus } from 'react-feather'
const ProfilePage = () => {

  useEffect(() => {
    const userInfo: any = localStorage.getItem("user")
    console.log(userInfo)
    const { deskId } = JSON.parse(userInfo);
    dispatch(getDeviceAsync(deskId))
    dispatch(getDeskAsync(deskId))
  }, [])

  const deskState = useSelector(desk)

  const [ Users, setUsers ] = useState<User[] | undefined>(deskState?.desk.users)

  const dispatch = useAppDispatch()
  const { loggedIn } = useAuthRedirect()
console.log('Logged in', loggedIn)
  return (
    <>
      {!loggedIn &&
        <Navigate to="/" replace={true} />
      }
      <div className="flex w-full h-60 justify-start overflow-scroll mt-10 pl-20">
        {Users && Users.length < 1 && <div className="h-40 mx-8 rounded-2xl min-w-[180px] border-white border-4 border-dashed flex justify-center items-center drop-shadow-xl"><Plus color="orange" size={68}/></div>}
        <div className="h-40 mx-8 rounded-2xl min-w-[180px] bg-white opacity-75 hover:opacity-100 hover:border-orange-300 hover:border-4 flex drop-shadow-xl">slide</div>
        <div className="h-40 mx-8 rounded-2xl min-w-[180px] bg-white opacity-75 hover:opacity-100 hover:border-orange-300 hover:border-4 flex drop-shadow-xl">slide</div>
      </div>
      {/* <div className="h-72 min-w-100 bg-white/[0.15] border-t-4 border-b-4 border-orange-300 -mt-5">
        stats */}
      {/* </div> */}
      <button
        className="mx-auto flex mt-2 mb-5 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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