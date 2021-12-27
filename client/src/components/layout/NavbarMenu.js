import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import learnItLogo from "../../assets/logo.svg";
import logOutIcon from "../../assets/logout.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="light">
      <Container>
        <Navbar.Brand href="#home" className="font-weight-bolder text-white">
          <img
            src={learnItLogo}
            alt="learnItLogo"
            width="32"
            height="32"
            // className="mr-2"
          />
          LearnIt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              to="/dashboard"
              as={Link}
              className="font-weight-bolder text-white"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              to="/about"
              as={Link}
              className="font-weight-bolder text-white"
            >
              About
            </Nav.Link>
            <NavDropdown
              title="Dropdown"
              id="collasible-nav-dropdown"
              className="font-weight-bolder text-white"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link disabled className="font-weight-bolder text-white">
              Wellcomes {username}
            </Nav.Link>
            <Button
              variant="primary"
              className="font-weight-bolder text-white"
              onClick={logoutUser}
            >
              <img src={logOutIcon} width="32" height="32" alt="Log Out" />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
