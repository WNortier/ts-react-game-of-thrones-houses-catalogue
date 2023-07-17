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

const CharacterDetail = () => {
  const location = useLocation();
  const [books, setResolvedBooks] = useState<string[]>([]);
  const [allegiances, setResolvedAllegiances] = useState<
    { name: string; url: string }[]
  >([]);
  const [data, setData] = useState<{
    name: string;
    aliases: string[];
    gender: string;
    culture: string;
    father: string;
    mother: string;
    born: "";
    died?: boolean;
  }>({
    name: "",
    aliases: [],
    gender: "",
    culture: "",
    father: "",
    mother: "",
    born: "",
    died: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getCharacter(location.state.url);
  }, []);

  const getCharacter = async (url: string) => {
    const response = await axios.get(url);
    setData(response.data);

    if (response.data.books.length > 0) {
      const data: string[] = [];
      for (let i = 0; i < response.data.books.length; i++) {
        const res = await axios.get(response.data.books[i]);
        data.push(res.data.name);
      }
      setResolvedBooks(data);
    }

    if (response.data.allegiances.length > 0) {
      const data: { name: string; url: string }[] = [];
      for (let i = 0; i < response.data.allegiances.length; i++) {
        const res = await axios.get(response.data.allegiances[i]);
        data.push({ name: res.data.name, url: response.data.allegiances[i] });
      }
      setResolvedAllegiances(data);
    }
  };

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
    <Container role="character-detail">
      <BreadcrumbExample
        name={data?.name === "" ? data?.aliases[0] : data?.name}
      />
      <Row className="mb-5">
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
            {location.state.imageUrl ? (
              <Card.Img variant="top" src={location.state.imageUrl} />
            ) : null}
            <Card.Body>
              <Card.Title id="app-font" className="slowshake mb-3">
                {data?.name}
              </Card.Title>
              <Card.Text style={{ color: "purple" }}>
                {data.name ? "Name:" : null}
                {data?.name ? (
                  <span style={{ color: "black" }}>{` ${data?.name}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {data.aliases ? "Alias:" : null}
                {data?.aliases ? (
                  <span
                    style={{ color: "black" }}
                  >{` ${data?.aliases[0]}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {data.gender ? "Gender:" : null}
                {data?.gender ? (
                  <span style={{ color: "black" }}>{` ${data?.gender}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {data.culture ? "Culture:" : null}
                {data?.culture ? (
                  <span style={{ color: "black" }}>{` ${data?.culture}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {data?.father ? "Father:" : null}
                {data?.father ? (
                  <span style={{ color: "black" }}>{` ${data?.father}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {data.mother ? "Mother:" : null}
                {data?.mother ? (
                  <span style={{ color: "black" }}>{` ${data?.mother}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {data.born ? "Born:" : null}
                {data?.born ? (
                  <span style={{ color: "black" }}>{` ${data?.born}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
              <Card.Text style={{ color: "purple" }}>
                {data.died ? "Died:" : null}
                {data?.died ? (
                  <span style={{ color: "black" }}>{` ${data?.died}`}</span>
                ) : (
                  ""
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Container id="" className="layout-basic-form layout-basic-table">
            <Row>
              <Col xs={12} md={12} className="">
                <ListGroup className="mb-3">
                  <h4>Allegiances</h4>
                  {allegiances?.length !== 0 ? (
                    allegiances?.map(
                      (s: { name: string; url: string }, i: number) => (
                        <ListGroupItem
                          onClick={() => handleMoreClick(s.url, s.name)}
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
                      No allegiances found
                    </ListGroupItem>
                  )}
                </ListGroup>
                <ListGroup className="mb-3">
                  <h4>Books</h4>
                  {books?.length !== 0 ? (
                    books?.map((s: string, i: number) => (
                      <ListGroupItem
                        onClick={() => navigate("/books")}
                        id="char-link"
                        key={i}
                        style={{ background: "#f7f4f4 " }}
                      >
                        {s}
                      </ListGroupItem>
                    ))
                  ) : (
                    <ListGroupItem
                      style={{ background: "lightgrey ", borderRadius: "3px" }}
                    >
                      {" "}
                      No television series found
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CharacterDetail;
