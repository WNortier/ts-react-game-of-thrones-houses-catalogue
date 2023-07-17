import React, { FormEvent, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function OffCanvasSettings(props: {
  setShowOffCanvasSettings: (arg: boolean) => void;
  showOffCanvasSettings: boolean;
}) {
  const [showVid, setShowVid] = useState(
    localStorage.getItem("init") === "true" ? true : false,
  );
  // const [showAdditionalSettings, setShowAdditionalSettings] = useState(false);
  const [pause, setPause] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);
  const [disableVaryCheckbox, setDisableVaryCheckbox] = useState(false);

  const handleShow = () =>
    props.setShowOffCanvasSettings(!props.showOffCanvasSettings);

  const handleVideoSettingCheckbox = () => {
    if (showVid === true) {
      setShowVid(false);
      setDisableVaryCheckbox(false);
      localStorage.setItem("init", String('false'));
      localStorage.setItem("disableVary", String('true'));
    } else {
      setShowVid(true);
      setDisableVaryCheckbox(true);
      localStorage.setItem("init", String('true'));
      localStorage.setItem("disableVary", String('false'));
    }
  };

  const handlePauseMusic = () => {
    setPause(!pause);
    localStorage.setItem("pause", pause === true ? "true" : "false");
    if (pause === true) {
      (document.getElementById("music") as HTMLAudioElement).pause();
    } else {
      (document.getElementById("music") as HTMLAudioElement).play();
    }
  };

  const handleChangeSettings = (e: FormEvent) => {
    e.preventDefault();
    props.setShowOffCanvasSettings(!props.showOffCanvasSettings);
  };

  const handleRangeChange = (r: React.ChangeEvent<HTMLInputElement>) => {
    (document.getElementById("music") as HTMLAudioElement)!.volume =
      +r.target.value === 100 ? 1 : +("0" + "." + r.target.value);
  };

  const handleDisableLogin = () => {
    setDisableLogin(!disableLogin);
    localStorage.setItem("disableLogin", String(!disableLogin));
    localStorage.setItem("loggedin", String(true));
  };

  const handleDisableVaryCheckbox = () => {
    // if (disableVaryCheckbox === true) {
    // setShowVid(false);
    setDisableVaryCheckbox(!disableVaryCheckbox);
    localStorage.setItem("disableVary", String(!disableVaryCheckbox));


    // }
    // setDisableVaryCheckbox(!disableVaryCheckbox);
  };

  return (
    <>
      <Offcanvas
        className="layout-basic-offcanvas"
        show={props.showOffCanvasSettings}
        onHide={handleShow}
        backdrop="static"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="app-font" className="nav-brand">
            Settings
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form id="offcanvas-settings-form">
            {/* <Form.Group className="mb-1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoComplete='true' value={userEmail} onChange={(e) => handleEmailInputChange(e)} id="login-email" className='layout-basic-input' type="email" placeholder="Email" />
                    </Form.Group>


                    {errors.emailErr ? <div>
                        <Form.Text className="text" style={{ color: 'red' }}>Invalid Email</Form.Text>
                    </div> : null} */}

            <Offcanvas.Title id="app-font" style={{ color: "#663868" }}>
              Media
            </Offcanvas.Title>

            <Form.Group
              className="ml-4 mt-2 mb-3"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                className="basic-check"
                type="checkbox"
                label="Pause music"
                checked={
                  localStorage.getItem("pause") === "false" ? false : true
                }
                onChange={() => handlePauseMusic()}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Adjust Volume</Form.Label>

              <Form.Range max="100" onChange={(r) => handleRangeChange(r)} />
            </Form.Group>

            <hr />
            <Offcanvas.Title id="app-font" style={{ color: "#663868" }}>
              Application
            </Offcanvas.Title>

            <Form.Group
              className="ml-4 mt-2 mb-3"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                className="basic-check"
                type="checkbox"
                label="Disable authentication"
                checked={
                  localStorage.getItem("disableLogin") === "true" ? true : false
                }
                onChange={() => handleDisableLogin()}
              />
            </Form.Group>
            {localStorage.getItem("disableLogin") === "false" ? (
              <Form.Group
                className="ml-4 mt-2 mb-3"
                controlId="formBasicCheckbox"
              >
                <Form.Check
                  className="basic-check"
                  type="checkbox"
                  label="Re-enable login cinematic"
                  checked={
                    localStorage.getItem("init") === "true" ? false : true
                  }
                  onChange={() => handleVideoSettingCheckbox()}
                />
              </Form.Group>
            ) : null}
            <Form.Group
              className="ml-4 mt-2 mb-3"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                className="basic-check"
                type="checkbox"
                label="Disable varying wallpaper"
                disabled={!showVid}
                checked={
                  localStorage.getItem("disableVary") === "true" ? true : false
                }
                onChange={() => handleDisableVaryCheckbox()}
              />
            </Form.Group>
            <Button
              id="login-btn"
              onClick={(e: FormEvent) => handleChangeSettings(e)}
              variant="secondary"
              type="submit"
              size="sm"
            >
              Submit
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasSettings;
