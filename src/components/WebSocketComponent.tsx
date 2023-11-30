import useWebsockets from '../app/custom_hooks/useWebsockets'
import { useAppDispatch } from '../app/hooks'
import { useEffect } from 'react'
import { deskPositionUpdated } from '../features/desk/deskSlice'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type DefaultProps = {
  deskId: string
}

const WebSocketComponent = (props: DefaultProps) => {


  const dispatch = useAppDispatch()
  const { deskId } = props

  const { messages } = useWebsockets(
    {
      id: deskId, //|| 'copy-e00fce68a7754c1f1611d9f5',
      enabled: true,
      onConnected: () => {
        toast.success('You are connected to the Deskfruit Server', {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: 'message2'
        })
        toast.clearWaitingQueue()
       },
      onMessage: async () => {
        //if(!messages.length) return
      //   const latestMessage = messages[messages.length -1] || []
      //   console.log("message recieved", messages)
      //   toast.info(`Your desk is in the ${latestMessage['event'] === 0 ? 'up' : 'down'} position`,
      //     { position: toast.POSITION.BOTTOM_CENTER,
      //       toastId: 'message1' }
      //   )
      //   toast.clearWaitingQueue()
      }
    }
  )

  useEffect(() => {
    console.log("Websocket messages in desk controls", messages)
    const latestMessage = messages[messages.length - 1] || {}
    console.log('Websockets latest', latestMessage)
    if (latestMessage && latestMessage['type'] === 'position') {
      console.log('Websocket message & dispatch', latestMessage)

      toast.info(`Your desk is in the ${latestMessage['event'] === 0 ? 'up' : 'down'} position`, 
      { position: toast.POSITION.BOTTOM_CENTER }
      )
      dispatch(deskPositionUpdated(latestMessage['event']))
    }
    // setMessageList(messages)
  }, [messages, dispatch])

  return (
    <>
    {/* <ToastContainer limit={1} /> */}
    </>
  )
}

export default WebSocketComponent