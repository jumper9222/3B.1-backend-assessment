import { Col, Row } from "react-bootstrap";
import BookingRow from "../components/BookingRow";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { fetchBookingsByUser } from "../features/bookings/bookingsSlice";
import EmptyBookingsRow from "../components/EmptyBookingsRow";
import { AuthContext } from "../components/context-providers/AuthProvider";

export default function Dashboard() {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.bookings.bookings);
    const loading = useSelector((state) => state.bookings.loading);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        dispatch(fetchBookingsByUser(currentUser.uid));
    }, [dispatch, currentUser.uid]);

    return (
        <div
            style={{
                paddingTop: "84px",
                paddingBottom: "84px",
                backgroundColor: "#f5f5f5",
            }}
        >
            <div
                className="mx-5 d-flex flex-column"
            >
                <h1 className="align-self-center my-3">Welcome to WERK Co-WERKing Space</h1>
                <h3 className="align-self-center mt-2 mb-3">Here are your upcoming WERK Seshes!</h3>
            </div>
            <Row className="mx-5 my-3 pb-1 border-bottom">
                <Col sm={2}><h6>Booking Date</h6></Col>
                <Col sm={2}><h6>Duration</h6></Col>
                <Col><h6>Booking Type</h6></Col>
                <Col sm={2}><h6>Status</h6></Col>
                <Col sm={1} className="d-flex justify-content-center"><h6>Edit</h6></Col>
            </Row>
            {loading && <p></p>}
            {bookings.length === 0 && !loading && <EmptyBookingsRow />}
            {
                bookings.length > 0 && !loading &&
                bookings.map((booking) => <BookingRow booking={booking} key={booking.id} />)
            }
        </div >
    )
}