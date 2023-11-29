
import {useEffect, useState, useRef } from 'react'
import {io} from 'socket.io-client'
import { API_BASE_URL } from '../../config'

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
    const [ messages, setMessages] = useState([])

    const send = (msg: string,id:string ) => {
        ref.current.emit('message', {
            id,
            msg,
            timeStamp: new Date()
        })
    }

    useEffect(():any => {
        if(!enabled) return

        const socket = io(`${API_BASE_URL}/events`)

        socket.emit('message', id);

        socket.emit('newMessage', (msg: any) => {
            if(msg) {
                setMessages(prev => prev.concat(msg) )
            }
            console.log("Websocket Messages", messages)
        })

        socket.on('newMessage', (data:any) => {
            if(data) {
                setMessages(prev => prev.concat(data) )
                if(onMessage) {
                    onMessage()
                }
            }
                console.log("Websocket message", data)
        })

        socket.on('disconnect', () => {
            console.log('Websocket Disconnected')
            setMessages([])
        })

        socket.on('connect', () => {
            console.log("Websocket Connected")
            if(onConnected) {
                onConnected()
            }
        })

        socket.on('reconnect' , () => {
            console.log('Websocket reconnected')
            socket.emit('messages', id);
        })


        ref.current = socket

        return () => socket.disconnect()

    }, [enabled, id, onConnected])

    return {
        messages: messages,
        send: send
    }
}

export default useWebsockets
