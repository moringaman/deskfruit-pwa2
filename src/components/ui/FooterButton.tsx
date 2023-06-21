import React, {memo} from 'react'

export const FooterButton = memo(({color, callBack, children}:any) => {
  console.log("BUTTON COLOR  ", color)
  return (
  <>
  <button className={`bg-goldCrayola rounded-full drop-shadow-xl p-4`} onClick={callBack}>
    {children}
  </button>
  </>
  )
})
