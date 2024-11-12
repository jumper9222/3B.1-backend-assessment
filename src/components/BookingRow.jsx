import { Button, Col, Row } from "react-bootstrap";

export default function BookingRow({ booking }) {
    return (
        <>
            <Row>
                <Col>{booking.date}</Col>
                <Col>{booking.duration}</Col>
                <Col>{booking.type}</Col>
                <Col>{booking.status}</Col>
                <Col>
                    <Button variant="secondary"><i className="bi bi-pencil-square"></i></Button>
                    <Button variant="danger"><i className="bi bi-trash"></i></Button>
                </Col>
            </Row>
        </>
    )
}