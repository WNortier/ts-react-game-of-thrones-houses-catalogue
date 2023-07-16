import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

function MydModalWithGrid(props: {
  data: { name: string };
  modalImg: string;
  onHide: () => void;
  show: boolean;
}) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="app-font" className="nav-brand">
          {props.data.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} md={12} className="flex flex-center">
              <img
                src={props.modalImg}
                height="225"
                style={{ border: "#603B3B solid brown", borderRadius: "5px" }}
              />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button id="modal-btn" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function AppModal(props: {
  data: { name: string };
  modalShow: boolean;
  modalImg: string;
  setModalShow: (arg: boolean) => void;
  show?: boolean;
}) {
  return (
    <MydModalWithGrid
      data={props.data}
      show={props.modalShow}
      modalImg={props.modalImg}
      onHide={() => props.setModalShow(false)}
    />
  );
}

export default AppModal;
