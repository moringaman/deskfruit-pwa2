import React from 'react'

const ControlButton = (props: any) => {
    const {loading } = props
    return (
        <div className="relative">
            <div className={`absolute ${loading ? 'animate-spin -inset-0.5 bg-gradient-to-r from-green to-black rounded-full mx-6 blur' : null} `}></div>
        <button 
           className={`relative w-20 h-20 mx-6 rounded-full ${loading ? 'bg-green' : 'bg-gray'} ring-2 ring-black -ring-offset-4 text-black text-xl font-bold`}
           onClick={() => props.onclick(props.text)}
           >
           {props.text}
        </button>
        </div>
    )
}

export default ControlButton