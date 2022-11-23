import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'
import { register, login, auth } from '../features/auth/authenticationSlice'
import {
  desk,
  getDeskAsync,
  getDeviceAsync,
} from '../features/desk/deskSlice'
import { messages } from '../features/messages/messageSlice'
import {
  useAppSelector,
  useAppDispatch,
} from '../app/hooks'
import AuthComponent2 from '../components/AuthComponent2'


const AuthPage = () => {
  console.log(useParams())
  const { scanned } = useParams()
  const { isLoggedIn, user } = useAppSelector(auth)
  const deskState = useAppSelector(desk)
  const message = useSelector(messages)
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState<string | undefined>(undefined)

  useEffect(() => {
    console.log("authentication ", isLoggedIn, user, "messages ", JSON.stringify(message))
    if (isLoggedIn) {
      setStatus('complete')
    } else {
      setStatus("rejected")
    }
  }, [isLoggedIn])

  useEffect(() => {
    setStatus(JSON.stringify(message))
    console.log(message)
  }, [message])

  useEffect(() => {
    if (scanned) {
      dispatch(getDeviceAsync(scanned))
      dispatch(getDeskAsync(scanned))
    }
  }, [])

  const handleAuth = async(action: string, payload: any) => {
    setStatus(JSON.stringify({ message: "pending" }))
    console.log('Loggin in', action, payload)
    const { id: deskId, email, password } = payload
    await dispatch(action === 'register' ? register({ deskId, email, password }) : login({ deskId, email, password }))
    //TODO: If registered & desk created Log in user
    if (action === 'register' && deskState.desk.deskId !== "") {
      // setTimeout(() => {
      await dispatch(login({ deskId, email, password }))
      // }, 3000)
    }
  }


  return (
    <>
      <div className="p-4">
        {
          isLoggedIn === true &&
          <Navigate to='/profile' replace={true} />
        }
        <AuthComponent2 scanned={scanned} handleAuth={handleAuth} status={status} />
      </div>
    </>
  )
}

export default AuthPage