
import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAuthRedirect } from '../app/hooks'
import { Navigate } from 'react-router-dom'
import {
  // deskAdded,
  desk,
  User
  // Desk,
} from '../features/desk/deskSlice'
import UserCard from '../components/UserCard'
import { useAppDispatch } from '../app/hooks'
import { updateEnabledUser, updateDeskAsync } from '../features/desk/deskSlice'

const ProfilePage = () => {

  const deskState = useSelector(desk)
  const { deskId, enabled, currentUser } = deskState.desk
  const [users, setUsers] = useState<User[] | undefined>(deskState?.desk.users)
  const { loggedIn } = useAuthRedirect()
  const dispatch = useAppDispatch()

  const currentUserData = users?.find(user => user._id === currentUser)

  const enableUser = (e: any, id: string) => {
    console.log("Event ?", e)
    e.stopPropagation()
    if (id === '00000000000') return
    if (id === enabled) {
      dispatch(updateEnabledUser({ id: '0', deskId }))
      return
    }
    dispatch(updateEnabledUser({ id, deskId }))
  }

  const selectCurrentUser = (e: any, id: string): void => {
    e.stopPropagation()
    console.log("updating current user ")
    dispatch(updateDeskAsync({ update: { currentUser: id }, deskId }))
  }

  const UserList = () => {
    console.log("users in userlist ", users)
    return (
      <>
        {users && users.map((item, i) => (
          <UserCard
            currentUser={currentUser}
            users={users}
            loading={deskState.status === 'loading'}
            user={item}
            selected={deskState?.desk?.enabled === item._id}
            handleChange={enableUser}
            handleClick={selectCurrentUser}
            key={i} />
        ))
        }
      </>
    )
  }

  useMemo(() => {
    setUsers(deskState?.desk.users)
  }, [deskState])

  console.log('Logged in', loggedIn)
  console.log('Users', users)
  console.log('Status', deskState.status)
  console.log("USER DATA", currentUserData)
  return (
    <>
      {!loggedIn &&
        <Navigate to="/" replace={true} />
      }
      <h1 className="text-2xl mx-10 text-white tracking-wide">USERS</h1>
      <div className="flex w-full h-52 justify-start overflow-scroll mt-8 pl-20">
        {users &&
          <UserList />
        }
      </div>
      <div className=" max-w-[160px] h-[34px] translate-x-10 -translate-y-[20px]">
        <p className="text-md font-medium">
          SETTINGS
          </p>
        </div>
      <div className="-translate-y-8">
      <div className="flex h-auto p-2 w-100 mx-2">
        <div className=' bg-gradient-top-sandy rounded-xl p-5 drop-shadow-xl flex flex-col ml-40 mt-5 mx-10 h-200 justify-center align-content-center overflow-hidden'>
          <div className="h-[130px] flex flex-row items-center content-around">
            <p className="text-sm text-white flex-none">Seated Height:</p>
            <p className="text-sm text-white flex-none"> {currentUserData && currentUserData?.seatedHeight}</p>
          </div>
          <p className="text-sm">Standing Height {currentUserData && currentUserData?.standingHeight}</p>
        </div>
      </div>
      
      </div>
    


    </>
  )
}

export default ProfilePage