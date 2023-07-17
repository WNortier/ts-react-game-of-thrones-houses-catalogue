import { useState, useEffect } from "react";
import NavigationBar from "./components/navigation/NavigationBar";
import Container from "react-bootstrap/Container";
import LoginForm from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Splash from "./pages/Splash";
import PrimaryTable from "./pages/Users";
import CharactersTable from "./pages/Characters";
import { CircleLoader } from "react-spinners";
import BooksTable from "./pages/Books";
import { Breadcrumb } from "react-bootstrap";
import Preferences from "./pages/About";
import HousesTable from "./pages/Houses";
import OffCanvas from "./components/OffCanvas";
import HousesTableMore from "./components/houses/HousesDetail";
import Lore from "./pages/Lore";
import CharactersMore from "./components/characters/CharacterDetail";

function App() {
  const [bg, setBg] = useState('./mainbg01.jpeg');
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("stayLoggedIn") === "true" ? true : false || false,
  );
  const [videoComplete, setVideoComplete] = useState(false);
  const [init] = useState(localStorage.getItem("init"));
  const [loading, setLoading] = useState(false);

  const [showOffCanvasSettings, setShowOffCanvasSettings] = useState(false);

  useEffect(() => {

    const base = process.env.DEV ? './' : './'

    if (localStorage.getItem("disableVary") === "true") {
      setBg(base + "houses.jpeg");
    } else {
      const path = window.location.pathname
        .split("/")[process.env.DEV ? 0 : 1]?.substring(0, 5);
      if (path === "house" || path === "chara") {
        setBg(base + "houses.jpeg");
      } else if (path === "books" || path === "lore" || path === "/*") {
        setBg(base + "mainbg01.jpeg");
      } else {
        setBg(base + "books.jpeg");
      }
    }
  }, [window.location.pathname]);


  useEffect(() => {
    document.getElementById("video")?.classList.add("invis");
    document.querySelector("#layout-basic-navbar")?.classList.add("invis")

    if (localStorage.getItem("flush") !== "true") {
      localStorage.setItem("flush", "true");
      localStorage.setItem("hasExited", "false");
      localStorage.setItem("loggedin", "false");
      // localStorage.setItem("disableLogin", "false");
      localStorage.setItem("init", "false");
      localStorage.setItem("flush", "false");
    }

    if (localStorage.getItem("disableLogin") === "true") {
      localStorage.setItem("loggedin", "true");
    } else {
      localStorage.setItem("disableLogin", "false")
    }
  }, []);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgb(105, 23, 101)",
  };

  const appLoader = (
    <div
      style={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        marginTop: "15em",
      }}
    >
      <CircleLoader
        color={"rgb(105, 23, 101)"}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );

  const handleSetInit = () => {
    const init = localStorage.getItem("init");
    if (init) {
      if (init === "true") localStorage.setItem("init", "false");
    } else localStorage.setItem("init", "true");
  };

  return (
    <Container
      id="main-container"
      style={{
        backgroundImage: `url(${bg})`,
        padding: window.location.pathname === "/" ? "0px" : "2em",
      }}
      fluid
    >
      {/* <div id='splash-layer'>
      </div> */}

      {localStorage.getItem("loggedin") === "true" ? <Breadcrumb /> : null}
      {/* <RouterProvider router={router} /> */}

      {localStorage.getItem("loggedin") === "true" ||
        (localStorage.getItem("disableLogin") !== "true" &&
          window.location.pathname === "/") ? (
        <NavigationBar
          showOffCanvasSettings={showOffCanvasSettings}
          setShowOffCanvasSettings={setShowOffCanvasSettings}
          setLoading={setLoading}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : null}
      <Routes>
        <Route path={"/"} index element={<Splash />} />
        <Route
          path="/login"
          element={
            <LoginForm
              init={init}
              setInit={handleSetInit}
              setVideoComplete={setVideoComplete}
              videoComplete={videoComplete}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/users"
          element={
            loading ? (
              appLoader
            ) : localStorage.getItem("loggedin") === "true" ? (
              <PrimaryTable />
            ) : (
              <></>
            )
          }
        />
        <Route
          path="/books"
          element={
            loading ? (
              appLoader
            ) : localStorage.getItem("loggedin") === "true" ? (
              <BooksTable />
            ) : (
              <></>
            )
          }
        />
        <Route
          path="/characters"
          element={
            loading ? (
              appLoader
            ) : localStorage.getItem("loggedin") === "true" ? (
              <CharactersTable setLoading={setLoading} />
            ) : (
              <></>
            )
          }
        />
        <Route
          path="/characters/:name"
          element={
            loading ? (
              appLoader
            ) : localStorage.getItem("loggedin") === "true" ? (
              <CharactersMore />
            ) : (
              <></>
            )
          }
        />

        <Route
          path="/houses"
          element={
            loading ? (
              appLoader
            ) : localStorage.getItem("loggedin") === "true" ? (
              <HousesTable />
            ) : (
              <></>
            )
          }
        />
        <Route
          path="/houses/:name"
          element={
            loading ? (
              appLoader
            ) : localStorage.getItem("loggedin") === "true" ? (
              <HousesTableMore />
            ) : (
              <></>
            )
          }
        />

        <Route
          path="/about"
          element={
            loading ? (
              appLoader
            ) : localStorage.getItem("loggedin") === "true" ? (
              <Preferences />
            ) : (
              <></>
            )
          }
        />
        <Route
          path="/lore"
          element={
            loading ? (
              appLoader
            ) : localStorage.getItem("loggedin") === "true" ? (
              <Lore />
            ) : (
              <></>
            )
          }
        />
        <Route
          path="/home"
          element={
            loading ? (
              appLoader
            ) : localStorage.getItem("loggedin") === "true" ? (
              <HousesTable />
            ) : (
              <></>
            )
          }
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>

      <OffCanvas
        showOffCanvasSettings={showOffCanvasSettings}
        setShowOffCanvasSettings={setShowOffCanvasSettings}
      />

      <audio id="music">
        <source src="./mythical.mp3" type="audio/mpeg"></source>
      </audio>
      <video muted id="video" loop>
        <source src="./got.mp4" type="video/mp4"></source>
      </video>
    </Container>
  );
}

export default App;
