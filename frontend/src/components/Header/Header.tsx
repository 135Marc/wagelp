import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { IconContext } from 'react-icons'
import {MdCalculate,MdTableView} from 'react-icons/md'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import "./Header.css"
import { Link, NavLink } from 'react-router-dom'

export function Header(): JSX.Element  {

    return (
        <>
            <Navbar expand="lg">

                <Link to="">
                    <IconContext.Provider value={{size:"2.5em"}}>
                        <FaMoneyCheckAlt id="brand-icon"/>
                    </IconContext.Provider> Wagelp
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    
                        <Nav.Link disabled={true}>
                            <IconContext.Provider value={{}}>
                                <MdTableView/>
                            </IconContext.Provider> Visualizador
                        </Nav.Link>

                        <NavLink to="/calculadora">                            
                            <IconContext.Provider value={{}}>
                                <MdCalculate/>
                            </IconContext.Provider> Calculadora 
                        </NavLink>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}