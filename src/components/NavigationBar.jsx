import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./context-providers/AuthProvider";
import { auth } from "../firebase";
import { useContext } from "react";

export default function NavigationBar() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        auth.signOut();
        navigate('/')
    }

    return (
        <>
            <Navbar expand="md" fixed="top" bg="white">
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
                        {!currentUser ?
                            <Button onClick={handleLogin}>Login</Button>
                            :
                            <Button onClick={handleLogout}>Logout</Button>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}