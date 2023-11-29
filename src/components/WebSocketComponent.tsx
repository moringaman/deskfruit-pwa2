import useWebsockets from '../app/custom_hooks/useWebsockets'
import { useAppDispatch } from '../app/hooks'
import { useEffect } from 'react'
import { deskPositionUpdated } from '../features/desk/deskSlice'

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
      onConnected: () => { },
      onMessage: async () => {
        // const latestMessage = messageList[messageList.length] || {}
        // if(latestMessage && latestMessage['type'] === 'position') {
        //   console.log('Websocket message & dispatch', latestMessage)
        //   dispatch(deskPositionUpdated(latestMessage['event']))
        // }
        // await setMessageList(messages)
        // console.log("Show Websocket toast", messageList[latestMessage])
      }
    }
  )

  useEffect(() => {
    console.log("Websocket messages in desk controls", messages)
    const latestMessage = messages[messages.length -1] || {}
    console.log('Websockets latest', latestMessage)
    if (latestMessage && latestMessage['type'] === 'position') {
      console.log('Websocket message & dispatch', latestMessage)
      dispatch(deskPositionUpdated(latestMessage['event']))
    }
    // setMessageList(messages)
  }, [messages, dispatch])

    return (
        <></>
    )
}

export default WebSocketComponent