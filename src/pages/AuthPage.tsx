import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { register, login, auth } from '../features/auth/authenticationSlice'
import {
  useAppSelector,
  useAppDispatch,
} from '../app/hooks'
import  AuthComponent2 from '../components/AuthComponent2'


const AuthPage = () => {

  const { scanned } = useParams()
  const { isLoggedIn, user } = useAppSelector(auth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("authentication ", isLoggedIn, user)
  },[isLoggedIn])

  const handleAuth = (action:string, payload:any) => {
    console.log('Loggin in', action, payload)
    const {id:deskId, email, password} = payload
    dispatch(action === 'register' ? register({deskId, email, password}) : login({deskId, email, password}))
  }


  return (
    <>
    {
      isLoggedIn &&
      <Navigate to='/profile' replace={true} />
    }
     <AuthComponent2 scanned={scanned} handleAuth={handleAuth} />
    </>
  )
}

export default AuthPage