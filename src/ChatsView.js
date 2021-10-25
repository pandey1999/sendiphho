import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import "./ChatsView.css"
import { selectSelectedImage } from './features/appSlice'
import {CountdownCircleTimer} from "react-countdown-circle-timer";

function ChatsView() {
    const selectedImage = useSelector(selectSelectedImage)
    const history = useHistory();
    useEffect(() =>
    {
        if (!selectedImage)
        {
            exit();
        }
    }, [selectedImage]);

    const exit =() =>
    {
        history.replace("/chats")

    }
    return (
        <div className="chatsView">
            <img src={selectedImage} onClick={exit} alt="" />
            <div className="chatsView_timer">
                <CountdownCircleTimer
                    isPlaying 
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ["#004777",0.33],
                        ["#F78801", 0.33],
                        ["#A30000", 0.33],

                    ]}
                    >
                        {({remainingTime}) =>
                        {
                        if(remainingTime==0)
                        {
                            exit();
                        }
                    return remainingTime;
                        }}
                </CountdownCircleTimer>

            </div>
            
        </div>
    )
}

export default ChatsView
