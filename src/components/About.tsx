import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

const About = (props: any) => {

    const [user, setUser] = useState<any>({})

    const warwick = async () => {
        const res = await axios.get('https://api.github.com/users/wnortier')
        setUser(res.data)
    }


    useEffect(() => {
        warwick()
    }, [])

    return (

        <Row className='flex flex-center h-100'>
            <Col className='flex flex-center' md={4} >
                <Card className='layout-basic-form' id="about" style={{ width: '25rem', margin: '3em', border: 'none', opacity: '1' }}>
                    <Card.Img variant="top" style={{ borderRadius: '50%' }} src="https://avatars.githubusercontent.com/u/45207010?v=4" />
                    <Card.Body>
                        <Card.Title id='app-font' className="slowshake">About</Card.Title>

                        <Card.Text style={{ color: 'purple' }}>
                            Author:
                            <span style={{ color: 'black' }}>{` ${user?.name} (${user?.id})`}</span>
                        </Card.Text>
                        <Card.Text style={{ color: 'purple' }}>
                            Created:
                            <span style={{ color: 'black' }}>{` ${user.created_at}`}</span>
                        </Card.Text>
                        <Card.Text style={{ color: 'purple' }}>
                            Company:
                            <span style={{ color: 'black' }}>{` ${user?.company}`}</span>
                        </Card.Text>
                        <Card.Text style={{ color: 'purple' }}>
                            Github:
                            <a style={{ display: 'inline-block' }} about="_blank" href={user?.html_url}> {` ${user?.html_url}`}</a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col >
        </Row >


    )

}

export default About