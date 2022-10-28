import React, { useEffect, useState } from 'react'
import { Navigate} from 'react-router-dom'
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

  const deskState = useAppSelector(desk)
  const dispatch = useAppDispatch()
  const [scanDesk, setScanDesk] = useState(false)
  const [deskId, setDeskId ] = useState(null)
  const [validCode, setValidCode] = useState(false)

  const activateScan = () => {
    return scanDesk === true && validCode === false
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
        <button 
        className="group relative mx-auto 
        lex mt-5 mb-5 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {
            console.log("scan desk clicked", activateScan())

            setScanDesk(!scanDesk)
          }}
        >
         SCAN QRCODE TO START USING DESK
        </button>
      }
     
      {activateScan() &&
        <>
          <p>Scan the Qr Code on your desk to begin</p>
          <ScanDesk successHandle={handleScan} errorHandle={handleError} />
        </>
      }
      {/* {deskState?.desk?.password && */}
      {
       deskId && !_.isEmpty(deskState?.device) &&
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
