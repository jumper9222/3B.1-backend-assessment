import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BookingRow({ booking }) {
    const navigate = useNavigate();
    const currentDate = new Date(Date.now());
    const bookingDate = new Date(booking.date);
    const formattedDate = bookingDate.toLocaleDateString('en-GB');

    return (
        <>
            <Row className="mx-5 my-3 pb-2 border-bottom">
                <Col sm={2}>{formattedDate}</Col>
                <Col sm={2}>{booking.time}</Col>
                <Col>{booking.title}</Col>
                <Col sm={2}>{
                    bookingDate > currentDate ? (
                        <>
                            <i className="bi bi-circle-fill text-warning"></i>{' Upcoming'}
                        </>
                    ) : bookingDate < currentDate ? (
                        <>
                            <i className="bi bi-circle-fill text-secondary"></i>{' Completed'}
                        </>
                    ) : (
                        <>
                            <i className="bi bi-circle-fill text-success"></i>{' Ongoing'}
                        </>
                    )}</Col>
                <Col sm={1} className="d-flex justify-content-center">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/booking/${booking.id}`)}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                </Col>
            </Row>
        </>
    )
}