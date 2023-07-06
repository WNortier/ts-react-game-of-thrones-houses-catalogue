import { useState, useEffect } from 'react'
import NavigationBar from './components/navigation/NavigationBar'
import Container from 'react-bootstrap/Container';
import BasicForm from './components/forms/Form';
import axios from 'axios'
import { HashRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Routes } from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import Splash from './components/Splash';


function App() {
  const [count, setCount] = useState(0)
  const [bg, setBg] = useState("/mainbg01.jpeg")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [videoComplete, setVideoComplete] = useState(false)
  const [init, setInit] = useState(false)
  const [usersO, setUsersO] = useState(0)

  const getHouses = async () => {
    const response = await axios.get('https://anapioficeandfire.com/api/houses')
    console.log(response.data)
  }

  useEffect(() => {
    // document.getElementById('video').style.zIndex = "-10";
    if (!init) {

      document.getElementById('video').classList.add('invis')
      document.querySelector('#basic-form')?.classList.add('invis')
      document.querySelector('.navigation-bar')?.classList.add('invis')
      document.getElementById('splash-layer')?.classList.add('begin');
      // document.querySelector('.navigation-bar').classList.add('invis');


    }
    setInterval(() => {
      switch (bg) {
        case "mainbg01.jpeg": {
          setBg("mainbg01.jpeg")
          break
        }
        case "mainbg01.jpeg": {
          setBg("mainbg01.jpeg")
          break
        }
      }
    }, 1_000_00)

    // getHouses()
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> },
        {
          path: 'login',
          element: <BasicForm init={init} setVideoComplete={setVideoComplete} videoComplete={videoComplete} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
          children: [
            //   {
            //     index: true,
            //     element: <EventsPage />,
            //     loader: eventsLoader,
            //   },
            //   {
            //     path: ':eventId',
            //     id: 'event-detail',
            //     loader: eventDetailLoader,
            //     children: [
            //       {
            //         index: true,
            //         element: <EventDetailPage />,
            //         action: deleteEventAction,
            //       },
            //       {
            //         path: 'edit',
            //         element: <EditEventPage />,
            //         action: manipulateEventAction,
            //       },
            //     ],
            //   },
            {
              path: 'splash',
              element: <Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
              action: 'click',
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: <BasicForm init={init} setVideoComplete={setVideoComplete} videoComplete={videoComplete} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      // action: newsletterAction,
    }
  ], { basename: import.meta.env.DEV ? '/' : '/game-of-thrones-houses-catalogue/' })

  return (


    <Container id="main-container" style={{ backgroundImage: `url(${bg})` }} fluid>

      {/* <div id='splash-layer'>
      </div> */}

      {isLoggedIn && <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={isLoggedIn} />}

      <RouterProvider router={router} />

    </Container>
  )
}

export default App
