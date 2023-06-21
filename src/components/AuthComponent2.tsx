
import { Link } from 'react-router-dom'

import _ from 'lodash'
import { useState, useEffect, useRef } from 'react'
import { useAppSelector } from '../app/hooks'
import {
  desk,
} from '../features/desk/deskSlice'

const AuthComponent2 = (props: any) => {

  const { scanned, handleAuth, status } = props

  const deskState = useAppSelector(desk)
  const device = deskState.device
  // const deskId = deskState.desk.deskId
  const deviceExists = device.id !== ""
  const deviceOnline = device.online === true
  const deskFound = !_.isEmpty(deskState.desk)
  const [statusType, setStatusType ] = useState("string")
  const action = deskFound ? 'login' : 'register'

  const [formData, setFormData] = useState({ id: scanned, email: '', password: '' })
  const [emailvalid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)

  const passwdRef = useRef<HTMLInputElement>(null)

  const styles = {
    invalid: formData.password !== "" ? 'bg-red-50 border border-red-500 text-red-900' : null,
    valid: 'bg-green-50 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-green-500'
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault()
    handleAuth(action, formData)
  }

  const emailIsValid = (email: string): boolean => {
    const emailCheck = new RegExp(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
    const isValid = emailCheck.test(email) ? true : false
    console.log('email validation', emailIsValid)
    return isValid
  }

  const passwordIsValid = (password: string): boolean => {
    const passwordCheck =
      new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    console.log("password check ", password, passwordCheck.test(password))
    return passwordCheck.test(password)
  }

  const handleInput = (e: any): void => {
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

  useEffect(() => {
    try {
      JSON.parse(status)
      setStatusType("json")
    console.log("status ", JSON.parse(status))
    }catch(err) {
      setStatusType("string")
    }
  }, [status])

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <>
      <div className="container mx-auto">
        {deviceExists &&
          <div className="max-w-xl p-10 mx-auto my-5 bg-transparent rounded-md shadow-sm">
            <div className="text-center mb-6">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">{!deskFound ? 'Register' : 'Sign In'}</h1>
              <p className={`${deviceOnline ? 'text-green-400' : 'text-red-400'} font-bold mb-2`}>
                {deviceExists && deviceOnline ? 'Your desk is currently online' : 'Your desk appears to be offline please switch it on'}
              </p>
              <p className="text-white text-lg font-bold mt-5">{deskFound ? 'Enter Your Password to Sign In' : 'Enter your Email & Password to Register your new desk'}</p>
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
                    className="w-full px-3 py-2 placeholder-white border-gray-300 text-white rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>
                {
                  !deskFound &&
                  <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600"
                    >Email Address</label
                    >
                    <input
                      onChange={(e) => handleInput(e)}
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
                    onChange={(e) => handleInput(e)}
                    defaultValue={formData.password}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className={`${passwordValid ? styles.valid : styles.invalid} w-full px-3 py-2 placeholder-gray-300 text-gray-500 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
                  />
                  {(statusType === "json" && JSON.parse(status).message === "Forbidden") && 
                  <p className="text-red-400">
                    Incorrect Password provided
                  </p>
                  }
                </div>
                <div className="mb-6">
                  <button
                    disabled={status === "pending"}
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-2 py-4 text-white bg-cadet rounded-md  focus:bg-indigo-600 focus:outline-none">
                    {status === 'pending' &&
                      <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                    }
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