
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
import Schedule from '../components/Scheduler'
import { useAppDispatch } from '../app/hooks'
import { updateEnabledUser, updateDeskAsync } from '../features/desk/deskSlice'
import StandardButton from '../components/ui/StandardButton'
import { getUserList } from '../lib/helpers'
import moment from 'moment'

const ProfilePage = () => {

  const deskState = useSelector(desk)
  const { online } = deskState.device
  const { deskId, enabled, currentUser } = deskState.desk
  const [users, setUsers] = useState<User[] | undefined>(deskState?.desk.users)
  const [editMode, setEditMode] = useState(false)
  const { loggedIn } = useAuthRedirect()
  const dispatch = useAppDispatch()

  const currentUserData = users?.find(user => user._id === currentUser)



  const enableUser = (e: any, id: string) => {
    console.log("Event ?", e)
    e.stopPropagation()

    if (users === undefined) return
    const updated = getUserList(id, users, 'lastUsage', Date())
    console.log("UPDATES ", updated)
    if (id === '00000000000') return
    if (id === enabled) {
      dispatch(updateEnabledUser({ id: '0', deskId }))
      return
    }
    dispatch(updateEnabledUser({ id, deskId, users: updated }))
    console.log("UPDATES ", updated)
    // }  
  }

  const saveExpression = (id: string, expression: string): void => {
    if (users === undefined) return
    const updated = getUserList(id, users, 'expression', expression)
    console.log("UPDATES ", updated)
    if (id === '00000000000') return
    //TODO: Check if enabled is same as currentUser
    // if (id === enabled) {
      // dispatch(updateEnabledUser({ id: '0', deskId}))
      dispatch(updateDeskAsync({ update: { users: updated }, deskId, }))
      setEditMode(false)
      return
    // }
    // }  
  }

  const selectCurrentUser = (e: any, id: string): void => {
    e.stopPropagation()
    console.log("updating current user ", users)


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
            handleChange={!editMode ? enableUser : () => {}}
            handleClick={!editMode ? selectCurrentUser : () => {}}
            key={i} />
        ))
        }
      </>
    )
  }

  const toggleMode = () => {
    editMode ? setEditMode(false) : setEditMode(true)
  }

  useMemo(() => {
    setUsers(deskState?.desk.users)
  }, [deskState])

  console.log('Logged in', loggedIn)
  console.log('Users', users)
  console.log('Status', deskState?.status, 'Online ', online)
  console.log("USER DATA", currentUserData)
  return (
    <>
      {!loggedIn &&
        <Navigate to="/" replace={true} />
      }
      <div className="flex-col absolute top-10 left-20 text-xs">
        <div className="flex flex-row">
          <p>Device Status: </p>
          {online ?
            <div className="flex flex-row items-center ml-2 text-gray">
              <p>Online</p>
              <div className="bg-green rounded-full h-3 w-3 ml-2"></div>
            </div> :
            <div className="flex flex-row items-center ml-2">
              <p>Offline</p>
              <div className="bg-red rounded-full h-3 w-3 ml-2"></div>
            </div>
          }
        </div>
        <div>
          <p>Active User:</p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-green -translate-x-[40%] mt-5" ></div>
      <div className="flex w-full h-52 justify-start overflow-scroll -mt-1 mb-6 pl-20">
        {users &&
          <UserList />
        }
      </div>
      <div className="-translate-y-8">
        <div className="flex h-auto p-2 w-100 mx-2 mt-20">
          {!editMode ?
            <>
              <div className=" max-w-full h-[34px] px-6 -mt-4 flex flex-col leading-tight">
                <p className="text-md font-medium mb-6">
                  Desk Settings
                </p>
                <p className="text-sm font-medium">
                  User:  <span className="font-light"> {currentUserData?.name}</span>
                </p>
                <p className="text-sm font-medium">
                  Seated Height:  <span className="font-light"> {currentUserData?.seatedHeight} cm</span>
                </p>
                <p className="text-sm font-medium">
                  Standing Height:  <span className="font-light"> {currentUserData?.standingHeight} cm</span>
                </p>
                <p className="text-sm font-medium">
                  Last Active: <span className="font-light"> {moment(currentUserData?.lastUsage).fromNow()}</span>
                </p>
              </div>
              <div className="absolute right-6 top-[180px]">
                <StandardButton text='Edit Config' action={() => toggleMode()} />
              </div>
            </>
            : <><Schedule user={currentUserData} switchMode={toggleMode}
              saveExpression={saveExpression} setEditMode={setEditMode}
            /></>}

        </div>

      </div>



    </>
  )
}

export default ProfilePage