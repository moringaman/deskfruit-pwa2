import ControlButton from './ui/ControlButton'
import Skeleton from 'react-loading-skeleton'

const DeskControls = (props:any) => {
    const { deskDirection, position, moveDesk } = props
    return (
        <div className=" absolute top-[-10px] right-[30px] translate-x-[10%]  ">
        {position !== '' ? 
         <div className="flex flex-col items-center  justify-center p-4 justify-between w-[60px] h-[160px] bg-green/[0.1] rounded-xl">
         <div className="">
           <ControlButton loading={deskDirection === "up"} position={position} cmd="up" onclick={position === 'down' ? moveDesk : () => {}} />
         </div>
         <div className="">
           <ControlButton loading={deskDirection === "down"} position={position} cmd="down" onclick={position === 'up' ? moveDesk: () => {}} />
         </div>
       </div>
       : null
      // <Skeleton width={60} height={160}/>
    }
                   
        </div>
  
    )
}

export default DeskControls