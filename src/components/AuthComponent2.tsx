
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAppSelector } from '../app/hooks'
import {
  desk,
} from '../features/desk/deskSlice'

const AuthComponent2 = (props:any) => {

    const { scanned, handleAuth } = props

  const deskState = useAppSelector(desk)
  const device = deskState.device
  const deskId = deskState.desk.deskId
  const deviceExists = device.id !== ""
  const deskFound = deskId !== ""
   
   const action = deskFound ? 'login' : 'register'
  
   const [formData, setFormData] = useState({id: scanned, email: '', password: ''})
   const [ emailvalid, setEmailValid ] = useState(false)
   const [ passwordValid, setPasswordValid ] = useState(false)

   const passwdRef = useRef<HTMLInputElement>(null)

   const styles = {
    invalid: formData.password !== "" ? 'bg-red-50 border border-red-500 text-red-900': null,
    valid: 'bg-green-50 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-green-500'
   }

  const handleSubmit = (e:any):void => {
      e.preventDefault()
      handleAuth(action, formData)
  }

  const emailIsValid = (email: string):boolean => {
    const emailCheck = new RegExp(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
    const isValid = emailCheck.test(email) ? true : false
    console.log('email validation', emailIsValid)
    return isValid
  }

  const passwordIsValid = (password:string):boolean => {
    const passwordCheck = 
    new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    console.log("password check ",password, passwordCheck.test(password))
    return passwordCheck.test(password)
  }

  const handleInput = (e:any):void => {
    // validate email & password fields
    // const updateKey = formData.hasOwnProperty(e.target.name)? e.target.value : null
    const key = e.target.name
    const value = e.target.value
    if (key === 'email') {
      setEmailValid(emailIsValid(value))
    } else {
      setPasswordValid(passwordIsValid(value))
    }
      setFormData({
        ...formData,
        [key]: e.target.value//updateKey //e.target.value
      })
  }

useEffect(()=> {
   console.log(formData)
}, [formData])

     return (
    <>
      <div className="container mx-auto">
        {deviceExists &&
          <div className="max-w-xl p-5 mx-auto my-2 bg-white rounded-md shadow-sm">
            <div className="text-center mb-6">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">{!deviceExists ? 'Register' : 'Sign In'}</h1>
              <p className={`${device?.online ? 'text-green-400' : 'text-red-400'} font-bold mb-2`}>
                {deviceExists && device.online === true ? 'Your desk is currently online' : 'Your desk appears to be offline please switch it on'}
              </p>
              <p className="text-gray-400">{device ? 'Enter Your Password to Sign In' : 'Enter your Email & Password to Register'}</p>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2 text-sm text-gray-600"
                  >Desk Id</label
                  >
                  <input
                    type="text"
                    name="name"
                    defaultValue={scanned}
                    placeholder="Desk Id"
                    required
                    disabled
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 text-gray-400 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>
                {
                  !deskFound &&
                  <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600"
                    >Email Address</label
                    >
                    <input
                     onChange={(e)=> handleInput(e)}
                     defaultValue={formData.email}
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring"
                    />
                  </div>
                }
                <div className="mb-6">
                  <label htmlFor="phone" className="text-sm text-gray-600">Password</label>
                  <input
                    ref={passwdRef}
                    onChange={(e)=> handleInput(e)}
                    defaultValue={formData.password}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className={`${passwordValid ? styles.valid : styles.invalid} w-full px-3 py-2 placeholder-gray-300 text-gray-500 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
                  />
                </div>
                <div className="mb-6">
                  <button
                    disabled={!device}
                    type="submit"
                    className="w-full px-2 py-4 text-white bg-black rounded-md  focus:bg-indigo-600 focus:outline-none">
                    {deskFound ? 'Sign In' : 'Register'}
                  </button>
                  <p className="text-gray-400 text-sm mt-2">Forgot your password?, <Link className="text-blue visited:text-purple-600" to="auth/reset/">click here to reset
                  </Link></p>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default AuthComponent2