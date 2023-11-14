

const ControlButton = (props: any) => {
    const {loading, cmd, position, disabled } = props
console.log("Desk POSITION ", position, cmd, disabled)
    return (
        <div className="relative">
            <div className={`absolute  ${loading ? 'animate-spin -inset-1 bg-gradient-to-r from-green to-black rounded-full blur-xs ' : null} `}></div>
        <button 
           className={`relative w-10 h-10 rounded-full ${position === cmd || disabled ? 'opacity-30 text-gray ring-gray': 'text-green '} ${loading ? 'ring-2' : ' text-green ring-2 ring-green/[0.8]'} -ring-offset-4  ${disabled ? "text-gray ring-gray/[0.3]" : null} text-xl font-bold p-1 text-center bg-black`}
           onClick={() => props.onclick(cmd)}
           >
         {cmd === 'up' ?
            <div className={`${loading ? 'text-green text-2xl' : 'text-green/[0.8]'} ${disabled && !loading ? 'text-gray' : null}` }>&#9650;</div>
            :
            <div className={`${loading ? 'text-green text-2xl' : 'text-green/[0.5]'} ${disabled && !loading ? 'text-gray' : null}`}>&#9660;</div>
        }
        </button>
        </div>
    )
}

export default ControlButton