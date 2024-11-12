import { Container } from "react-bootstrap";

export default function AboutPage() {
    return (
        <Container style={{ marginTop: "84px" }}>
            <h1>About</h1>
            <p>
                This is a simple booking system that allows you to create a booking for an imaginary coworking space called &quotWERK CoWERKing Space&quot. The web app is built using the React framework for the frontend, firebase for user authentication and Express.js for database endpoints
            </p>
        </Container>
    )
}