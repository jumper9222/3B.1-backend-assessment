import { Container } from "react-bootstrap";

export default function AboutPage() {
    return (
        <Container className="mt-5" style={{ marginBottom: "84px", height: "100vh" }}>
            <h1>About</h1>
            <p>
                This is a simple booking system that allows you to create a booking for an imaginary coworking space called &quot;WERK CoWERKing Space&quot;. The web app is built using the React framework for the frontend, firebase for user authentication and Express.js for database endpoints
            </p>
        </Container>
    )
}