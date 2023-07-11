import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Form, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Paginator from '../Paginator';
import { generateUsers } from '../../data/users';
import React from 'react';




function HousesTableMore(props: any) {


    const location = useLocation()
    const [houses, setHouses] = useState<any>([])
    const [houseName, setHouseName] = useState<string>('')
    const [seats, setSeats] = useState<any>([])
    const [swornMembers, setSwornMembers] = useState<any>([])
    const [resolvedMembers, setResolvedMembers] = useState<any>([])
    const [heir, setHeir] = useState<any>()
    const [founder, setFounder] = useState<any>()
    const [titles, setTitles] = useState<any>([])
    // const [seats, setSeats] = useState<any>([])





    const [currentLord, setCurrentLord] = useState('')

    const navigate = useNavigate()

    const { name } = useParams()
    useEffect(() => {
        // getHouses("1", "10")
        getHouseMore(location.state.url)
    }, [])

    const getHouseMore = async (url: string, page?: string, rows?: string) => {
        const response = await axios.get(url)
        // console.log(response.data)
        setHouses(response.data)
        setSeats(response.data.seats)
        setTitles(response.data.titles)
        setSwornMembers(response.data.swornMembers)

        let data: any = []
        for (let i = 0; i < response.data.swornMembers.length; i++) {
            let res = await axios.get(response.data.swornMembers[i])
            data.push(res.data.name)
            setResolvedMembers(data)
        }
        if (response.data.heir) {
            const currLord = await axios.get(response.data.currentLord)
            setCurrentLord(currLord.data.name)
        }

        if (response.data.currentLord) {
            const heir = await axios.get(response.data.heir)
            setHeir(heir.data.name)
        }
        if (response.data.founder) {

            const founder = await axios.get(response.data.founder)
            setFounder(founder.data.name)
        }

    }

    const setHouseNameHandler = () => {
        // setHouseName(name ? name : '')
    }

    // setHouseNameHandler()


    const resetData = () => true

    const handleMoreClick = (url: string, paramArg: string) => {
        navigate(`/houses/:name/${paramArg}`, {
            state: {
                url: url
            }
        })
    }



    return (
        <Container>

            <Row className='mb-5'>
                <Col md={5} className='flex flex-center' style={{ alignItems: 'start' }}>
                    <Card className='layout-basic-form' style={{ width: '25rem', margin: '3em', border: 'none', opacity: '0.88' }}>
                        <Card.Img variant="top" src="./houses-map.jpeg" />
                        <Card.Body>
                            <Card.Title id='app-font' className="slowshake">{houses?.name}</Card.Title>
                            <Card.Text style={{ color: 'purple' }}>
                                {houses?.region ? 'Region:' : null}
                                {houses?.region ? <span style={{ color: 'black' }}>{` ${houses?.region}`}</span> : ''}
                            </Card.Text>
                            <Card.Text style={{ color: 'purple' }}>
                                {houses?.founded ? 'Founded:' : null}
                                {houses?.founded ? <span style={{ color: 'black' }}>{` ${houses?.founded}`}</span> : ''}
                            </Card.Text>
                            <Card.Text style={{ color: 'purple' }}>
                                {founder ? 'Founder:' : null}
                                {founder ? <span style={{ color: 'black' }}>{` ${founder}`}</span> : ''}
                            </Card.Text>

                            <Card.Text style={{ color: 'purple' }}>
                                {heir ? 'Heir:' : null}
                                {heir ? <span style={{ color: 'black' }}>{` ${heir}`}</span> : ''}
                            </Card.Text>
                            <Card.Text style={{ color: 'purple' }}>
                                {currentLord ? 'Current Lord:' : null}
                                {currentLord ? <span style={{ color: 'black' }}>{` ${currentLord}`}</span> : ''}
                            </Card.Text>
                            <Card.Text>
                                {houses?.coatOfArms}
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Container id='books-container' className='layout-basic-form layout-basic-table'>

                        <Row>

                            <Col xs={12} md={12} className=''>



                                <ListGroup className="mb-3">
                                    <h4>Sworn Members</h4>
                                    {resolvedMembers?.length !== 0 ? resolvedMembers?.map((s: any, i: number) =>

                                        <ListGroupItem key={i} style={{ background: '#f7f4f4 ' }}>{s}</ListGroupItem>
                                    ) : <ListGroupItem style={{ background: 'lightgrey ', borderRadius: '3px' }}> No sworn members found</ListGroupItem>}
                                </ListGroup>



                                <ListGroup className="mb-3">
                                    <h4>Seats</h4>
                                    {seats?.length !== 0 ? seats?.map((s: any, i: number) =>

                                        <ListGroupItem key={i} style={{ background: '#f7f4f4 ', borderRadius: '3px' }}>{s}</ListGroupItem>
                                    ) :
                                        <ListGroupItem style={{ background: 'lightgrey ', borderRadius: '3px' }}> No sworn members found</ListGroupItem>}
                                </ListGroup>


                                <ListGroup className="mb-3">
                                    <h4>Titles</h4>

                                    {titles?.length !== 0 && titles[0] !== '' ? houses?.titles.map((s: any, i: number) =>

                                        <ListGroupItem key={i} style={{ background: '#f7f4f4 ', borderRadius: '3px' }}>{s}</ListGroupItem>
                                    ) :
                                        <ListGroupItem style={{ background: 'lightgrey ', borderRadius: '3px' }}> No titles members found</ListGroupItem>}
                                </ListGroup>

                            </Col>

                        </Row>

                        {/* <Paginator data={houses} setData={getHouses} resetData={resetData} /> */}
                        {/* <Paginator records={444} getHouses={getHouses} data={houses} setData={setHouses} resetData={resetData} /> */}
                    </Container>
                </Col>
            </Row >
        </Container>


    );
}

export default HousesTableMore;