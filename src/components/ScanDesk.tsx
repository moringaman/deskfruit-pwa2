import React, { useState } from 'react'
import { useZxing } from "react-zxing";


const ScanDesk = (props: any) => {

  const { 
    // errorHandle, 
    successHandle
   } = props
  const [showCamera, setShowCamera] = useState(true)

  const { ref } = useZxing({
    onResult(result:any) {
      setShowCamera(false)
    successHandle(result)
    },
  });

  const QrReadComp = () => {
//@ts-ignore
    return (
      <div className="flex mx-auto justify-center w-64 h-60 py-0 mt-3  bg-transparent">
       <div className="z-40 absolute h-12 bg-orange mx-auto my-0">
        <div className="absolute mx-3 mt-2 bg-red-400 h-1 w-56 animate-swipe-down"></div>
        <svg width="250" height="240" viewBox="0 0 244 243" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M6.75 0.25H37V6.25H6.75V35H0.75V6.25V0.25H6.75ZM0.75 208V236.75V242.75H6.75H37V236.75H6.75V208H0.75ZM237.25 208V236.75H210V242.75H237.25H243.25V236.75V208H237.25ZM243.25 35V6.25V0.25H237.25H210V6.25H237.25V35H243.25Z" fill="white"/>
</svg>
          {/* <Maximize color="white" size="250"/> */}
       </div>
       <video ref={ref} />
      </div>
    )
  }

  return (
    <>
    
      {showCamera &&
        <QrReadComp />
      }
    </>
  )
}


export default ScanDesk