import { Col, Container, Row } from "react-bootstrap";

const Lore = () => {
  return (
    <Row className="mb-5">
      <Col md={12}>

        <Container
          id="books-container"
          className="layout-basic-form layout-basic-table layout-basic-margin"
          style={{ height: "85vh", padding: "2em" }}
        >
          <h4 id="app-font">Lore</h4>
          <iframe
            style={{ width: "100%", height: "100%" }}
            src="https://gameofthrones.fandom.com/wiki/Game_of_Thrones"
          ></iframe>
        </Container>
      </Col>
    </Row>
  );
};

export default Lore;
