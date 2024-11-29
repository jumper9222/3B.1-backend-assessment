import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <h1>404</h1>
            <p>It seems that what you were looking for could not be found.</p>
            <Button variant="secondary" onClick={() => navigate('/')}>Go back home</Button>
        </Container>
    )
}