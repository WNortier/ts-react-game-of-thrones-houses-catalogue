import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Eye } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { CSSProperties } from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

function LoginForm(props: any) {
    // const [type, setType] = useState('password')
    // const [userPassword, setUserPassword] = useState('')
    // const [userEmail, setUserEmail] = useState('')
    const [errors, setErrors] = useState({ emailErr: false, passErr: false })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();



    const handleFormSubmission = (e: any) => {
        e.preventDefault()
    }

    useEffect(() => {

    }, [])

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "rgb(105, 23, 101)",
    };

    // console.log(type)
    return (
        <>
            {/* <div id='splash-layer'> */}
            {/* </div> */}
            {loading ? <CircleLoader color={'rgb(105, 23, 101)'}
                loading={loading}
                cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader" /> :


                <Form id='basic-form'>
                    <h4>Login</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoComplete='true' value={props.valueOne} onChange={(e) => props.setValueOneState(e.target.value)} className='login-input login-email' type="text" placeholder="example" />
                    </Form.Group>

                    <Form.Label>Password</Form.Label>
                    <Form.Group className="mb-3 d-flex">
                        <Form.Control autoComplete='true' value={props.valueTwo} onChange={(e) => props.setValueTwoState(e.target.value)} className='login-input login-password' type={"text"} placeholder="example">
                            {/* <Eye /> */}
                        </Form.Control>
                        {/* <InputGroup.Text onClick={handleChangePasswordType} id="basic-addon1"><Eye onClick={handleChangePasswordType} /></InputGroup.Text> */}
                    </Form.Group>
                    <Form.Group className="ml-4" controlId="formBasicCheckbox">
                        <Form.Check className='basic-check' type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button id='login-btn' onClick={(e: any) => handleFormSubmission(e)} variant="secondary" type="submit" size='sm'>
                        Submit
                    </Button>
                </Form>}
        </>
    );
}

export default LoginForm;