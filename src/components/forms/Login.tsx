import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Eye } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { CSSProperties } from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import { Container } from 'react-bootstrap';
import { generateUsers } from '../../data/users';

function LoginForm(props: any) {
    const [type, setType] = useState('password')
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [errors, setErrors] = useState({ emailErr: false, passErr: false })
    const [loading, setLoading] = useState(false)
    const [loginCheckbox, setLoginCheckbox] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        document.onkeydown = function (evt) {
            {
                evt = evt || window.event;
                var isEscape = false;
                if ("key" in evt) {
                    isEscape = (evt.key === "Escape" || evt.key === "Esc");
                } else {
                    //@ts-ignore
                    isEscape = (evt.keyCode === 27);
                }
                if (isEscape) {
                    document.querySelector('#login-form')?.classList.add('invis')
                    document?.getElementById('video')?.classList.add('begin')
                    localStorage.setItem('hasExited', 'true')

                    // document.getElementById('video')!.style.display = 'none';



                    setTimeout(() => {
                        document?.getElementById('video')?.classList.add('invis');

                        setTimeout(() => {
                            (document.getElementById('video') as HTMLVideoElement).pause();
                            document.querySelector('#layout-basic-navbar')?.classList.add('invis')
                            props.setVideoComplete(true);
                            document.querySelector('#login-form')?.classList.remove('invis')
                            document.querySelector('#login-form')?.classList.add('vis')
                            document.querySelector('#login-form')?.classList.add('fadein')
                            props.setInit()
                        }, 250)

                    }, 5100)
                }
            };
            // <DO YOUR WORK HERE>
        }
    });





    const handleChangePasswordType = () => {
        setType(type === 'password' ? 'text' : 'password')
    }

    const handleLogin = (e: any, email: string, pass: string) => {
        setErrors({ passErr: false, emailErr: false })
        e.preventDefault()
        const includesEmail = generateUsers().map((u: any) => u.email).includes(email)
        const includesPass = generateUsers().map((u: any) => u.pass).includes(pass)

        const bothIncorrect = !includesEmail && !includesPass
        generateUsers().forEach((u) => {
            if (includesEmail && includesPass === false) {
                setErrors({ emailErr: false, passErr: true })
                // setLoading(false)
            } else if (includesPass && includesEmail === false) {
                setErrors({ passErr: false, emailErr: true })
                // setLoading(false)
            }
            else if (bothIncorrect) {
                setErrors({ emailErr: true, passErr: true })
                // setLoading(false)
            } else {
                setLoading(true)
                setTimeout(() => {
                    setErrors({ emailErr: false, passErr: false })
                    props.setIsLoggedIn(true)
                    localStorage.setItem('loggedin', 'true')
                    localStorage.setItem('init', 'true')
                    if (loginCheckbox) {
                        localStorage.setItem('stayLoggedIn', 'true')
                        localStorage.setItem('email', email)
                    } else {
                        localStorage.removeItem('email')
                        localStorage.removeItem('stayLoggedIn')
                    }
                    document.querySelector('#layout-basic-navbar')?.classList.remove('invis')
                    document.querySelector('#layout-basic-navbar')?.classList.add('vis')
                    document.querySelector('#layout-basic-navbar')?.classList.add('fadein')
                    setLoading(false)
                    navigate("/houses");
                }, 2150)
            }
        })
    }

    useEffect(() => {
        // console.log(localStorage.getItem('email'))
    }, [])

    const handleEmailInputChange = (e: any) => {
        setUserEmail(e.target.value)
        localStorage.setItem('email', e.target.value)
    }

    const handleLoginCheckboxChange = (e: any) => {
        setLoginCheckbox(!loginCheckbox)
    }
    useEffect(() => {
        document.getElementById('video')?.classList.add('vis')

        if (localStorage.getItem('init') === 'false' && localStorage.getItem('hasExited') !== 'true') {
            if (!localStorage.getItem('email')) localStorage.setItem('email', '')
            document.querySelector('#login-form')?.classList.add('invis')
            document.querySelector('#layout-basic-navbar')?.classList.add('invis')


            setTimeout(() => {
                if (localStorage.getItem('hasExited') === 'true') return
                document?.getElementById('video')?.classList.add('begin')

                setTimeout(() => {
                    // document?.getElementById('video')?.classList.add('invis');
                    // document.getElementById('video')!.style.display = 'none';
                }, 5500)
            }, 23_000)

            setTimeout(() => {
                if (localStorage.getItem('hasExited') === 'true') return
                document.querySelector('#login-form')?.classList.add('invis')
                document.querySelector('#layout-basic-navbar')?.classList.add('invis')

                setTimeout(() => {
                    (document.getElementById('video') as HTMLVideoElement).pause();
                    document?.getElementById('video')?.classList.add('invis')
                    props.setVideoComplete(true);
                    document.querySelector('#login-form')?.classList.remove('invis')
                    document.querySelector('#login-form')?.classList.add('vis')
                    document.querySelector('#login-form')?.classList.add('fadein')
                    props.setInit()
                }, 3000)

            }, 24_000)
        }

    }, [])

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "rgb(105, 23, 101)",
    };


    return (
        <Container id='login-container'>
            {loading ?
                <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={localStorage.getItem('loggedin') === 'true' ? 'mt-5' : ''}>
                    <CircleLoader color={'rgb(105, 23, 101)'}
                        loading={loading}
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div> :
                <Form className='login-form layout-basic-form layout-basic-margin' id='login-form'>
                    <h4>Login</h4>
                    <Form.Group className="mb-1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoComplete='true' value={userEmail} onChange={(e) => handleEmailInputChange(e)} id="login-email" className='layout-basic-input' type="email" placeholder="Email" />
                    </Form.Group>


                    {errors.emailErr ? <div>
                        <Form.Text className="text" style={{ color: 'red' }}>Invalid Email</Form.Text>
                    </div> : null}


                    <Form.Label>Password</Form.Label>
                    <Form.Group className="mb-1 d-flex">
                        <Form.Control autoComplete='true' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} id="login-password" type={type} placeholder="Password">
                            {/* <Eye /> */}
                        </Form.Control>
                        <InputGroup.Text onClick={handleChangePasswordType} id="show-password"><Eye onClick={handleChangePasswordType} /></InputGroup.Text>
                    </Form.Group>

                    {errors.passErr ? <div>
                        <Form.Text className="text" style={{ color: 'red' }}>Invalid Password</Form.Text>
                    </div> : null}

                    <Form.Group className="ml-4 mt-3 mb-3" controlId="formBasicCheckbox">
                        <Form.Check className='basic-check' type="checkbox" label="Remember me" checked={loginCheckbox} onChange={(e) => handleLoginCheckboxChange(e)} />
                    </Form.Group>
                    <Button disabled={userEmail.length === 0 || userPassword.length === 0} id='login-btn' onClick={(e: any) => handleLogin(e, userEmail, userPassword)} variant="secondary" type="submit" size='sm'>
                        Submit
                    </Button>
                </Form>
            }
        </Container>
    )
}

export default LoginForm;