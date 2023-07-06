import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
export default function Splash(props: any) {
    const navigate = useNavigate();

    const handleBeginJourney = () => {
        navigate("/login");
        props.setIsLoggedIn(true)

        if (document !== null) {
            document.getElementById('splash-layer')?.classList.add('begin');
            (document?.getElementById('music') as HTMLAudioElement)?.play();
            (document?.getElementById('music') as HTMLAudioElement).volume = 0.25;
            (document?.getElementById('video') as HTMLAudioElement).style.zIndex = "10";
            (document?.getElementById('video') as HTMLVideoElement)?.play();
            (document?.getElementById('video') as HTMLVideoElement)?.classList.remove('invis');
            (document?.getElementById('video') as HTMLVideoElement)?.classList.add('vis');
        }

    }
    return (
        <div id='splash'>
            <h4 id='splash-message'>Welcome to Game Of Thrones Houses Catalogue


            </h4>
            <Button onClick={(e) => handleBeginJourney()} variant="secondary" type="submit" size='sm'>
                Begin Journey
            </Button>

        </div>
    )
}
