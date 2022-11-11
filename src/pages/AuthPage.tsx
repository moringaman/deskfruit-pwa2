import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { register, login, auth } from '../features/auth/authenticationSlice'
import { desk } from '../features/desk/deskSlice'
import {
  useAppSelector,
  useAppDispatch,
} from '../app/hooks'
import  AuthComponent2 from '../components/AuthComponent2'


const AuthPage = () => {

  const { scanned } = useParams()
  const { isLoggedIn, user } = useAppSelector(auth)
  const deskState = useAppSelector(desk)
  const dispatch = useAppDispatch()
  const [ status, setStatus ] = useState<string | undefined>(undefined)

  useEffect(() => {
    console.log("authentication ", isLoggedIn, user)
    setStatus('complete')
  },[isLoggedIn])

  const handleAuth = (action:string, payload:any) => {
    setStatus("pending")
    console.log('Loggin in', action, payload)
    const {id:deskId, email, password} = payload
    dispatch(action === 'register' ? register({deskId, email, password}) : login({deskId, email, password}))
    //TODO: If registered & desk created Log in user
    if(action === 'register' && deskState.desk.deskId !== "") {
      setTimeout(() => {
        dispatch(login({deskId, email, password}))
      }, 3000)
    }
  }


  return (
    <>
    <div className="p-4">
    {
      isLoggedIn &&
      <Navigate to='/profile' replace={true} />
    }
     <AuthComponent2 scanned={scanned} handleAuth={handleAuth} status={status}/>
    </div>
    </>
  )
}

export default AuthPage