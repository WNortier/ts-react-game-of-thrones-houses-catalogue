import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Form, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import Paginator from '../Paginator';
import { generateUsers } from '../../data/users';




function HousesTable(props: any) {



    const [houses, setHouses] = useState([])

    const getHouses = async (page?: string, rows?: string) => {
        const response = await axios.get(`https://anapioficeandfire.com/api/houses?page=${page}&pageSize=${rows}`)
        // console.log(response.data)
        setHouses(response.data)

    }

    useEffect(() => {
        getHouses("0", "10")
    }, [])

    const resetData = () => true



    return (
        <Container id='characters-container' className='layout-basic-form layout-basic-table layout-basic-margin'>

            <h4>Houses</h4>

            <Table striped bordered hover size="sm" responsive='md' className='m-auto'>
                <thead id='app-font'>
                    <tr>
                        <th style={{ fontFamily: 'arial' }}>#</th>

                        <th>Name</th>
                        <th>Region</th>
                        <th>Coat of Arms</th>
                        <th>Overlord</th>


                    </tr>
                </thead>
                <tbody style={{ width: '50%' }}>
                    {houses.map((h: any, i: number) => {
                        return (
                            <tr id="layout-basic-tr" key={i}>
                                <td id="layout-basic-td"> {i === 0 ? `#${i}` : `#${i}`}</td>
                                <td id="layout-basic-td"> {h.name}</td>
                                <td id="layout-basic-td"> {h.region}</td>
                                <td id="layout-basic-td"> {h.coatOfArms}</td>
                                <td id="layout-basic-td"><Button type='button' onClick={() => { true }}>Explore</Button> </td>
                                {/* <td id="layout-basic-td"> <Link to={h.url}></Link>{h.url}</td> */}

                            </tr>
                        )
                    })}
                </tbody>
            </Table >
            {/* <Paginator data={houses} setData={getHouses} resetData={resetData} /> */}
            {houses.length ? <Paginator records={houses.length} getHouses={getHouses} data={houses} setData={setHouses} resetData={resetData} /> : null}

        </Container>

    );
}

export default HousesTable;