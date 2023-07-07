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
  const [bg, setBg] = useState("mainbg01.jpeg")
  const [isLoggedIn, setIsLoggedIn] = useState(true)
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

      document.getElementById('video')?.classList.add('invis')
      document.querySelector('#basic-form')?.classList.add('invis')
      document.querySelector('.navigation-bar')?.classList.add('invis')
      if (document.getElementById('splash-layer'))
        document.getElementById('splash-layer')?.classList.add('begin');

    }
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


  const router = createBrowserRouter([
    {
      path: '/game-of-thrones-houses-catalogue',
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
              element: <Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
    //@ts-ignore
  ], { basename: import.meta.env.DEV ? '/' : '/game-of-thrones-houses-catalogue' })

  return (


    <Container id="main-container" style={{ backgroundImage: `url(${bg})` }} fluid>
      <div id='splash-layer'>
      </div>

      {isLoggedIn && <NavigationBar setIsLoggedIn={isLoggedIn} />}

      <RouterProvider router={router} />
      <audio id='music'>
        <source src="mythical.mp3" type="audio/mpeg"></source>
      </audio>
      <video muted id='video' loop style={{ position: "absolute", top: "0", left: "0", bottom: "0", right: "0", width: "100%", height: "95%", margin: 'auto' }}>
        <source src="got.mp4" type="video/mp4"></source>
      </video>
    </Container>
  )
}

export default App