import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Container, Row } from "react-bootstrap";
import Paginator from "../components/Paginator";
import { GOTService } from "../api/api";

const Books = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async (page?: string, rows?: string) => {
    const apiService = GOTService();
    const data = await apiService.getBooks(page, rows);
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks("1", "10");
  }, []);

  const resetData = () => true;

  return (
    <Row className="mb-5">
      <Col md={12}>
        <Container
          fluid
          id="books-container"
          className="layout-basic-form layout-basic-table layout-basic-margin"
          style={{ height: "88%", padding: "2em" }}
        >
          <h4>Books</h4>
          <Table
            striped
            bordered
            hover
            size="sm"
            responsive="md"
            className="m-auto"
          >
            <thead id="app-font">
              <tr>
                <th>Name</th>
                <th>ISBN</th>
                <th>Media Type</th>
                <th>Country</th>
                <th>Authors</th>
                <th>Publisher</th>
                <th>Pagecount</th>
                <th>Released</th>
              </tr>
            </thead>
            <tbody style={{ width: "50%" }}>
              {books.map(
                (
                  h: {
                    name: string;
                    isbn: string;
                    mediaType: string;
                    country: string;
                    authors: string[];
                    publisher: string;
                    numberOfPages: string;
                    released: string;
                  },
                  i: number,
                ) => {
                  return (
                    <tr id="layout-basic-tr" key={i}>
                      <td id="layout-basic-td"> {h.name}</td>
                      <td id="layout-basic-td"> {h.isbn}</td>
                      <td id="layout-basic-td"> {h.mediaType}</td>
                      <td id="layout-basic-td"> {h.country}</td>
                      <td id="layout-basic-td"> {h.authors[0]}</td>
                      <td id="layout-basic-td"> {h.publisher}</td>
                      <td id="layout-basic-td"> {h.numberOfPages}</td>
                      <td id="layout-basic-td">
                        {" "}
                        {h.released.substring(0, 10)}
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </Table>
          {books.length ? (
            <Paginator
              records={12}
              getBooks={fetchBooks}
              data={books}
              setData={setBooks}
              resetData={resetData}
            />
          ) : null}
        </Container>
      </Col>
    </Row>
  );
};

export default Books;
