import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Eye } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from 'react'

function BasicForm(props) {
    const [type, setType] = useState('password')


    const handleChangePasswordType = (t) => {
        setType(type === 'password' ? 'text' : 'password')
    }

    const handleLogin = (e) => {
        e.preventDefault()
        // document.querySelector('#basic-form')?.classList.add('invis')
        // document.querySelector('.navigation-bar')?.classList.add('invis')
        document.querySelector('#basic-form')?.classList.add('fadein')
        document.querySelector('.navigation-bar')?.classList.add('fadein')
    }

    useEffect(() => {

        if (!props.init) {
            props.setIsLoggedIn(true)
            document.querySelector('#basic-form')?.classList.add('invis')
            document.querySelector('.navigation-bar')?.classList.add('invis')
            // setTimeout(() => {
            // }, 3000)

            setTimeout(() => {
                document?.getElementById('video')?.classList.add('begin')

                setTimeout(() => {
                    document?.getElementById('video').classList.add('invis');
                    document.getElementById('video').style.display = 'none';
                    document.getElementById('splash-layer').style.display = 'none';

                }, 5500)
            }, 23_000)

            setTimeout(() => {
                document.querySelector('#basic-form')?.classList.add('invis')
                document.querySelector('.navigation-bar')?.classList.add('invis')

                setTimeout(() => {
                    document.getElementById('video').pause();
                    props.setVideoComplete(true);
                    document.querySelector('#basic-form')?.classList.remove('invis')
                    document.querySelector('.navigation-bar')?.classList.remove('invis')
                    document.querySelector('.navigation-bar')?.classList.add('vis')
                    document.querySelector('#basic-form')?.classList.add('vis')
                    document.querySelector('.navigation-bar')?.classList.add('fadein')
                    document.querySelector('#basic-form')?.classList.add('fadein')


                    // document.querySelector('#basic-form').style.visibility = "visible";
                    // document.querySelector('.navigation-bar').style.visibility = "visible";

                }, 3000)

            }, 24_000)
        }

    }, [])

    // console.log(type)
    return (
        <>
            <div id='splash-layer'>
            </div>

            <Form id='basic-form'>
                <h4>Login</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoComplete='true' className='login-input login-email' type="email" placeholder="Email" />
                </Form.Group>

                <Form.Label>Password</Form.Label>
                <Form.Group className="mb-3 d-flex">
                    <Form.Control autoComplete='true' className='login-input login-password' type={type} placeholder="Password">
                        {/* <Eye /> */}
                    </Form.Control>
                    <InputGroup.Text onClick={handleChangePasswordType} id="basic-addon1"><Eye onClick={handleChangePasswordType} /></InputGroup.Text>
                </Form.Group>
                <Form.Group className="ml-4" controlId="formBasicCheckbox">
                    <Form.Check bsPrefix className='basic-check' type="checkbox" label="Remember me" />
                </Form.Group>
                <Button id='login-btn' onClick={(e) => handleLogin(e)} variant="secondary" type="submit" size='sm'>
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default BasicForm;