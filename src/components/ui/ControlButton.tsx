import React from 'react'

const ControlButton = (props: any) => {
    const {loading, cmd } = props
    return (
        <div className="relative">
            <div className={`absolute ${loading ? 'animate-spin -inset-1 bg-gradient-to-r from-green to-black rounded-full blur-xs ' : null} `}></div>
        <button 
           className={`relative w-10 h-10 rounded-full ${loading ? 'ring-2' : 'bg-black text-green ring-2 ring-green/[0.5]'} -ring-offset-4 text-green text-xl font-bold p-1 text-center`}
           onClick={() => props.onclick(cmd)}
           >
         {cmd === 'UP' ?
            <div className={`${loading ? 'text-black text-2xl' : 'text-green/[0.5]'}` }>&#9650;</div>:
            <div className={`${loading ? 'text-black text-2xl' : 'text-green/[0.5]'}`}>&#9660;</div>
        }
        </button>
        </div>
    )
}

export default ControlButton