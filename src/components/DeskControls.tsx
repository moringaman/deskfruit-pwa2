import ControlButton from './ui/ControlButton'
// import Skeleton from 'react-loading-skeleton'

const DeskControls = (props:any) => {
    const { deskDirection, position, moveDesk, disabled } = props
    return (
        <div className=" absolute top-[-10px] right-[30px] translate-x-[10%]  ">
        {position !== 'unknown' ? 
         <div className={`flex flex-col items-center  justify-center p-4 justify-between w-[60px] h-[160px]  ${disabled ? 'bg-gray/[0.1]' : 'bg-green/[0.1]'} rounded-xl`}>
         <div className="">
           <ControlButton disabled={disabled} loading={deskDirection === "up"} position={position} cmd="up" onclick={position === 'down' && !disabled ? moveDesk : () => {}} />
         </div>
         <div className="">
           <ControlButton disabled={disabled} loading={deskDirection === "down"} position={position} cmd="down" onclick={position === 'up' && !disabled ? moveDesk: () => {}} />
         </div>
       </div>
       : null
      // <Skeleton width={60} height={160}/>
    }
                   
        </div>
  
    )
}

export default DeskControls