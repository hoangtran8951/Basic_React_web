import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/img/logo192.png'
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const Header = (props) => {
    let location = useLocation();
    const navigate = useNavigate();
    const {logout, user} = useContext(UserContext);
    const handleLogout = () => {
      let token = localStorage.getItem("token");
      if(token){
        // localStorage.removeItem("token");
        logout();
        toast.success("You have Logged out succeed");
        navigate("/");
      }
      else
        toast.error("You have to log in first");
    }
    return (<>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logoApp}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <span> Intern Test App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/users" className="nav-link">Manage Users</NavLink>
           
          </Nav>
          <Nav className="justify-content-end"  >
            {user && user.email !== "" && <span className='nav-link'>Welcome {user.email}</span>}
            <NavDropdown title="Setting" id="basic-nav-dropdown" >
              {user && user.auth 
                ? <NavLink to="/" onClick={() => handleLogout()} className={({ isActive }) => (isActive ? 'inactive dropdown-item data-rr-ui-dropdown-item ' : 'inactive dropdown-item data-rr-ui-dropdown-item')} >Logout</NavLink>
                : <NavLink to="/login" className={({ isActive }) => (isActive ? 'inactive dropdown-item data-rr-ui-dropdown-item ' : 'inactive dropdown-item data-rr-ui-dropdown-item')} >Login</NavLink>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
      );
    

}

export default Header;