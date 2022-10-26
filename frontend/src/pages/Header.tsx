import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { IconContext } from 'react-icons'
import {MdCalculate,MdTableView} from 'react-icons/md'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import "./Header.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Overlay, OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap'

export function Header(): JSX.Element  {

    return (
        <>
        <Navbar expand="lg">
        
            <Navbar.Brand href="#home">
                <IconContext.Provider value={{size:"4vh"}}>
                    <FaMoneyCheckAlt id="brand-icon"/>
                </IconContext.Provider>    
                Wagelp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                   
                    <Nav.Link disabled={true}>
                        <IconContext.Provider value={{}}>
                            <MdTableView/>
                        </IconContext.Provider> 
                        Visualizador
                    </Nav.Link>

                    <Nav.Link disabled={true}>
                            <IconContext.Provider value={{}}>
                                <MdCalculate/>
                            </IconContext.Provider>
                            Calculadora 
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}