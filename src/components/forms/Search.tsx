import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Eye } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { CSSProperties } from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import axios from 'axios';

function Search(props: any) {
    // const [type, setType] = useState('password')
    // const [userPassword, setUserPassword] = useState('')
    // const [userEmail, setUserEmail] = useState('')
    const [searchErrors, setSearchErrors] = useState({ searchErr: false })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [m, setM] = useState<any>([])
    const [t, setT] = useState('')



    const handleFormSubmission = async (e: any, name, gender, culture, born, died, isAlive) => {
        // console.log(name)
        props.setLoading(true)
        setSearchErrors({ searchErr: false })


        setTimeout(async () => {
            // if (name !== '' && gender !== '' && culture !== '' && born !== '' && died !== '') {
            // e.preventDefault()
            // }
            if (props.name === '' || props.gender === '' || props.culture === '' || props.born === '' || props.died === '') {
                setSearchErrors({ searchErr: true })
                props.setLoading(false)
                return

            } else if (props.name !== '' || props.gender !== '' || props.culture !== '' || props.born !== '' || props.died !== '') {
                setSearchErrors({ searchErr: false })
                props.setLoading(false)
                return
            } else {


                let url = `https://anapioficeandfire.com/api/characters?page=1&pageSize=10`
                // console.log(page, rows, name, gender, culture, born)


                // console.log('N Q P', nameQueryParam)
                // if (name) url = url + `&name=${name}`
                // if (gender) url = url + `&gender=${gender}`
                // if (culture) url = url + `&culture=${culture}`
                // if (born) url = url + `&born=${born}`
                // if (died) url = url + `&died=${died}`
                // if (isAlive !== '') url = url + `&isAlive=${isAlive}`
                // let rez = await axios.get(url)
                // console.log('rezzi', rez.data)
                // console.log(rez)
                // props.setChars([...rez.data])
                // props.handler(url)
                // console.log(url)
                // console.log(url)
                props.handleFormSubmission(url)
                props.setLoading(false)

                // setM([...rez.data])
            }


        }, 1350)
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


                <Form onSubmit={(e) => e.preventDefault()} id='basic-form'>
                    <h4>Searcb</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control autoComplete='true' value={props.name} onChange={(e) => { props.setName(e.target.value); setT(e.target.value) }} className='login-input login-email' type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control autoComplete='true' value={props.gender} onChange={(e) => props.setGender(e.target.value)} className='login-input login-email' type="text" placeholder="Gender" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Culture</Form.Label>
                        <Form.Control autoComplete='true' value={props.culture} onChange={(e) => props.setCulture(e.target.value)} className='login-input login-email' type="text" placeholder="Culture" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Born</Form.Label>
                        <Form.Control autoComplete='true' value={props.born} onChange={(e) => props.setBorn(e.target.value)} className='login-input login-email' type="text" placeholder="Born" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Died</Form.Label>
                        <Form.Control autoComplete='true' value={props.died} onChange={(e) => props.setDied(e.target.value)} className='login-input login-email' type="text" placeholder="Died" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Is Alive</Form.Label>
                        {/* <Form.Control autoComplete='true' value={props.isAlive} onChange={(e) => props.setIsAlive(e.target.value)} className='login-input login-email' type="text" placeholder="Is Alive" /> */}
                        <Form.Check className='basic-check' type="checkbox" label="" checked={props.isAlive} onChange={(e) => props.setIsAlive(props.isAlive === '' ? props.setIsAlive(true) : props.setIsAlive(''))} />
                    </Form.Group>
                    <Button id='login-btn' onClick={(e: any) => handleFormSubmission(e, props.name, props.gender, props.culture, props.born, props.died, props.isAlive)} variant="secondary" type="button" size='sm'>
                        Submit
                    </Button>

                    {searchErrors.searchErr ? <div>
                        <Form.Text className="text" style={{ color: 'red' }}>Please complete atlease one field to perform a search</Form.Text>
                    </div> : null}
                </Form>}
        </>
    );
}

export default Search;