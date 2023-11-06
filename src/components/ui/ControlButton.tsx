import React from 'react'

const ControlButton = (props: any) => {
    const {loading, cmd } = props
    return (
        <div className="relative">
            <div className={`absolute ${loading ? 'animate-spin -inset-0.5 bg-gradient-to-r from-green to-black rounded-full mx-6 blur ' : null} `}></div>
        <button 
           className={`relative w-10 h-10 rounded-full ${loading ? 'bg-green text-green animate-bounce' : 'bg-transparent '} ring-2 ring-green -ring-offset-4 text-green text-xl font-bold p-1 text-center overflow-hidden`}
           onClick={() => props.onclick(cmd)}
           >
         {cmd === 'UP' ?
            <div className={`${loading ? 'text-black text-2xl' : 'text-green'} ` }>&#9650;</div>:
            <div className={`${loading ? 'text-black text-2xl' : 'text-green'}`}>&#9660;</div>
        }
        </button>
        </div>
    )
}

export default ControlButton