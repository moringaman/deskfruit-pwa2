import React from 'react'

export default function StandardButton(props:any) {
    const {text, action} = props
    return (
        <div>
            <button onClick={action} 
              className="w-28 h-8 rounded-full absolute bg-goldCrayola drop-shadow-lg right-4 top-4 flex items-center justify-center">
                <p className="text-nickel text-xs font-bold mx-2">
                    {text}
                </p>
                {/* <Plus size={20} color="white"/> */}
            </button>
        </div>
    )
}
