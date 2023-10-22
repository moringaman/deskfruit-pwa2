import React from 'react'

export default function StandardButton(props:any) {
    const {text, action} = props
    return (
        <div>
            <button onClick={action} 
              className="p-2 rounded-full bg-gray drop-shadow-lg flex items-center justify-center">
                <p className="text-nickel text-xs text-black font-bold mx-2">
                    {text}
                </p>
                {/* <Plus size={20} color="white"/> */}
            </button>
        </div>
    )
}
