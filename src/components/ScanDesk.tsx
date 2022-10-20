import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useZxing } from "react-zxing";


const ScanDesk = (props: any) => {

  const { 
    // errorHandle, 
    successHandle
   } = props
  const [showCamera, setShowCamera] = useState(true)

  // const previewStyle = {
  //   height: 240,
  //   width: 320,
  //   border: '1px solid red'
  // }

  const { ref } = useZxing({
    onResult(result:any) {
      setShowCamera(false)
    successHandle(result)
    },
  });

  const QrReadComp = () => {
//@ts-ignore
    return (
      <>
       <video ref={ref} />
      </>
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