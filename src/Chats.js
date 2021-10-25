import React, { useEffect, useState } from 'react'
import "./Chats.css"
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'; 
import Chat from "./Chat";
import { db } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser,signOut } from './features/appSlice';
import {auth} from "./firebase"
//import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {
    const [posts,setPosts]= useState([]);
    const user=useSelector(selectUser);
    const dispatch=useDispatch();
    const history=useHistory();
    useEffect(() =>{
        db.collection("posts")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot) =>
        setPosts(
            snapshot.docs.map((doc) =>({
                id: doc.id,
                data: doc.data(),
            }))
        )
        
        )

    },[])
    const takesnap = () =>
    {
        dispatch(resetCameraImage);
        history.push("/");
    }
        return (
        <div className="chats">
            <div className="chats_header">
                <Avatar
                 src={user.profilePic}
                  onClick={() => auth .signOut() }
                   className="chats_avatar" />
                <div className="chats_search">
                    < SearchIcon className="chats_searchicon" />
                    <input placeholder="Friends" type="text" />
                </div>
                < ChatBubbleIcon className="chats_chaticon"/>
            </div>
            <div className="chats_posts" >
                {posts.map(({
                    id,
                    data:{profilePic, username,timestamp,imageUrl,read}
                }) => (
                    <Chat
                    key={id}
                    id={id}
                    username={username}
                    profilePic={profilePic}
                    timestamp={timestamp}
                    imageUrl={imageUrl}
                    read={read}
                     />
                )
                )}
            </div>
                <RadioButtonUncheckedIcon
                className="chats_takePicicon"
                onClick={takesnap}
                fontSize="large" />
             </div>
    )
}

export default Chats
