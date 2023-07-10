import { CSSProperties, useEffect, useState, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Paginator from '../Paginator';
import AppModal from '../Modal';
import React from 'react';
import Search from '../forms/Search';
import { CircleLoader } from 'react-spinners';




function CharactersTable(props: any) {


    // console.log(window.location)

    const [characters, setChars] = useState([])
    const [charsPics, setCharsPics] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [modalImg, setModalImg] = useState('')
    const [modalData, setModalData] = useState({})

    const [nameQueryParam, setNameQueryParam] = useState<undefined | string>('')
    const [genderQueryParam, setGenderQueryParam] = useState<undefined | string>('')
    const [cultureQueryParam, setCultureQueryParam] = useState<undefined | string>('')
    const [bornQueryParam, setBornQueryParam] = useState<undefined | string>('')

    const [diedQueryParam, setDiedQueryParam] = useState<undefined | string>('')
    const [isAliveQueryParam, setIsAliveQueryParam] = useState<undefined | boolean>(false)
    const [loadingReset, setLoadingReset] = useState(false)
    const [searched, setSearched] = useState(false)
    const [errors, setErrors] = useState({ emailErr: false, passErr: false })
    const [loading, setLoading] = useState(false)




    const handleFormSubmission = async (e, name, gender, culture, born, died, isAlive) => {
        e.preventDefault();
        // console.log(name, typeof name)
        setLoading(true)
        setTimeout(async () => {

            // if (name !== '' && gender !== '' && culture !== '' && born !== '' && died !== '') {
            // }

            // console.log(name)
            setLoading(false)
            let url = `https://anapioficeandfire.com/api/characters?page=1&pageSize=10`
            // console.log(page, rows, name, gender, culture, born)


            // console.log('N Q P', nameQueryParam)
            // console.log(url, 'URL HERE')

            if (name) url = url + `&name=${name}`
            if (gender) url = url + `&gender=${gender}`
            if (culture) url = url + `&culture=${culture}`
            if (born) url = url + `&born=${born}`
            if (died) url = url + `&died=${died}`
            if (isAlive) url = url + `&isAlive=${isAlive}`
            // console.log(name)
            console.log(url)
            let rez = await axios.get(url)
            // console.log('response data >>>', rez.data)
            // console.log(rez)
            // props.setChars([...rez.data])
            // props.handler(url)

            setChars(rez.data)


            // const charactersPics = await axios.get(`https://thronesapi.com/api/v2/characters`)
            // setCharsPics(charactersPics.data)

            // setM([...rez.data])
            // console.log('first')

        }, 1350)
    }



    const getChars = async (page?: string, rows?: string, name?: string, gender?: string, culture?: string, born?: string, died?: string, isAlive?: boolean) => {
        // console.log(name)

        setTimeout(async () => {
            setLoadingReset(false)
            let endpoint = `https://anapioficeandfire.com/api/characters?page=${page}&pageSize=${rows}`
            const response = await axios.get(endpoint)
            setChars(response.data)
            const charactersPics = await axios.get(`https://thronesapi.com/api/v2/characters`)
            setCharsPics(charactersPics.data)

        }, 1350)
    }

    const resetTable = async () => {
        setLoadingReset(true)
        setTimeout(async () => {
            let endpoint = `https://anapioficeandfire.com/api/characters?page=${1}&pageSize=${10}`
            const response = await axios.get(endpoint)
            setChars(response.data)
            const charactersPics = await axios.get(`https://thronesapi.com/api/v2/characters`)
            setCharsPics(charactersPics.data)
            setLoadingReset(false)

        }, 1350)
    }



    const resetData = () => true
    const override: CSSProperties = {
        // display: "block",
        // margin: "auto auto",
        borderColor: "rgb(105, 23, 101)",
        // float: 'left',
        // margin: '5rem'
        marginLeft: '1.5em'
    };


    useEffect(() => {
        // getChars("1", "10")
    }, [])

    // console.log(charsPics)

    return (

        <Row >
            <Col md={8}>


                <Container id='characters-container' className='layout-basic-form layout-basic-table'>

                    <h4>Characters</h4>

                    <Table striped bordered hover size="sm" responsive='md' className='m-auto'>
                        <thead id='app-font'>
                            <tr>
                                <th style={{ fontFamily: 'arial' }}>#</th>
                                <th>Name</th>
                                <th>Culture</th>
                                <th>Gender</th>
                                <th>Aliases</th>
                                {/* <th>Died</th> */}
                                <th>Image</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody style={{ width: '50%', }}>
                            {/* {console.log('inline', characters)} */}
                            {characters.map((h: any, i: number) => {
                                const name = h.name.replace(" ", "-").toLowerCase()
                                const hasIt = charsPics.map((c: any) => c.image.split('.')[0]).includes(name)

                                return (
                                    <tr id="layout-basic-tr" key={i}>
                                        <td id="layout-basic-td"> {i === 0 ? `#${i}` : `#${i}`}</td>
                                        <td id="layout-basic-td"> {h.name}</td>
                                        <td id="layout-basic-td"> {h.culture}</td>
                                        <td id="layout-basic-td"> {h.gender}</td>
                                        <td id="layout-basic-td"> {h.aliases[0]}</td>
                                        {/* <td id="layout-basic-td"> {h.died !== "" ? h.died : ""}</td> */}
                                        {/* <td id="layout-basic-id">{charsPics.map((c: any) => c.imageUrl).includes(h.name.replace(" ", "-").toLowerCase()) ? <img src={`https://thronesapi.com/assets/images/${h.name.replace(" ", "-").toLowerCase()}.jpg`}></img> : null} </td> */}
                                        {/* <td id="layout-basic-td">{hasIt ? <img src={`https://thronesapi.com/assets/images/${name}.jpg`}></img> : null} </td> */}
                                        <td id="layout-basic-td">{hasIt ? <Button type='button' onClick={() => { setModalShow(true); setModalImg(`https://thronesapi.com/assets/images/${name}.jpg`); setModalData(h) }}>Image</Button> : null} </td>


                                        <td id="layout-basic-td"> {moment().subtract(1, 'days').calendar()}</td>
                                    </tr>
                                )
                            })}


                        </tbody>
                        {/* {characters[0] ? characters[0].name : ''} */}
                    </Table >
                    <Paginator setLoading={props.setLoading} records={1136} getChars={getChars} data={characters} setData={setChars} resetData={resetData} />
                    <AppModal data={modalData} modalShow={modalShow} setModalShow={setModalShow} modalImg={modalImg} />

                </Container>
            </Col>

            <Col md={4} className=''>
                <Container id='characters-container' className='layout-basic-form layout-basic-margin' >
                    <>
                        {/* <div id='splash-layer'> */}
                        {/* </div> */}


                        {/*  <Search handleFormSubmission={handleFormSubmission} setLoading={props.setLoading} getChars={getChars} setChars={setChars} 
                             name={nameQueryParam} setName={setNameQueryParam}
                             gender={genderQueryParam} setGender={setGenderQueryParam}
                             culture={cultureQueryParam} setCulture={setCultureQueryParam}
                             born={bornQueryParam} setBornQueryParam={setBornQueryParam}
                             died={diedQueryParam} setDiedQueryParam={setDiedQueryParam}
                             isAlive={isAliveQueryParam} setIsAliveQueryParam={setIsAliveQueryParam}
                         />
                        */}
                        <Form onSubmit={(e) => e.preventDefault()} id='basic-form' >
                            <h4>Search</h4>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control autoComplete='true' value={nameQueryParam} onChange={(e) => { setNameQueryParam(e.target.value) }} className='login-input login-email' type="text" placeholder="Name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control autoComplete='true' value={genderQueryParam} onChange={(e) => setGenderQueryParam(e.target.value)} className='login-input login-email' type="text" placeholder="Gender" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Culture</Form.Label>
                                <Form.Control autoComplete='true' value={cultureQueryParam} onChange={(e) => setCultureQueryParam(e.target.value)} className='login-input login-email' type="text" placeholder="Culture" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Born</Form.Label>
                                <Form.Control autoComplete='true' value={bornQueryParam} onChange={(e) => setBornQueryParam(e.target.value)} className='login-input login-email' type="text" placeholder="Born" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Died</Form.Label>
                                <Form.Control autoComplete='true' value={diedQueryParam} onChange={(e) => setDiedQueryParam(e.target.value)} className='login-input login-email' type="text" placeholder="Died" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Is Alive</Form.Label>

                                <Form.Check className='basic-check' type="checkbox" label="" checked={isAliveQueryParam === false ? false : true} onChange={(e) => setIsAliveQueryParam(!isAliveQueryParam)} />
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex">
                                {loading ? <CircleLoader color={'rgb(105, 23, 101)'}
                                    loading={loading}
                                    cssOverride={override}
                                    size={50}
                                    aria-label="Loading Spinner"
                                    data-testid="loader" /> :
                                    <Button style={{ float: 'left', marginRight: '0.5em', position: 'absolute' }} id='login-btn' type="button" variant="secondary" size='sm' onClick={(e: any) => handleFormSubmission(e, nameQueryParam, genderQueryParam, cultureQueryParam, bornQueryParam, diedQueryParam, isAliveQueryParam)}>
                                        Submit
                                    </Button>}

                                {loadingReset ? <CircleLoader color={'rgb(105, 23, 101)'}
                                    loading={loadingReset}
                                    cssOverride={override}
                                    size={50}
                                    aria-label="Loading Spinner"
                                    data-testid="loader" /> :
                                    <Button style={{ float: 'left' }} className="ml-5" id='login-btn' type="button" variant="secondary" size='sm' onClick={async (e: any) => await resetTable()}>
                                        Reset
                                    </Button>}
                            </Form.Group>
                        </Form>
                    </>
                </Container>
            </Col>
        </Row >


    );
}

export default CharactersTable;