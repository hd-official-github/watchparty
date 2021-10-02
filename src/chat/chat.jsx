import { Card } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import {
    Redirect,
    useLocation
} from "react-router-dom";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Chat(props) {

    const [cHat, setcHat] = useState([])
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    let query = useQuery();
    console.log("Query ", query.get('name'));
    if (!query.get('name') || !query.get('room')) {
        props.history.replace('/')
    } else {
        setName(query.get('name'))
        setRoom(query.get('room'))
    }
    const socketRef = useRef()
    useEffect(() => {

        try {
            socketRef.current = io.connect("http://localhost:8000");
            socketRef.current.emit('message', "init")
            socketRef.current.on("message", (data) => {
                console.log("D ", data);
            })
        } catch (err) {
            console.log("SOCKET ERR ", err.message);
        }
        return () => socketRef.current.disconnect()
    }, [])

    return (
        <div>
            hh
        </div>
    )

}
