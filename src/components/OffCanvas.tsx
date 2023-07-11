import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasSettings(props: any) {

    const [showVid, setShowVid] = useState(localStorage.getItem('init') === 'true' ? true : false)
    const [showAdditionalSettings, setShowAdditionalSettings] = useState(false)
    const [pause, setPause] = useState(false)
    const [disableLogin, setDisableLogin] = useState(false)
    const [disableVaryCheckbox, setDisableVaryCheckbox] = useState(false)



    const handleShow = () => props.setShowOffCanvasSettings(!props.showOffCanvasSettings);


    const handleVideoSettingCheckbox = (e: any) => {
        setShowVid(!showVid)
        localStorage.setItem('init', String(!showVid))
    }

    const handlePauseMusic = (e: any) => {
        setPause(!pause)
        localStorage.setItem('pause', pause === true ? 'true' : 'false');
        if (pause === true) {
            (document.getElementById('music') as HTMLAudioElement).pause();
        } else {
            (document.getElementById('music') as HTMLAudioElement).play();
        }
    }

    const handleChangeSettings = (e: any) => {
        e.preventDefault()
        props.setShowOffCanvasSettings(!props.showOffCanvasSettings);
    }

    const handleRangeChange = (r: any) => {
        (document.getElementById('music') as HTMLAudioElement)!.volume = r.target.value == 100 ? 1 : +('0' + '.' + r.target.value);

    }

    const handleDisableLogin = (e: any) => {
        setDisableLogin(!disableLogin);
        localStorage.setItem('disableLogin', String(!disableLogin))
        localStorage.setItem('loggedin', String(true))
    }

    const handleDisableVaryCheckbox = (e: any) => {
        localStorage.setItem('disableVary', String(!disableVaryCheckbox))
        setDisableVaryCheckbox(!disableVaryCheckbox);
    }

    return (
        <>
            <Offcanvas className="layout-basic-offcanvas" show={props.showOffCanvasSettings} onHide={handleShow} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="app-font" className="nav-brand">Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form id='offcanvas-settings-form'>
                        {/* <Form.Group className="mb-1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoComplete='true' value={userEmail} onChange={(e) => handleEmailInputChange(e)} id="login-email" className='layout-basic-input' type="email" placeholder="Email" />
                    </Form.Group>


                    {errors.emailErr ? <div>
                        <Form.Text className="text" style={{ color: 'red' }}>Invalid Email</Form.Text>
                    </div> : null} */}



                        <Offcanvas.Title id="app-font" style={{ color: "#663868" }}>Media</Offcanvas.Title>

                        <Form.Group className="ml-4 mt-2 mb-3" controlId="formBasicCheckbox">
                            <Form.Check className='basic-check' type="checkbox" label="Pause music" checked={localStorage.getItem('pause') === 'false' ? false : true} onChange={(e) => handlePauseMusic(e)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Adjust Volume</Form.Label>

                            <Form.Range max='100' onChange={(r) => handleRangeChange(r)} />
                        </Form.Group>

                        <hr />
                        <Offcanvas.Title id="app-font" style={{ color: "#663868" }}>Application</Offcanvas.Title>

                        <Form.Group className="ml-4 mt-2 mb-3" controlId="formBasicCheckbox">
                            <Form.Check className='basic-check' type="checkbox" label="Disable authentication" checked={localStorage.getItem('disableLogin') === 'true' ? true : false} onChange={(e) => handleDisableLogin(e)} />
                        </Form.Group>
                        {localStorage.getItem('disableLogin') === 'false' ? <Form.Group className="ml-4 mt-2 mb-3" controlId="formBasicCheckbox">
                            <Form.Check className='basic-check' type="checkbox" label="Re-enable login cinematic" checked={localStorage.getItem('init') === 'true' ? false : true} onChange={(e) => handleVideoSettingCheckbox(e)} />
                        </Form.Group> : null}
                        <Form.Group className="ml-4 mt-2 mb-3" controlId="formBasicCheckbox">
                            <Form.Check className='basic-check' type="checkbox" label="Disable varying wallpaper" checked={localStorage.getItem('disableVary') === 'true' ? true : false} onChange={(e) => handleDisableVaryCheckbox(e)} />
                        </Form.Group>
                        <Button id='login-btn' onClick={(e: any) => handleChangeSettings(e)} variant="secondary" type="submit" size='sm'>
                            Submit
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasSettings;