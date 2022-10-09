import React, {useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  deskAdded,
  // todoToggled,
  getDeskAsync,
  desk,
  Desk,
} from './deskSlice'


const IDesk = () => {

const deskState = useAppSelector(desk)
const dispatch = useAppDispatch()
useEffect(() => {
  console.log(deskState)
}, [deskState])

const addDesk = () => {
  const newDesk:Desk = {
    id: 'euidhkadksau001',
    name: 'this is a new todo',
    authenticated: false,
    users: [],
    position: 'down',
    status: 'idle'
  }
  dispatch(deskAdded(newDesk))
}

return (
  <>
    <button className="group relative flex mt-5 mb-5 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    onClick={() => addDesk()}
    >
      ADD DESK
    </button>
    <p>{JSON.stringify(deskState)}</p>
  </>
)

}

export default IDesk
