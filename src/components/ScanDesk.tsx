import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { QrReader } from 'react-qr-reader';


const ScanDesk = (props: any) => {

  const { errorHandle, successHandle } = props
  const [showCamera, setShowCamera] = useState(true)

  const previewStyle = {
    height: 240,
    width: 320,
    border: '1px solid red'
  }

  const QrReadComp = () => {

    return (
      <>
        <QrReader
          //@ts-ignore
          facingMode='environment'
          delay={300}
          style={previewStyle}
          onResult={(result, error) => {
            if (!!result) {
              setShowCamera(false)
              successHandle(result)

            }

            if (!!error) {
              errorHandle(error)
            }
          }}
        />
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

// ScanDesk.propTypes = {
//   errorHandle: () => { },
//   successHandle: () => { }
// }

export default ScanDesk