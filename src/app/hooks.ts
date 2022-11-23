import {useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { auth } from '../features/auth/authenticationSlice'
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthRedirect = () => {
    const authState = useAppSelector(auth)
    const [loggedIn, setLoggedIn] = useState(authState.isLoggedIn)


    useEffect(() => {
        if(authState.isLoggedIn) {
         setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [authState])


    return {
       loggedIn
    }
}

export const useLocalStorage = (item:string) => {
    try {
        const result: any = localStorage.getItem(item)
        if(result) return JSON.parse(result)
    }catch (err) {
        return {}
    }
}
