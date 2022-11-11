import React from 'react'

export const FooterButton = ({callBack, children}:any) => {
  return (
  <>
  <button onClick={callBack}>
    {children}
  </button>
  </>
  )
}
