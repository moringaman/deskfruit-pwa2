import React, {memo} from 'react'

export const FooterButton = memo(({color, callBack, children}:any) => {
  console.log("BUTTON COLOR  ", color)
  return (
  <>
  <button className={`drop-shadow-xl p-0`} onClick={callBack}>
    {children}
  </button>
  </>
  )
})
