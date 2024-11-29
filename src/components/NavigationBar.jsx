import { Button, Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./context-providers/AuthProvider";
import { auth } from "../firebase";
import { useContext, useState } from "react";
import SignUpModal from "./SignUpModal";

export default function NavigationBar() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState("")

    const showSignupModal = () => {
        setShowModal("signup")
    }

    const handleClose = () => {
        setShowModal("")
    }

    const handleLogout = () => {
        auth.signOut();
        setCurrentUser(null);
        navigate('/')
    }

    return (
        <>
            <Navbar expand="md" sticky="top" bg="white"
                style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.04)'
                }}
            >
                <Container >
                    <Navbar.Brand href="/">
                        <i className="bi bi-lamp"></i>{' '}Werk
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            {currentUser && (
                                <>
                                    <Nav.Link href="/book">Book</Nav.Link>
                                </>
                            )}
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                        <Nav>
                            {!currentUser ?
                                <>
                                    <Nav.Link onClick={showSignupModal}>Sign Up</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </>
                                :
                                (
                                    <>
                                        <img
                                            src={currentUser.photoURL}
                                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                            className="align-self-center"
                                        />
                                        <NavDropdown title='My Account '>
                                            <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                                            <NavDropdown.Item href='/bookings'>Bookings</NavDropdown.Item>
                                            <NavDropdown.Item className="text-danger" onClick={handleLogout}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
            <div
                className="p-5"
                style={{
                    backgroundColor: '#F8F8F8',
                }}
            >
                <Row>
                    <Col sm={9} className="d-flex align-items-center">
                        © WERK Terms of Service | Privacy Policy
                    </Col>
                    <Col sm={3} className="d-flex flex-row justify-content-end">
                        <Button className='me-2' variant="secondary rounded-circle"><i className="bi bi-facebook"></i></Button>
                        <Button className='me-2' variant="secondary rounded-circle"><i className="bi bi-instagram"></i></Button>
                        <Button variant="secondary rounded-circle"><i className="bi bi-twitter"></i></Button>
                    </Col>
                </Row >
            </div >
            {!currentUser &&
                <SignUpModal show={showModal === "signup"} handleClose={handleClose} />
            }
        </>
    )
}