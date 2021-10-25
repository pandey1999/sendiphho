import React from 'react'
import "./Login.css"
import {Button} from '@material-ui/core';
import {useDispatch} from "react-redux"
import {auth,provider} from "./firebase"
import { login } from './features/appSlice';

export default function Login() {
    const dispatch = useDispatch();
    
    const signIn = () =>
    {
        auth.signInWithPopup(provider)
        .then((result) =>
        {
            dispatch
            (
                login(
                    {
                        username:result.user.displayName,
                        profilepic:result.user.photoURL,
                        id: result.user.uid,
                    }
                )
            )
        })
        .catch((error) => alert(error.message));

    }
    return (
        <div className="login">
            <div className="login_container">
                <img className="login_img" src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="" />
            <Button variant="outlined" onClick={signIn} >SIGN IN</Button>
        </div>
        </div>
    )
}
