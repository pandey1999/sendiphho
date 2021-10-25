import React from 'react'
import "./Chat.css"
import Avatar from '@material-ui/core/Avatar';
import StopIcon from '@material-ui/icons/Stop';
import ReactTimeago from 'react-timeago';
import {selectImage} from "./features/appSlice"
import {useDispatch} from "react-redux"
import { useHistory } from "react-router-dom"
import { db } from './firebase';
function Chat({id, profilePic, username, timestamp, imageUrl, read}) {
    const dispatch= useDispatch();
    const history = useHistory() ;
    const open =() =>
    {
        if (!read)
        {
            dispatch(selectImage(imageUrl));
            db.collection("posts").doc(id).set
            (
                {
                read: true,
                }
                ,
                { merge: true }
            );
            history.push("/chats/view")
        }
    }
    return (
        <div onClick={open} className="chat">
            <Avatar className="chat_avatar" src={profilePic} />
            <div className="chat_info">
                <h4>{username}</h4>
                <p>{!read && "Tap to View -"}  {"  "}<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
            </div>
            {!read && <StopIcon className="chat_stopicon" />}
            
        </div>
    )
}

export default Chat
