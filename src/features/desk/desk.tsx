import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Camera, ChevronsUp, ChevronsDown } from 'react-feather'
import { useFeatureFlag } from 'configcat-react'
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

  type UserObject = {
    identifier: string
  }

  const [flagUser, setFlagUser] = useState<UserObject | undefined>(undefined)
  useEffect(() => {

    const userObject: UserObject = {
      identifier: Date.now().toString()
    }
    setFlagUser(userObject)
    return () => { }
  }, [])


    const { value: scanButtontext, loading: scanButtontextLoading } = useFeatureFlag("scanButtontext", false, flagUser);
   
    console.log('FeatureCat ', "scanButtontext", scanButtontext, scanButtontextLoading, flagUser)


  const deskState = useAppSelector(desk)
  const dispatch = useAppDispatch()
  const [scanDesk, setScanDesk] = useState(false)
  const [deskId, setDeskId] = useState(null)
  const [validCode, setValidCode] = useState(false)


  const activateScan = () => {
    return (scanDesk === true && validCode === false) || (scanDesk === true && deskState?.desk.deskId === undefined)
  }

  type Data = {
    text?: string
  }

  const [data, setData] = useState<Data | {}>({});

  useEffect(() => {
    if (!_.isEmpty(deskState.device)) return
    if (deskState?.desk.deskId !== undefined && !!deskId) {
      dispatch(getDeviceAsync(deskId))
    }
    console.log('Deskstate ', deskState)
  }, [deskState?.desk.deskId])


  useEffect(() => {
    if (deskState.device.id !== undefined) {
      setValidCode(true)
    }
  }, [deskState?.device])

  // const addDesk = () => {
  //   const newDesk:Desk = {
  //     id: '',
  //     deskId: 'euidhkadksau001',
  //     name: 'super-desk-0001',
  //     password: '',
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

  const checkCodeisValid = (deskId: string) => {
    dispatch(getDeviceAsync(deskId))
  }


  const handleScan: any = async(data: any) => {
    data && setData(data)
    const deskId = data.text.slice('0', data.text.indexOf(' '))
    //check if valid code
    checkCodeisValid(deskId)
    setScanDesk(false)
    setDeskId(data.text.slice('0', data.text.indexOf(' ')))
    //TODO: Call api to check for desk call getDeskAsync
    await dispatch(getDeskAsync(data.text.slice('0', data.text.indexOf(' '))))
    // 1. desk found, provide login screen
    // 2. not found, check if device exists on particle.io
    // 3. if found show registration
    // 4. device not found display error message 
  }

  const handleError: any = (err: any): any => {
    console.error(err)
  }

  return (
    <div className="container mx-auto py-10">
      {!data.hasOwnProperty('text') &&//|| !validCode &&
        <>
        <div className="flex mb-16 px-10 mx-auto justify-center items-center">
          <img src="/word_logo.png" alt="DESKFRUIT" />
        </div>
          <button
            type="button"
            onClick={() => {
              setScanDesk(!scanDesk)
            }}
            className="border-4 border-gray drop-shadow-xl group bg-white mx-auto flex justify-center text-white hover:text-white focus:outline-none font-medium rounded-full text-sm p-8 text-center items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            <Camera color="black" size="32" />
          </button>
          <div className={`mx-auto flex justify-center animate-bounce mt-4 ${scanDesk ? "invisible" : "null" }`}>
            <ChevronsUp color="white" size={42}/>
          </div>
          { !scanDesk ?
          <p className="w-52 mx-auto flex justify-center text-lg text-gray text-center mt-1 leading-tight">{scanButtontext && !scanDesk && "Press the camera button to scan the qrcode on your desk"}</p> :
          <> 
          <p className="w-52 mx-auto flex justify-center text-lg text-center text-gray text-lg mt-1">{scanButtontext && "Point your Camera at the qrcode on your desk to login"}</p> 
          <div className={`mx-auto flex justify-center animate-bounce mt-4 ${!scanDesk ? "invisible" : "null" }`}>
            <ChevronsDown color="white" size={48}/>
          </div>
        </>
          }
        </>
      }

      {activateScan() &&
        <ScanDesk successHandle={handleScan} errorHandle={handleError} />
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
