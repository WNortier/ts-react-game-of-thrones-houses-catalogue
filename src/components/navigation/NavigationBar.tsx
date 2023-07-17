import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gear } from "react-bootstrap-icons";

function NavigationBar(props: {
  init?: string | null;
  showOffCanvasSettings: boolean;
  isLoggedIn: boolean;
  setLoading: (arg: boolean) => void;
  setIsLoggedIn: (arg: boolean) => void;
  setShowOffCanvasSettings: (arg: boolean) => void;
}) {
  const navigate = useNavigate();

  const links = ["houses", "characters", "books", "lore", "settings"];
  const [active, setActive] = useState("/books");
  const [gearColor, setGearColor] = useState("#f3f3f3");
  const dropdownLinks = ["users", "about"];

  useEffect(() => {
    const pathname = process.env.DEV
      ? window.location.pathname
      : "/" + window.location.pathname.split("/")[2];
    setActive(pathname);
  }, []);
  const handleUsersDropDownClick = (e: FormEvent, l: string) => {
    // console.log(l)
    // document.querySelector('.dropdown-toggle.nav-link.show')?.classList.remove('activeLink');
    // (document.querySelector('.dropdown-toggle') as HTMLDivElement)!.style!.color = '#f3f3f3';
    e.preventDefault();
    setActive("/" + l);
    props.setLoading(true);

    setTimeout(() => {
      navigate("/" + l);
      props.setLoading(false);
    }, 1500);
  };

  const handleUsersClick = (e: FormEvent, l: string) => {
    e.preventDefault();
    if (l === "users") setActive("/users");
    else setActive("/about");
    props.setLoading(true);
    document.querySelector(".dropdown-menu")?.classList.remove("show");
    // document.querySelector('.dropdown-toggle.nav-link.show')?.classList.remove('activeLink');
    // (document.querySelector('.dropdown-toggle') as HTMLDivElement)!.style!.color = '#f3f3f3';
    // console.log('pls')

    setTimeout(() => {
      // navigate('/users')
      navigate("/" + l);
      props.setLoading(false);
    }, 1500);
  };

  const handleBrandClick = () => {
    props.setLoading(true);
    setTimeout(() => {
      navigate("/home");

      props.setLoading(false);
    }, 2100);
  };

  const handleLogout = () => {
    props.setLoading(true);

    setTimeout(() => {
      props.setIsLoggedIn(false);
      localStorage.setItem("loggedin", "false");
      localStorage.setItem("stayLoggedIn", "false");
      localStorage.setItem("hasExited", "false");
      localStorage.removeItem("email");
      (document.getElementById("music") as HTMLAudioElement).pause();
      (document.getElementById("music") as HTMLAudioElement).currentTime = 0;
      (document.getElementById("video") as HTMLVideoElement).pause();
      (document.getElementById("video") as HTMLVideoElement).currentTime = 0;
      document.getElementById("video")!.style.display = "block";
      document.getElementById("video")!.classList.remove("begin");

      if (
        localStorage.getItem("disableLogin") === "false" &&
        localStorage.getItem("init") === "false"
      ) {
        // localStorage.setItem('loggedin', 'true');

        // (document.querySelector('#layout-basic-navbar') as HTMLElement).style.display = 'none'
        navigate("/");
      } else {
        navigate("/login");
      }

      props.setLoading(false);
    }, 1500);
  };

  // const handleShowOffCanvasSettings = () => {
  //   props.setShowOffCanvasSettings(!props.showOffCanvasSettings);
  // };

  // console.log(window.location.hash.replace("#", ""))
  // console.log(document.querySelector('#basic-nav-dropdown')?.classList.contains('show'))
  const checkActive = (navlink: string): string => {
    // console.log("/" + navlink, active)
    const pathname = process.env.DEV
      ? window.location.pathname
      : "/" + window.location.pathname.split("/")[2];
    const currActive =
      pathname === "/" + navlink ||
      navlink === "settings" ||
      navlink === "offcanvas"
        ? true
        : false;
    if (
      document
        .querySelector(".dropdown-toggle.nav-link")
        ?.classList.contains("show")
    ) {
      (document.querySelector(
        ".dropdown-toggle.nav-link.show",
      ) as HTMLDivElement)!.style!.color = "darkred";
      (document.querySelector(
        ".dropdown-toggle.nav-link.show",
      ) as HTMLDivElement)!.style!.border = "none";
    } else {
      // (document.querySelector('.nav-link-dropdown') as HTMLDivElement).style!.color = 'white';
      if (document.querySelector(".dropdown-toggle.nav-link"))
        (
          document.querySelector(".dropdown-toggle.nav-link") as HTMLDivElement
        ).style!.color = "#f3f3f3";
      // (document.querySelector('.nav-link-dropdown') as HTMLDivElement).style!.border = 'none';
      if (document.querySelector(".nav-link-dropdown"))
        document
          .querySelector(".nav-link-dropdown")
          ?.classList.remove("activeLink");
    }

    if (currActive) return "activeLink";
    else return "";
    // console.log(currActive)
  };

  useEffect(() => {
    if (props.showOffCanvasSettings) setActive("offcanvas");
    else setActive("");
  }, [props.showOffCanvasSettings]);
  return (
    <Navbar expand="lg" id="layout-basic-navbar" className="flex">
      <Navbar.Toggle aria-controls="layout-basic-navbar" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand
          onClick={handleBrandClick}
          className="nav-brand mr-auto"
          href=""
        >
          Game of Thrones Houses Catalogue
        </Navbar.Brand>
        <Nav className="ml-auto" id="basic-navbar-nav">
          {/*  // activeKey={active}
                    // onSelect={(selectedKey) => setActive(selectedKey!)}>
                    {/* <Nav.Link className="nav-link" href="#home">Home</Nav.Link> */}
          {/* <Nav.Link className="nav-link" href="#link">Houses</Nav.Link> */}
          {links.map((l: string, i: number) =>
            l === "settings" ? (
              <NavDropdown
                key={l}
                title={
                  active === ""
                    ? "Users"
                    : active === "/users"
                    ? "Users"
                    : active === "/about"
                    ? "About"
                    : "Users"
                }
                style={{ marginLeft: "0.2em" }}
                className={`nav-link-dropdown`}
                id="basic-nav-dropdown"
              >
                {/* <NavDropdown.Item className="nav-link-heading">Settings</NavDropdown.Item> */}
                {dropdownLinks.map((l: string, i: number) => (
                  <div
                    key={i}
                    style={{
                      marginTop: "0.9em",
                      marginBottom: "0.9em",
                      marginLeft: "0.2em",
                    }}
                    className={`${checkActive(l)} nav-link-dropdown`}
                    onClick={(e: FormEvent) => handleUsersClick(e, l)}
                  >
                    {l}
                  </div>
                ))}
              </NavDropdown>
            ) : (
              <Nav.Link
                key={i}
                disabled={false}
                className={`${checkActive(l)}`}
                onClick={(e) => {
                  handleUsersDropDownClick(e, l);
                }}
              >
                {l.substring(0, 1).toUpperCase() + l.substring(1)}
              </Nav.Link>
            ),
          )}
        </Nav>
        <div
          id="nav-settings"
          style={{ marginLeft: "1em", marginRight: "2em" }}
          onClick={() => {
            setActive("offcanvas");
            props.setShowOffCanvasSettings(!props.showOffCanvasSettings);
          }}
        >
          <Gear
            id="nav-settings"
            color={active === "offcanvas" ? "darkred" : gearColor}
            onMouseEnter={() => {
              setGearColor("darkred");
            }}
            onMouseLeave={() => setGearColor("white")}
          />
        </div>
        {localStorage.getItem("disableLogin") === "true" ? null : (
          <div
            style={{ marginLeft: "0.5em" }}
            id="logout-btn"
            onClick={() => handleLogout()}
          >
            Logout
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
