
import {useRef } from 'react'
import {io} from 'socket.io-client'
import { API_BASE_URL } from '../../config'
import { signal, effect } from '@preact/signals-react'

type Props = {
    id: string
    enabled: boolean
    onConnected?: ()  => void
    onMessage?: ()  => void
}

type Message = {
    msg: string
    type: string
    timeStamp: Date,
    clientId: string
}

const useWebsockets = ({id, enabled, onConnected, onMessage}: Props) => {

    const ref = useRef<any>() // Add types for SocketIOClient.Socket
    // const [ messages, setMessages] = useState([])
    const messages = signal([])
    const latestMessage = signal(undefined)

    // const latestMessage = computed(() => 
    //          messages.value.length > 0 ? messages.value[messages.value.length - 1]: messages.value[0]
    // ) 

    const send = (msg: string,id:string ) => {
        ref.current.emit('message', {
            id,
            msg,
            timeStamp: new Date()
        })
    }

    effect(():any => {
        if(!enabled) return

        const socket = io(`${API_BASE_URL}/events`)

        socket.emit('message', id);

        socket.emit('newMessage', (msg: any) => {
            // if(msg) {
            //     messages.value = messages.value.concat(msg)
            // }
            //console.log("Websocket Messages", messages)
        })

        socket.on('newMessage', (data:any) => {
            if(data) {
               messages.value = messages.value.concat(data)
               latestMessage.value = data
                if(onMessage) {
                    onMessage()
                }
            }
                console.log("Websocket message", data)
        })

        socket.on('disconnect', () => {
            console.log('Websocket Disconnected')
            // setMessages([])
        })

        socket.on('connect', () => {
            console.log("Websocket Connected")
            if(onConnected) {
                onConnected()
            }
        })

        socket.on('reconnect' , () => {
            //console.log('Websocket reconnected')
            socket.emit('messages', id);
        })


        ref.current = socket

        return () => socket.disconnect()

    })

    return {
        messages: messages,
        latestMessage: latestMessage,
        send: send
    }
}

export default useWebsockets
