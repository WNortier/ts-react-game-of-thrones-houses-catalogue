import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { Button, Container } from 'react-bootstrap';
import Paginator from '../Paginator';
import AppModal from '../Modal';




function CharactersTable(props: any) {


    // console.log(window.location)

    const [characters, setChars] = useState([])
    const [charsPics, setCharsPics] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [modalImg, setModalImg] = useState('')
    const [modalData, setModalData] = useState({})


    const getChars = async (page?: string, rows?: string) => {
        // console.log(page, rows)
        const response = await axios.get(`https://anapioficeandfire.com/api/characters?page=${page}&pageSize=${rows}`)
        // console.log(response.data)
        setChars(response.data)

        const charactersPics = await axios.get(`https://thronesapi.com/api/v2/characters`)
        setCharsPics(charactersPics.data)
    }

    useEffect(() => {
        getChars()
    }, [])

    useEffect(() => {
        getChars("1", "10")
    }, [])

    const resetData = () => true


    // console.log(charsPics)
    return (
        <Container id='characters-container' className='layout-basic-form layout-basic-table layout-basic-margin'>

            <h4>Characters</h4>

            <Table striped bordered hover size="sm" responsive='md' className='m-auto'>
                <thead id='app-font'>
                    <tr>
                        <th style={{ fontFamily: 'arial' }}>#</th>
                        <th>Name</th>
                        <th>Coat Of Arms</th>
                        <th>region</th>
                        <th>Overlord</th>
                        <th>Url</th>
                        <th>Image</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody style={{ width: '50%', }}>
                    {characters.map((h: any, i: number) => {
                        const name = h.name.replace(" ", "-").toLowerCase()
                        const hasIt = charsPics.map((c: any) => c.image.split('.')[0]).includes(name)

                        return (
                            <tr id="layout-basic-tr" key={i}>
                                <td id="layout-basic-td"> {i === 0 ? `#${i}` : `#${i}`}</td>
                                <td id="layout-basic-td"> {h.name}</td>
                                <td id="layout-basic-td"> {h.coatOfArms}</td>
                                <td id="layout-basic-td"> {h.region}</td>
                                <td id="layout-basic-td"> <Link to={h.overlord}></Link>{h.overlord}</td>
                                <td id="layout-basic-td"> <Link to={h.url}></Link>{h.url}</td>
                                {/* <td id="layout-basic-id">{charsPics.map((c: any) => c.imageUrl).includes(h.name.replace(" ", "-").toLowerCase()) ? <img src={`https://thronesapi.com/assets/images/${h.name.replace(" ", "-").toLowerCase()}.jpg`}></img> : null} </td> */}
                                {/* <td id="layout-basic-td">{hasIt ? <img src={`https://thronesapi.com/assets/images/${name}.jpg`}></img> : null} </td> */}
                                <td id="layout-basic-td">{hasIt ? <Button type='button' onClick={() => { setModalShow(true); setModalImg(`https://thronesapi.com/assets/images/${name}.jpg`); setModalData(h) }}>Image</Button> : null} </td>


                                <td id="layout-basic-td"> {moment().subtract(1, 'days').calendar()}</td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table >
            {characters.length ? <Paginator records={1136} getChars={getChars} data={characters} setData={setChars} resetData={resetData} /> : null}
            <AppModal data={modalData} modalShow={modalShow} setModalShow={setModalShow} modalImg={modalImg} />

        </Container>

    );
}

export default CharactersTable;