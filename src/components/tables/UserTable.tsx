import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Form, useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { Container } from 'react-bootstrap';
import useTsPaginator from 'ts-paginator';
import Paginator from '../Paginator';
import { generateUsers } from '../../data/users';
import React from 'react';




function UsersTable(props: any) {

    const [appUsers, setAppUsers] = useState<{ name: string, email: string, pass: string }[]>(generateUsers())

    const resetData = () => setAppUsers(generateUsers())

    const setAppUsersHandler = (newUsers: { name: string, email: string, pass: string }[]) => {
        setAppUsers(newUsers)
    }

    const generateRandomNumber = () => String(Math.random() * 10).substring(0, 1)
    return (
        <Container fluid id='characters-container' className='layout-basic-form layout-basic-table layout-basic-margin'>

            <h4>Users</h4>

            <Table striped bordered hover size="sm" className='layout-basic'>
                <thead>
                    <tr>
                        <th style={{ fontFamily: 'arial' }}>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {appUsers.map((u, i: number) => {
                        return (
                            <tr key={i}>
                                <td> {"#" + generateRandomNumber() + generateRandomNumber() + generateRandomNumber()}</td>
                                <td> {u.name}</td>
                                <td> {u.email}</td>
                                <td> {moment().subtract(1, 'days').calendar()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table >
            <Paginator records={generateUsers().length} data={generateUsers()} setUserData={setAppUsersHandler} resetData={resetData} />

        </Container>

    );
}

export default UsersTable;