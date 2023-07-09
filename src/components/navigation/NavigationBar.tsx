import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Gear } from 'react-bootstrap-icons';

function NavigationBar(props: any) {
    const navigate = useNavigate();


    const links = ['characters', 'houses', 'books', 'settings']
    const [active, setActive] = useState('/books');
    const [gearColor, setGearColor] = useState('#f3f3f3');
    const dropdownLinks = ['users', 'preferences']

    useEffect(() => {
        const pathname = import.meta.env.DEV ? window.location.hash.replace("#", "") : '/' + window.location.hash.replace("#", "").split('/')[2]
        setActive(pathname)
    }, [])
    const handleUsersDropDownClick = (e: any, l: string) => {
        console.log(l)
        // document.querySelector('.dropdown-toggle.nav-link.show')?.classList.remove('activeLink');
        // (document.querySelector('.dropdown-toggle') as HTMLDivElement)!.style!.color = '#f3f3f3';
        e.preventDefault()
        setActive("/" + l)
        props.setLoading(true)

        setTimeout(() => {
            navigate('/' + l)
            props.setLoading(false)
        }, 1500)
    }

    const handleUsersClick = (e: any, l: string) => {
        e.preventDefault()
        setActive('/users')
        props.setLoading(true)
        // document.querySelector('.dropdown-menu')?.classList.remove('show');
        // document.querySelector('.dropdown-toggle.nav-link.show')?.classList.remove('activeLink');
        // (document.querySelector('.dropdown-toggle') as HTMLDivElement)!.style!.color = '#f3f3f3';
        // console.log('pls')

        setTimeout(() => {

            // navigate('/users')
            navigate('/' + l)
            props.setLoading(false)
        }, 1500)
    }

    const handleBrandClick = () => {
        navigate('/home')
    }


    const handleLogout = (e: any) => {
        props.setLoading(true)

        setTimeout(() => {
            props.setIsLoggedIn(false)
            navigate('/login')
            navigate('/login')
            localStorage.removeItem('loggedin')
            localStorage.removeItem('stayLoggedIn')
            localStorage.removeItem('email')
            props.setLoading(false)
        }, 1500)
    }

    const handleShowOffCanvasSettings = () => {
        props.setShowOffCanvasSettings(!props.showOffCanvasSettings)
    }

    // console.log(window.location.hash.replace("#", ""))
    console.log(document.querySelector('#basic-nav-dropdown')?.classList.contains('show'))
    const checkActive = (navlink: string): string => {
        // console.log("/" + navlink, active)
        const pathname = import.meta.env.DEV ? window.location.hash.replace("#", "") : '/' + window.location.hash.replace("#", "").split('/')[2]
        const currActive = (((pathname) === ("/" + navlink)) || navlink === 'settings' || navlink === 'offcanvas') ? true : false
        if (document.querySelector('.dropdown-toggle.nav-link')?.classList.contains('show')) {

            (document.querySelector('.dropdown-toggle.nav-link.show') as HTMLDivElement)!.style!.color = 'darkred';
            (document.querySelector('.dropdown-toggle.nav-link.show') as HTMLDivElement)!.style!.border = 'none';
        }
        else {

            // (document.querySelector('.nav-link-dropdown') as HTMLDivElement).style!.color = 'white';
            if (document.querySelector('.dropdown-toggle.nav-link'))
                (document.querySelector('.dropdown-toggle.nav-link') as HTMLDivElement).style!.color = '#f3f3f3';
            // (document.querySelector('.nav-link-dropdown') as HTMLDivElement).style!.border = 'none';
            if (document.querySelector('.nav-link-dropdown'))
                document.querySelector('.nav-link-dropdown')?.classList.remove('activeLink');



        }

        if (currActive) return 'activeLink'
        else return ''
        console.log(currActive)
    }

    useEffect(() => {
        if (props.showOffCanvasSettings) setActive('offcanvas')
        else setActive('')
    }, [props.showOffCanvasSettings])
    return (
        <Navbar expand="lg" id="layout-basic-navbar" className='flex'>
            <Navbar.Toggle aria-controls="layout-basic-navbar" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Navbar.Brand onClick={handleBrandClick} className="nav-brand mr-auto" href="">Game of Thrones Houses Catalogue</Navbar.Brand>
                <Nav className="ml-auto" id="basic-navbar-nav"
                >
                    {/*  // activeKey={active}
                    // onSelect={(selectedKey) => setActive(selectedKey!)}>
                    {/* <Nav.Link className="nav-link" href="#home">Home</Nav.Link> */}
                    {/* <Nav.Link className="nav-link" href="#link">Houses</Nav.Link> */}
                    {links.map((l, i) =>
                        l === 'settings' ? (<NavDropdown title="Settings" className={`nav-link-dropdown`} id="basic-nav-dropdown">
                            {/* <NavDropdown.Item className="nav-link-heading">Settings</NavDropdown.Item> */}
                            {dropdownLinks.map((l) =>
                                <div className={`${checkActive(l)} nav-link-dropdown`} onClick={(e: any) => handleUsersClick(e, l)}>
                                    {l}</div>
                            )}
                        </NavDropdown>) : (<Nav.Link key={i} disabled={false} className={`${checkActive(l)}`} onClick={(e) => { handleUsersDropDownClick(e, l) }}>{l.substring(0, 1).toUpperCase() + l.substring(1)}</Nav.Link>)
                    )}

                </Nav>
                <div id='nav-settings' onClick={() => { setActive('offcanvas'); props.setShowOffCanvasSettings(!props.showOffCanvasSettings) }}>
                    <Gear id='nav-settings' color={active === 'offcanvas' ? 'darkred' : gearColor} onMouseEnter={() => { setGearColor('darkred'); }} onMouseLeave={() => setGearColor('white')} />
                </div>
                {props.isLoggedIn ? <div id='logout-btn' onClick={(e: any) => handleLogout(e)}>
                    Logout
                </div> : null}
            </Navbar.Collapse>

        </Navbar >
    )
}

export default NavigationBar;