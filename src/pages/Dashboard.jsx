import { Button, Col, Row } from "react-bootstrap";
import BookingRow from "../components/BookingRow";
import { useSelector } from "react-redux";


export default function Dashboard() {
    const loading = useSelector((state) => state.bookings.loading);
    const upcomingSeshes = []

    return (
        <div
            style={{
                paddingTop: "84px",
                height: "800px",
                backgroundColor: "#f5f5f5",
            }}
        >
            <div
                style={{
                    paddingLeft: "96px",
                    paddingRight: "96px",
                }}
                className="d-flex flex-column"
            >
                <h1 className="align-self-center my-3">Welcome to WERK Co-WERKing Space</h1>
                <h3 className="align-self-center mt-2 mb-3">Here are your upcoming WERK Seshes!</h3>
            </div>
            <Row className="mx-5 my-3 px-3 pb-1 border-bottom" width>
                <Col lg={2}><h6>Booking Date</h6></Col>
                <Col lg={3}><h6>Duration</h6></Col>
                <Col lg={3}><h6>Booking Type</h6></Col>
                <Col lg={2}><h6>Status</h6></Col>
                <Col lg={2}><h6>Edit</h6></Col>
            </Row>
            {loading && <p></p>}
            {upcomingSeshes.length === 0 && !loading &&
                <Row className="d-flex flex-column justify-content-center mx-5 my-3 px-3 pb-2 pt-1" style={{ height: "480px" }}>
                    <div className="d-flex flex-column align-items-center">
                        <p className="text-muted">You have no upcoming WERK seshes</p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <Button variant="secondary">Book one now!</Button>
                    </div>
                </Row>
            }
            {
                upcomingSeshes.length > 0 && !loading &&
                upcomingSeshes.map((booking) => <BookingRow booking={booking} key={booking.id} />)
            }

        </div >
    )
}