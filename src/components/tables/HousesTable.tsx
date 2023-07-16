import { useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import Paginator from "../Paginator";

function HousesTable() {
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  // const [navigate, setNavigate] = useState()

  const getHouses = async (page?: string, rows?: string) => {
    const response = await axios.get(
      `https://anapioficeandfire.com/api/houses?page=${page}&pageSize=${rows}`,
    );
    console.log(response.data);
    setHouses(response.data);
  };

  const resetData = () => true;

  const handleMoreClick = (url: string, paramArg: string) => {
    const arg = `${paramArg.split(" ")[0].toLowerCase()}-${paramArg
      .split(" ")[1]
      .toLowerCase()}`;
    navigate(`/houses/${arg}`, {
      state: {
        url: url,
      },
    });
  };

  return (
    <Row className="mb-5">
      <Col md={12}>
        <Container
          fluid
          id="books-container"
          className="layout-basic-form layout-basic-table"
        >
          <h4>Houses</h4>

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
                {/* <th style={{ fontFamily: 'arial' }}>#</th> */}

                <th>Name</th>
                <th>Region</th>
                <th>Coat of Arms</th>
                <th>Overlord</th>
              </tr>
            </thead>
            <tbody style={{ width: "50%" }}>
              {houses.map(
                (
                  h: {
                    name: string;
                    region: string;
                    coatOfArms: string;
                    url: string;
                  },
                  i: number,
                ) => {
                  return (
                    <tr id="layout-basic-tr" key={i}>
                      {/* <td id="layout-basic-td"> {i === 0 ? `#${i}` : `#${i}`}</td> */}
                      <td id="layout-basic-td"> {h.name}</td>
                      <td id="layout-basic-td"> {h.region}</td>
                      <td id="layout-basic-td"> {h.coatOfArms}</td>
                      <td id="layout-basic-td">
                        <Button
                          id="explore-btn"
                          type="button"
                          onClick={() => handleMoreClick(h.url, h.name)}
                        >
                          More
                        </Button>{" "}
                      </td>
                      {/* <td id="layout-basic-td"> <Link to={h.url}></Link>{h.url}</td> */}
                    </tr>
                  );
                },
              )}
            </tbody>
          </Table>
          {/* <Paginator data={houses} setData={getHouses} resetData={resetData} /> */}
          <Paginator
            records={444}
            getHouses={getHouses}
            data={houses}
            setData={setHouses}
            resetData={resetData}
          />
        </Container>
      </Col>
    </Row>
  );
}

export default HousesTable;
