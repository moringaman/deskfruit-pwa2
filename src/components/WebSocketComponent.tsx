import useWebsockets from '../app/custom_hooks/useWebsockets'
import { useAppDispatch } from '../app/hooks'
import { memo } from 'react'
import { signal, effect } from '@preact/signals-react'
import { deskPositionUpdated } from '../features/desk/deskSlice'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type DefaultProps = {
  deskId: string
}

const WebSocketComponent = memo((props: DefaultProps) => {

 const prevMessage = signal(null)
  const dispatch = useAppDispatch()
  const { deskId } = props

  const { messages, latestMessage } = useWebsockets(
    {
      id: deskId, //|| 'copy-e00fce68a7754c1f1611d9f5',
      enabled: true,
      onConnected: () => {
        toast.success('Successfully connected to the Deskfruit Server', {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: 'message2'
        })
        //toast.clearWaitingQueue()
       },
     onMessage: async () => {
    //     console.log('LATEST ', latestMessage)
    //     if(!messages.value.length) return
    //     // if(!!prevMessage.value) {
    //     //   if(latestMessage['event'] === (prevMessage.value['event'])) return
    //     // }
    //     // const latestMessage = messages.value[messages.value.length -1] || []
    //   //  if (latestMessage['event'] === '3') return // cannot get desk position
    //     console.log("message recieved", messages.value)
    //     toast.success(`Your desk is in the ${latestMessage.value['event'] === 0 ? 'up' : 'down'} position`,
    //       { position: toast.POSITION.BOTTOM_CENTER,
    //         toastId: 'message1' }
    //     )
    //     prevMessage.value = latestMessage 
    // //   //   toast.clearWaitingQueue()
      }
    }
  )

  effect(() => {
   if(latestMessage.value == undefined) return
    if (latestMessage.value && latestMessage.value['type'] === 'position') {
      toast.success(`Your desk is in the ${latestMessage.value['event'] === 0 ? 'up' : 'down'} position`, 
      { position: toast.POSITION.BOTTOM_CENTER }
      )
      dispatch(deskPositionUpdated(latestMessage.value['event']))
    }
  })

  return (
    <>
    </>
  )
})

export default WebSocketComponent