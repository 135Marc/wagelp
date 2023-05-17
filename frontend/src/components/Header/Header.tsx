import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { IconContext } from 'react-icons'
import {MdCalculate,MdTableView} from 'react-icons/md'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import "./Header.css"
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

export function Header(): JSX.Element  {

    return (
        <>
            <Navbar expand="lg">

                <Link to="" id="home-link">
                    <IconContext.Provider value={{size:"2.5em"}}>
                        <FaMoneyCheckAlt id="brand-icon"/>
                    </IconContext.Provider> Wagelp
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        
                    {/* WILL BE REPLACED BY THE SALARY COMPARATOR!
                       <LinkContainer to="/calculadora">
                            <Nav.Link>                            
                                <IconContext.Provider value={{}}>
                                    <MdCalculate/>
                                </IconContext.Provider> Calculadora 
                            </Nav.Link>
                        </LinkContainer> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}