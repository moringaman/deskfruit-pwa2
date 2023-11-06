
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAuthRedirect } from '../app/hooks'
import { Navigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  // deskAdded,
  desk,
  enabledUserData,
  User
  // Desk,
} from '../features/desk/deskSlice'
import UserCard from '../components/UserCard'
import UserCardSkeleton from '../components/UserCardSkeleton'
import Schedule from '../components/Scheduler'
import ControlButton from '../components/ui/ControlButton'
import { useAppDispatch } from '../app/hooks'
import { updateEnabledUser, updateDeskAsync, moveDeskAsync } from '../features/desk/deskSlice'
import StandardButton from '../components/ui/StandardButton'
import { getUserList } from '../lib/helpers'
import moment from 'moment'

const StatusSkeleton = () => {
  return (
    <div className="flex flex-row align-around">
      <Skeleton width={60} /><Skeleton width={50} className="ml-2" /><Skeleton className="ml-2" circle width={12} height={12} />
    </div>
  )
}

const ProfilePage = () => {

  const deskState = useSelector(desk)
  const userData = useSelector(enabledUserData)
  const { online } = deskState.device
  const { status, deskMoving } = deskState
  const { deskId, enabled, currentUser, userLoading } = deskState.desk
  const [users, setUsers] = useState<User[] | undefined>(deskState?.desk.users)
  const [editMode, setEditMode] = useState(false)
  const [disableControls, setDisableControls] = useState(false)
  const [deskDirection, setDeskDirection] = useState<string | undefined>(undefined)
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

  const saveExpression = async (id: string, expression: string) => {
    if (users === undefined) return
    const updated = getUserList(id, users, 'expression', expression)
    console.log("UPDATES ", updated)
    if (id === '00000000000') return
    //TODO: Check if enabled is same as currentUser
    // if (id === enabled) {
    // dispatch(updateEnabledUser({ id: '0', deskId}))
    await dispatch(updateDeskAsync({ update: { users: updated }, deskId, }))
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


  const moveDesk = async (direction: any) => {
    console.log("Moving desk ", direction, deskId, deskMoving)

    if (disableControls === true) return
    if (deskMoving) return
    setDisableControls(true)
    setDeskDirection(direction)
    await dispatch(moveDeskAsync({ id: deskId, direction }))
    setTimeout(() => {
      setDisableControls(false)
      setDeskDirection('none')
    }, 12000)

  }

  const UserList = () => {
    console.log("users in userlist ", users, userLoading, userData)
    return (

      <>
        {users && users.map((item, i) => (
          <UserCard
            currentUser={currentUser}
            users={users}
            loading={userLoading === item._id}
            user={item}
            selected={deskState?.desk?.enabled === item._id}
            handleChange={!editMode ? enableUser : () => { }}
            handleClick={!editMode ? selectCurrentUser : () => { }}
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
      <div className="flex-col absolute top-6 left-20 text-xs">
        {online !== undefined ? <div className="flex flex-row">
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
        </div> : <StatusSkeleton />}
        <div>
          <p>Active User: <span className="text-gray">{userData && userData?.name}
          </span></p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-green -translate-x-[40%] mt-0" ></div>
      <div className="flex w-full h-52 justify-start overflow-scroll -mt-1 mb-6 pl-20">
        {currentUserData ?
          <UserList />
          : <UserCardSkeleton cards={2} />
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
                  {currentUserData && 'User:'} <span className="font-light"> {currentUserData?.name || <Skeleton width={150} />} </span>
                </p>
                <p className="text-sm font-medium">
                  {currentUserData && 'Seated Height:'}  <span className="font-light"> {currentUserData?.seatedHeight || <Skeleton width={150} />}</span>
                </p>
                <p className="text-sm font-medium">
                  {currentUserData && 'Standing Height:'}  <span className="font-light"> {currentUserData?.standingHeight || <Skeleton width={150} />}</span>
                </p>
                <p className="text-sm font-medium">
                  {currentUserData && 'Last Active:'} <span className="font-light"> {moment(currentUserData?.lastUsage).fromNow() || <Skeleton width={150} />}</span>
                </p>
              </div>
              <div className="absolute right-6 top-[180px]">
                <StandardButton text='Edit Config' action={() => toggleMode()} />
              </div>
              <div className="flex flex-col items-center justify-between absolute top-[-10px] right-[30px] translate-x-[10%] w-[60px] h-[160px] justify-center p-4 bg-green/[0.1] rounded-xl">
                <div className="">
                  <ControlButton loading={deskDirection === "UP"} cmd="UP" onclick={moveDesk} />
                </div>
                <div className="h-[2px] w-[50px] bg-black"></div>
                <div className="">
                  <ControlButton loading={deskDirection === "DN"} cmd="DN" onclick={moveDesk} />
                </div>
              </div>
              {/* <div className="px-2 text-xs absolute  font-semibold top-[60px] right-[-45px] -translate-x-[20%] text-gray rounded-md rotate-90">CONTROLS</div> */}
            </>
            : <><Schedule loading={status === 'loading'} user={currentUserData} switchMode={toggleMode}
              saveExpression={saveExpression} setEditMode={setEditMode}
            /></>}

        </div>

      </div>



    </>
  )
}

export default ProfilePage