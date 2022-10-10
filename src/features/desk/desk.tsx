import React, { useEffect, useState } from 'react'
import {
  useAppSelector,
  // useAppDispatch 
} from '../../app/hooks'
import {
  // deskAdded,
  // todoToggled,
  //getDeskAsync,
  desk,
  // Desk,
} from './deskSlice'
import ScanDesk from '../../components/ScanDesk'


const IDesk = () => {

  const deskState = useAppSelector(desk)
  // const dispatch = useAppDispatch()
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
    //TODO: Call api to check for desk call getDeskAsync
    // 1. desk found, provide login screen
    // 2. not found, register desk
    console.log(data)
    return
  }
  const handleError: any = (err: any): any => {
    console.error(err)
  }

  return (
    <>
      <button className="group relative flex mt-5 mb-5 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setScanDesk(!scanDesk)}
      >
        START USING DESK
      </button>
      {scanDesk &&
        <>
          <p>Scan the Qr Code on your desk to begin</p>
          <ScanDesk successHandle={handleScan} errorHandle={handleError} />
        </>
      }
      <p>{JSON.stringify(deskState)}</p>
      <p>{JSON.stringify(data)}</p>
    </>
  )

}

export default IDesk
