import { useState, useEffect } from 'react'
import NavigationBar from './components/navigation/NavigationBar'
import Container from 'react-bootstrap/Container';
import LoginForm from './components/forms/Login';
import axios from 'axios'
import { HashRouter, createBrowserRouter, RouterProvider, useNavigate, BrowserRouter } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Routes } from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import Splash from './components/Splash';
import PrimaryTable from './components/tables/UserTable';
import CharactersTable from './components/tables/CharactersTable';
import { CircleLoader } from 'react-spinners';
import BooksTable from './components/tables/BooksTable';
import { Breadcrumb } from 'react-bootstrap';
import AppModal from './components/Modal';
import Preferences from './components/Preferences';
import Home from './components/Home';
import HousesTable from './components/tables/HousesTable';
import OffCanvas from './components/OffCanvas';


function App() {
  const [count, setCount] = useState(0)
  const [bg, setBg] = useState("mainbg01.jpeg")
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('stayLoggedIn') === 'true' ? true : false || false)
  const [videoComplete, setVideoComplete] = useState(false)
  const [init, setInit] = useState(localStorage.getItem('init'))
  const [usersO, setUsersO] = useState(0)
  const [loading, setLoading] = useState(false)

  const [showOffCanvasSettings, setShowOffCanvasSettings] = useState(false)

  const getHouses = async () => {
    const response = await axios.get('https://www.anapioficeandfire.com/api/characters?page=1&pageSize=500')
    console.log(response.data)
  }

  useEffect(() => {
    // if (!init) {
    document.getElementById('video')?.classList.add('invis')
    // localStorage.getItem('email')! !== '' ? localStorage.setItem('email', '') : null
    // document.querySelector('#login-form')?.classList.add('invis')
    // document.querySelector('#layout-basic-navbar')?.classList.add('invis')
    // if (document.getElementById('splash-layer'))
    // document.getElementById('splash-layer')?.classList.add('begin');
    // }

    // window.location.pathname = '/chars's
    // setIsLoggedIn(true)

    // getHouses()
  }, [])
  // setInterval(() => {
  //   switch (bg) {
  //     case "./src/assets/mainbg01.jpeg": {
  //       setBg("./assets/mainbg01.jpeg")
  //       break
  //     }
  //     case "./assets/mainbg01.jpeg": {
  //       setBg("./assets/mainbg01.jpeg")
  //       break
  //     }
  //   }
  // }, 1_000_00)

  const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgb(105, 23, 101)",
  };


  const appLoader = (
    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', marginTop: '15em' }}>
      <CircleLoader color={'rgb(105, 23, 101)'}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )

  const handleSetInit = () => {
    const init = localStorage.getItem('init')

    if (init) {
      if (init === 'true') localStorage.setItem('init', 'false')
    } else localStorage.setItem('init', 'true')
  }


  const router = createBrowserRouter([
    {
      path: '/game-of-thrones-houses-catalogue',
      element: <Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      // element: <PrimaryTable />,
      // element: <LoginForm init={init} setVideoComplete={setVideoComplete} videoComplete={videoComplete} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,

      // errorElement: <ErrorPage />,
      // children: [
      //   // { index: true, element: <LoginForm init={init} setVideoComplete={setVideoComplete} videoComplete={videoComplete} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> },

      //   // { index: true, element: <PrimaryTable isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> },
      //   { index: true, element: <Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> },
      //   {
      //     path: 'something',
      //     element: <LoginForm init={init} setVideoComplete={setVideoComplete} videoComplete={videoComplete} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      //     children: [
      //       {
      //         path: 'splash',
      //         element: <Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      //       },
      //     ],
      //   },
      // ],
    },
    {
      path: '/',
      element: <LoginForm init={init} setInit={handleSetInit} setVideoComplete={setVideoComplete} videoComplete={videoComplete} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      // action: newsletterAction,
    }
    ,
    {
      path: '/users',
      element: loading ? appLoader : localStorage.getItem('loggedin') === 'true' ? <PrimaryTable /> : <></>,
      // action: newsletterAction,
    },
    {
      path: '/characters',
      element:
        loading ? appLoader : localStorage.getItem('loggedin') === 'true' ? <CharactersTable /> : <></>,
      // action: newsletterAction,
    },

    {
      path: '/books',
      element:
        loading ? appLoader : localStorage.getItem('loggedin') === 'true' ? <BooksTable /> : <></>,
      // action: newsletterAction,
    },
    {
      path: '*',
      element: <ErrorPage />,
      // action: newsletterAction,
    }
    //@ts-ignore
  ], { basename: import.meta.env.DEV ? '/' : '/game-of-thrones-houses-catalogue' })

  return (


    <Container id="main-container" style={{ backgroundImage: `url(${bg})` }} fluid>
      {/* <div id='splash-layer'>
      </div> */}

      {localStorage.getItem('loggedin') === 'true' ? <Breadcrumb /> : null}
      {/* <RouterProvider router={router} /> */}


      {localStorage.getItem('loggedin') === 'true' ? <NavigationBar showOffCanvasSettings={showOffCanvasSettings} setShowOffCanvasSettings={setShowOffCanvasSettings} setLoading={setLoading} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : null}
      <Routes>

        <Route path={"/"} index element={<Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<LoginForm init={init} setInit={handleSetInit} setVideoComplete={setVideoComplete} videoComplete={videoComplete} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/users" element={loading ? appLoader : localStorage.getItem('loggedin') === 'true' ? <PrimaryTable /> : <></>} />
        <Route path="/books" element={loading ? appLoader : localStorage.getItem('loggedin') === 'true' ? <BooksTable /> : <></>} />
        <Route path="/characters" element={loading ? appLoader : localStorage.getItem('loggedin') === 'true' ? <CharactersTable /> : <></>} />
        <Route path="/houses" element={loading ? appLoader : localStorage.getItem('loggedin') === 'true' ? <HousesTable /> : <></>} />

        <Route path="/preferences" element={loading ? appLoader : localStorage.getItem('loggedin') === 'true' ? <Preferences /> : <></>} />
        <Route path="/home" element={loading ? appLoader : localStorage.getItem('loggedin') === 'true' ? <Home /> : <></>} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>

      <OffCanvas showOffCanvasSettings={showOffCanvasSettings} setShowOffCanvasSettings={setShowOffCanvasSettings} />




      <audio id='music'>
        <source src="mythical.mp3" type="audio/mpeg"></source>
      </audio>
      <video muted id='video' loop>
        <source src="got.mp4" type="video/mp4"></source>
      </video>
    </Container>
  )
}

export default App