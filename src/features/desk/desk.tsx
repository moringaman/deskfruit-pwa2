import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Camera } from 'react-feather'
import _ from 'lodash'
import {
  useAppSelector,
  useAppDispatch
} from '../../app/hooks'
import {
  // deskAdded,
  getDeskAsync,
  getDeviceAsync,
  desk, 
  // Desk,
} from './deskSlice'
import ScanDesk from '../../components/ScanDesk'


const IDesk = () => {
  const navigate = useNavigate()
  const deskState = useAppSelector(desk)
  const dispatch = useAppDispatch()
  const [scanDesk, setScanDesk] = useState(false)
  const [deskId, setDeskId ] = useState(null)
  const [validCode, setValidCode] = useState(false)

  const activateScan = () => {
    return (scanDesk === true && validCode === false) || (scanDesk === true && deskState?.desk.deskId === undefined)
  } 

  type Data = {
    text?: string
  }

  const [data, setData] = useState<Data | {}>({});

  useEffect(() => {
     if (!_.isEmpty(deskState.device) ) return
    if(deskState?.desk.deskId !== undefined && !!deskId) {
      dispatch(getDeviceAsync(deskId))
    }
    console.log('Deskstate ', deskState)
  }, [deskState?.desk.deskId])


  useEffect(() => {
    if(deskState.device.id !== undefined) {
      setValidCode(true)
    }
  }, [deskState?.device])

  // const addDesk = () => {
  //   const newDesk:Desk = {
  //     id: 'euidhkadksau001',
  //     name: 'super-desk-0001',
  //     authenticated: false,
  //     users: [],
  //     position: 'down',
  //     status: 'idle'
  //   }
  //   dispatch(deskAdded(newDesk))
  // }

  // const handeDeskScan = () => {
  //  addDesk()
  // }

  const checkCodeisValid = (deskId:string)  => {
      dispatch(getDeviceAsync(deskId))
  }


  const handleScan: any = (data: any): any => {
    data && setData(data)
    const deskId = data.text.slice('0', data.text.indexOf(' ')) 
    //check if valid code
    checkCodeisValid(deskId)
    setScanDesk(false)
    setDeskId(data.text.slice('0', data.text.indexOf(' ')))
    //TODO: Call api to check for desk call getDeskAsync
    dispatch(getDeskAsync(data.text.slice('0', data.text.indexOf(' '))))
    // 1. desk found, provide login screen
    // 2. not found, check if device exists at particle.io
    // 3. if found show registration
    // 4. device not found display error message 
    return
  }
  const handleError: any = (err: any): any => {
    console.error(err)
  }

  return (
    <div className="container mx-auto">
      { !data.hasOwnProperty('text') &&//|| !validCode &&
      <>
        <button 
            type="button" 
          onClick={() => {
            setScanDesk(!scanDesk)
          }}
            className="group relative mx-auto flex justify-center text-blue-700 border-2 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-8 text-center items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
            >
            <Camera size="40"/>
      </button>
      </>
      }
     
      {activateScan() && 
        <>
          <p>Scan the Qr Code on your desk to begin</p>
          <ScanDesk successHandle={handleScan} errorHandle={handleError} />
        </>
      }
      {/* {deskState?.desk?.password && */}
      {
       deskId &&
        !_.isEmpty(deskState?.device) &&
        <>
        <Navigate to={`/auth/${deskId}`} />
        </>
         }   
         {

      deskId && _.isEmpty(deskState?.device) &&
        <>
        <p className="text-white">The Qr code you scanned was not deskfruit</p>
        </>
         }
    </div>
  )

}

export default IDesk
