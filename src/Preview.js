import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import './Preview.css'
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid} from "uuid";
import firebase from "firebase";
import { db,storage } from './firebase';
import { selectUser } from './features/appSlice';

function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const history= useHistory();
     const dispatch = useDispatch();
    const user = useSelector(selectUser)
    useEffect(() => {
        if(!cameraImage)
        {
            history.replace("/");
        }
    }, [cameraImage, history]);
    const closePreview = () => {
        dispatch(resetCameraImage());
    };
    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`)
        .putString(cameraImage,"data_url");
    uploadTask.on("state_changed",null,
    (error) =>{
        //error function
        console.log(error);
    },()=>{
        //complete function
        storage.ref("posts")
        .child(id)
        .getDownloadURL()
        .then((url) => {
            db.collection('posts').add(
                {
                    imageUrl:url,
                    username:'NEERAJ PANDEY',
                    read:false,
                    profilePic: user.profilePic,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                }
            )
            history.replace("/chats");
        })
    }
    )
};
    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className="preview_close"/>
            <div className="preview_toolbarright">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt="" />
            <div onClick={sendPost} className="preview_footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview_sendicon"/>

            </div>

            
        </div>
    )
}

export default Preview
