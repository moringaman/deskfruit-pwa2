import React from 'react'
import { Navigate } from 'react-router-dom'
import {  useAuthRedirect } from '../app/hooks'


const HomePage = () => {

  return(
    <>
    { useAuthRedirect() &&
    <Navigate to="/desk" replace={true} />
    }
    </>
  )
}

export default HomePage
