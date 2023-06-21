
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
import ScheduleCalendar from '../components/Calendar'
import Schedule from '../components/Scheduler'
import { useAppDispatch } from '../app/hooks'
import { updateEnabledUser, updateDeskAsync } from '../features/desk/deskSlice'
import StandardButton from '../components/ui/StandardButton'
import { getUserList } from '../lib/helpers'

const ProfilePage = () => {

  const deskState = useSelector(desk)
  const { deskId, enabled, currentUser } = deskState.desk
  const [users, setUsers] = useState<User[] | undefined>(deskState?.desk.users)
  const [ editMode, setEditMode ] = useState(false)
  const { loggedIn } = useAuthRedirect()
  const dispatch = useAppDispatch()

  const currentUserData = users?.find(user => user._id === currentUser)



  const enableUser = (e: any, id: string) => {
    console.log("Event ?", e)
    e.stopPropagation()

       if(users === undefined) return
       const updated = getUserList(id, users, 'lastUsage', Date())
       console.log("UPDATES ", updated)
     if (id === '00000000000') return
     if (id === enabled) {
       dispatch(updateEnabledUser({ id: '0', deskId}))
       return
     }
     dispatch(updateEnabledUser({ id, deskId, users: updated}))
    console.log("UPDATES ", updated)
  // }  
  }

  const saveExpression = (id: string, expression:string):void => {
    if(users === undefined) return
    const updated = getUserList(id, users, 'expression', expression)
    console.log("UPDATES ", updated)
  if (id === '00000000000') return
  if (id === enabled) {
    // dispatch(updateEnabledUser({ id: '0', deskId}))
  dispatch(updateDeskAsync({ update: {users: updated}, deskId,}))
  setEditMode(false)
    return
  }

 
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
            handleChange={enableUser}
            handleClick={selectCurrentUser}
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
  console.log('Status', deskState.status)
  console.log("USER DATA", currentUserData)
  return (
    <>
      {!loggedIn &&
        <Navigate to="/" replace={true} />
      }
      {/* <h1 className="text-2xl mx-10 text-white -mt-4 tracking-wide">USERS</h1> */}
      <div className="flex w-full h-52 justify-start overflow-scroll -mt-1 pl-20">
        {users &&
          <UserList />
        }
      </div>
      <div className=" max-w-[160px] h-[34px] translate-x-10 -translate-y-[30px]">
        <p className="text-md font-medium">
          DESK SETTINGS
          </p>
        </div>
      <div className="-translate-y-8">
      <div className="flex h-auto p-2 w-100 mx-2">
        { !editMode ?
        <>
        <div className="">
  <StandardButton text='Edit Config' action={() => toggleMode()}/>
  </div>
  <div className='border-1 bg-gradient-top-sandy rounded-xl drop-shadow-xl mt-4  max-h-[235px] max-w-full m-r-2 overflow-hidden translate-y-40'>
  {/* <div className="h-[130px] flex flex-row items-center content-around">
    <p className="text-sm text-white flex-none">Seated Height:</p>
    <p className="text-sm text-white flex-none"> {currentUserData && currentUserData?.seatedHeight}</p>
  </div>
  <p className="text-sm">Standing Height {current UserData && currentUserData?.standingHeight}</p> */}
  
 {/* <ScheduleCalendar /> */}
  
</div>
</>
    : <><Schedule user={currentUserData} switchMode={toggleMode} 
    saveExpression={saveExpression}
    /></>    }
      
      </div>
      
      </div>
    


    </>
  )
}

export default ProfilePage