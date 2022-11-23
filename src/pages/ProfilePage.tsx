
import { useEffect, useState } from 'react'
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

  const enableUser = (e:any, id: string) => {
    console.log("Event ?", e)
    e.stopPropagation()
    if (id === '00000000000') return
    if (id === enabled) {
      dispatch(updateEnabledUser({ id: '0', deskId }))
      return
    }
    dispatch(updateEnabledUser({ id, deskId }))
  }

  const selectCurrentUser = (e:any, id: string):void => {
    e.stopPropagation()
    console.log("updating current user ")
    dispatch(updateDeskAsync({update:{ currentUser: id }, deskId}))
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

  useEffect(() => {
    setUsers(deskState?.desk.users)
  }, [deskState])

  console.log('Logged in', loggedIn)
  console.log('Users', users)
  console.log('Status', deskState.status)
  return (
    <>
      {!loggedIn &&
        <Navigate to="/" replace={true} />
      }
      <h1 className="text-2xl font-bold mx-10 mt-6 text-white">Desk users</h1>
      <div className="flex w-full h-52 justify-start overflow-scroll mt-8 pl-20">
        {users &&
          <UserList />
        }
      </div>
    </>
  )
}

export default ProfilePage