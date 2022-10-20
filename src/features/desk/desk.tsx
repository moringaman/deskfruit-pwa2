import React, { useEffect, useState } from 'react'
import {
  useAppSelector,
  useAppDispatch
} from '../../app/hooks'
import {
  // deskAdded,
  getDeskAsync,
  desk,
  // Desk,
} from './deskSlice'
import ScanDesk from '../../components/ScanDesk'
import AuthComponent from '../../components/AuthComponent'


const IDesk = () => {

  const deskState = useAppSelector(desk)
  const dispatch = useAppDispatch()
  const [scanDesk, setScanDesk] = useState(false)

  type Data = {
    text?: string
  }

  const [data, setData] = useState<Data | {}>({});

  useEffect(() => {
    console.log(deskState)
  }, [deskState])

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


  const handleScan: any = (data: any): any => {
    data && setData(data)
    setScanDesk(false)
    console.log(data.text.slice('0', data.text.indexOf(' ')))

    //TODO: Call api to check for desk call getDeskAsync
    dispatch(getDeskAsync(data.text.slice('0', data.text.indexOf(' '))))
    // 1. desk found, provide login screen
    // 2. not found, register desk
    return
  }
  const handleError: any = (err: any): any => {
    console.error(err)
  }

  return (
    <div className="container mx-auto">
      { !data.hasOwnProperty('text') &&
        <button className="group relative mx-auto 
        lex mt-5 mb-5 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setScanDesk(!scanDesk)}
        >
          START USING DESK
        </button>
      }
     
      {scanDesk &&
        <>
          <p>Scan the Qr Code on your desk to begin</p>
          <ScanDesk successHandle={handleScan} errorHandle={handleError} />
        </>
      }
      {/* {deskState?.desk?.password && */}
      {data.hasOwnProperty('text') &&
        <>
          <AuthComponent deskID={deskState?.desk?.deskId} />
          {/* <p>
            {deskState?.desk?.deskId}
          </p> */}
        </>
      }
    </div>
  )

}

export default IDesk
