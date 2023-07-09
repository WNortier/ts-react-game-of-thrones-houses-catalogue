import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasSettings(props: any) {


    const handleShow = () => props.setShowOffCanvasSettings(!props.showOffCanvasSettings);


    const handleVideoSettingCheckbox = () => {

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




                        <Form.Group className="ml-4 mt-2 mb-2" controlId="formBasicCheckbox">
                            <Form.Check className='basic-check' type="checkbox" label="Replay intro cinematic on next login" checked={true} onChange={(e) => handleVideoSettingCheckbox(e)} />
                        </Form.Group>
                        {/* <Button disabled={userEmail.length === 0 || userPassword.length === 0} id='login-btn' onClick={(e: any) => handleLogin(e, userEmail, userPassword)} variant="secondary" type="submit" size='sm'>
                            Submit
                        </Button> */}
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasSettings;