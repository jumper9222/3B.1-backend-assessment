import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BookingRow({ booking }) {
    const navigate = useNavigate();
    const currentDate = new Date(Date.now());
    const bookingDate = booking.date.substring(0, 10)
    const bookingStartTime = new Date(`${bookingDate}T${booking.start_time}`);
    const bookingEndTime = new Date(`${bookingDate}T${booking.end_time}`);
    const formattedDate = bookingStartTime.toLocaleDateString('en-GB');
    console.log(booking.date, booking.start_time)

    return (
        <>
            <Row className="mx-5 my-3 pb-2 border-bottom">
                <Col sm={2}>{formattedDate}</Col>
                <Col sm={2}>{booking.start_time}</Col>
                <Col sm={2}>{booking.end_time}</Col>
                <Col>{booking.title}</Col>
                <Col sm={2}>{
                    bookingStartTime > currentDate ? (
                        <>
                            <i className="bi bi-circle-fill text-warning"></i>{' Upcoming'}
                        </>
                    ) : bookingEndTime < currentDate ? (
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
                        className="me-1"
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/edit/${booking.id}`)}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/booking/${booking.id}`)}
                    >
                        <i className="bi bi-info-circle"></i>
                    </Button>
                </Col>
            </Row>
        </>
    )
}