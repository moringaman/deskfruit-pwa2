import React from 'react'
import Spinner from './Spinner'

export default function StandardButton(props:any) {
    const {text, action, type, loading} = props
    return (
        <div>
            <button onClick={action} 
              className={`w-[100px] ml-2 p-2 rounded-full flex-row ${ type === 'success' && 'bg-green'} bg-gray drop-shadow-lg flex items-center justify-center`}>
                    {loading && <Spinner /> } 
                <p className="text-xs text-black font-bold mx-2">{text}</p>
                {/* <Plus size={20} color="white"/> */}
            </button>
        </div>
    )
}
