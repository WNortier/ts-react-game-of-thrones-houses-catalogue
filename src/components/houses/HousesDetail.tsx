import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import BreadcrumbExample from "../Breadcrumb";

function HousesTableMore() {
  const location = useLocation();
  const [houses, setHouses] = useState<{
    name: string;
    region: string;
    founded: string;
    coatOfArms: string;
    titles: string[];
  }>({ name: "", region: "", founded: "", coatOfArms: "", titles: [""] });
  const [seats, setSeats] = useState<string[]>([""]);
  const [resolvedMembers, setResolvedMembers] =
    useState<{ name: string; url: string; alias: string }[]>();
  const [heir, setHeir] = useState<string>();
  const [founder, setFounder] = useState<string>();
  const [titles, setTitles] = useState<string[]>([""]);
  const [currentLord, setCurrentLord] = useState<string>();

  const navigate = useNavigate();

  // const { name } = useParams();
  useEffect(() => {
    // getHouses("1", "10")
    getHouseMore(location.state.url);
  }, []);

  const getHouseMore = async (url: string) => {
    const response = await axios.get(url);
    setHouses(response.data);
    setSeats(response.data.seats);
    setTitles(response.data.titles);

    if (response.data.swornMembers.length > 0) {
      const data: { name: string; url: string; alias: string }[] = [];
      for (let i = 0; i < response.data.swornMembers.length; i++) {
        const res = await axios.get(response.data.swornMembers[i]);
        data.push({
          name: res.data.name,
          url: response.data.swornMembers[i],
          alias: res.data.alias,
        });
      }
      setResolvedMembers(data);
    }
    if (response.data.currentLord) {
      const currLord = await axios.get(response.data.currentLord);
      setCurrentLord(currLord.data.name);
    }

    if (response.data.heir) {
      const heir = await axios.get(response.data.heir);
      setHeir(heir.data.name);
    }
    if (response.data.founder) {
      const founder = await axios.get(response.data.founder);
      setFounder(founder.data.name);
    }
  };

  const handleMoreClick = (url: string, paramArg: string, alias: string) => {
    let arg: undefined | string = undefined;
    if (paramArg !== "") {
      arg =
        paramArg.split(" ").length === 1
          ? paramArg.split(" ")[0].toLowerCase()
          : `${paramArg.split(" ")[0].toLowerCase()}-${paramArg
            .split(" ")[1]
            .toLowerCase()}`;
    } else {
      arg =
        alias.split(" ").length === 1
          ? alias.split(" ")[0].toLowerCase()
          : `${alias.split(" ")[0].toLowerCase()}-${alias
            .split(" ")[1]
            .toLowerCase()}`;
    }
    navigate(`/characters/${arg}`, {
      state: {
        url: url,
      },
    });
  };

  return (
    <Container role="houses-detail">
      <Row className="mb-5">
        <BreadcrumbExample house={houses?.name} />
        <Col
          md={5}
          className="flex flex-center"
          style={{ alignItems: "start" }}
        >
          <Card
            className="layout-basic-form"
            style={{
              width: "25rem",
              margin: "3em",
              marginTop: "0px",
              border: "none",
              opacity: "0.88",
            }}
          >
            <Card.Img variant="top" src={"./houses-map.jpeg"} />
            <Card.Body>
              <Card.Title id="app-font" className="slowshake">
                {houses?.name}
              </Card.Title>
              <Card.Text style={{ color: "purple" }}>
                {houses?.region ? "Region:" : null}
                {houses?.region ? (
                  <span style={{ color: "black" }}>{` ${houses?.region}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {houses?.founded ? "Founded:" : null}
                {houses?.founded ? (
                  <span
                    style={{ color: "black" }}
                  >{` ${houses?.founded}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {founder ? "Founder:" : null}
                {founder ? (
                  <span style={{ color: "black" }}>{` ${founder}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>

              <Card.Text style={{ color: "purple" }}>
                {heir ? "Heir:" : null}
                {heir ? (
                  <span style={{ color: "black" }}>{` ${heir}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {currentLord ? "Current Lord:" : null}
                {currentLord ? (
                  <span style={{ color: "black" }}>{` ${currentLord}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text>{houses?.coatOfArms}</Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Container id="" className="layout-basic-form layout-basic-table">
            <Row>
              <Col xs={12} md={12} className="">
                <ListGroup className="mb-3">
                  <h4>Sworn Members</h4>
                  {resolvedMembers?.length !== 0 ? (
                    resolvedMembers?.map(
                      (
                        s: { name: string; url: string; alias: string },
                        i: number,
                      ) => (
                        <ListGroupItem
                          onClick={() =>
                            handleMoreClick(s.url, s.name, s.alias)
                          }
                          id="char-link"
                          key={i}
                          style={{ background: "#f7f4f4 " }}
                        >
                          {s.name}
                        </ListGroupItem>
                      ),
                    )
                  ) : (
                    <ListGroupItem
                      style={{ background: "lightgrey ", borderRadius: "3px" }}
                    >
                      {" "}
                      No sworn members found
                    </ListGroupItem>
                  )}
                </ListGroup>

                <ListGroup className="mb-3">
                  <h4>Seats</h4>
                  {seats?.length !== 0 && seats[0] !== "" ? (
                    seats?.map((s: string, i: number) => (
                      <ListGroupItem
                        key={i}
                        style={{ background: "#f7f4f4 ", borderRadius: "3px" }}
                      >
                        {s}
                      </ListGroupItem>
                    ))
                  ) : (
                    <ListGroupItem
                      style={{ background: "lightgrey ", borderRadius: "3px" }}
                    >
                      {" "}
                      No seats found
                    </ListGroupItem>
                  )}
                </ListGroup>

                <ListGroup className="mb-3">
                  <h4>Titles</h4>

                  {titles?.length !== 0 && titles[0] !== "" ? (
                    houses?.titles.map((s: string, i: number) => (
                      <ListGroupItem
                        key={i}
                        style={{ background: "#f7f4f4 ", borderRadius: "3px" }}
                      >
                        {s}
                      </ListGroupItem>
                    ))
                  ) : (
                    <ListGroupItem
                      style={{ background: "lightgrey ", borderRadius: "3px" }}
                    >
                      {" "}
                      No titles found
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Col>
            </Row>

            {/* <Paginator data={houses} setData={getHouses} resetData={resetData} /> */}
            {/* <Paginator records={444} getHouses={getHouses} data={houses} setData={setHouses} resetData={resetData} /> */}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default HousesTableMore;
