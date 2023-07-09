import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Paginator from '../Paginator';

function BooksTable(props: any) {

    const [books, setBooks] = useState([])

    const getBooks = async (page?: string, rows?: string) => {
        const response = await axios.get(`https://anapioficeandfire.com/api/books?page=${page}&pageSize=${rows}`)
        console.log(response.data)
        setBooks(response.data)

    }

    useEffect(() => {
        getBooks("0", "10")
    }, [])

    const resetData = () => true

    return (
        <Container id='characters-container' className='layout-basic-form layout-basic-table layout-basic-margin'>

            <h4>Books</h4>

            <Table striped bordered hover size="sm" responsive='md' className='m-auto'>
                <thead id='app-font'>
                    <tr>
                        <th style={{ fontFamily: 'arial' }}>#</th>

                        <th>Name</th>
                        <th>ISBN</th>
                        <th>Media Type</th>
                        <th>Country</th>
                        {/* <th>Overlord</th> */}
                        <th>Authors</th>
                        <th>Pagecount</th>
                        <th>Released</th>
                    </tr>
                </thead>
                <tbody style={{ width: '50%' }}>
                    {books.map((h: any, i: number) => {
                        return (
                            <tr id="layout-basic-tr" key={i}>
                                <td id="layout-basic-td"> {i === 0 ? `#${i}` : `#${i}`}</td>
                                <td id="layout-basic-td"> {h.name}</td>
                                <td id="layout-basic-td"> {h.isbn}</td>
                                <td id="layout-basic-td"> {h.mediaType}</td>
                                <td id="layout-basic-td"> {h.country}</td>
                                <td id="layout-basic-td"> {h.authors[0]}</td>
                                <td id="layout-basic-td"> {h.numberOfPages}</td>
                                <td id="layout-basic-td"> {h.released.substring(0, 10)}</td>

                                {/* <td id="layout-basic-td"> <Link to={h.overlord}></Link>{h.overlord}</td> */}
                                {/* <td id="layout-basic-td"> <Link to={h.url}></Link>{h.url}</td> */}

                            </tr>
                        )
                    })}
                </tbody>
            </Table >
            {/* <Paginator data={houses} setData={getBooks} resetData={resetData} /> */}
            {books.length ? <Paginator records={books.length} getBooks={getBooks} data={books} setData={setBooks} resetData={resetData} /> : null}

        </Container>

    );
}

export default BooksTable;