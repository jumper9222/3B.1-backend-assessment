import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBookingById } from "../features/bookings/bookingsSlice";
import { AuthContext } from "../components/context-providers/AuthProvider";
import AnimatedPlaceholder from "../components/AnimatedPlaceholder";
import { addEventToGoogleCalendar, connectToGoogleCalendar } from "../features/userAuth/userAuthSlice";

export default function BookingInfo() {
    const { bookingId } = useParams();
    const { currentUser } = useContext(AuthContext);
    const { loading, connectedToGoogleCalendar } = useSelector((state) => state.userAuth)
    const bookingLoading = useSelector((state) => state.bookings.loading)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentBooking, setCurrentBooking] = useState({});
    const date = new Date(currentBooking.date)
    const formattedDate = date.toLocaleDateString('en-GB')

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        } else {
            const fetchId = { bookingId, userId: currentUser.uid }
            dispatch(fetchBookingById(fetchId)).then(
                (response) => {
                    setCurrentBooking(response.payload)
                }
            )
        }
    }, [bookingId, currentUser])

    const handleConnectToGoogleCalendar = () => {
        dispatch(connectToGoogleCalendar())
    }

    const handleAddToCalendar = () => {
        const startDate = new Date(`${currentBooking.date.substring(0, 10)}T${currentBooking.start_time}`);
        const endDate = new Date(`${currentBooking.date.substring(0, 10)}T${currentBooking.end_time}`);
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const event = {
            summary: currentBooking.title,
            location: '',
            start: {
                dateTime: startDate,
                timeZone: timeZone,
            },
            end: {
                dateTime: endDate,
                timeZone: timeZone,
            },
            attendees: [],
            reminders: {
                useDefault: false,
            },
        };
        dispatch(addEventToGoogleCalendar(event))
    }

    return (
        <Container
            className="my-5"
            style={{
                minHeight: "90vh"
            }}
        >
            <Button
                className='mb-4'
                variant="secondary"
                onClick={() => navigate(-1)}
            >
                <i className="bi bi-arrow-left"></i>
            </Button>
            <h1 className="mb-4">Booking Details </h1>
            <div className="mb-3">
                <Button
                    className="me-1"
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/edit/${currentBooking.id}`)}
                >
                    <i className="bi bi-pencil-square"></i>
                </Button>
                <Button
                    className="me-1"
                    variant="secondary"
                    size="sm"
                    disabled={loading}
                    onClick={connectedToGoogleCalendar ? handleAddToCalendar : handleConnectToGoogleCalendar}
                >
                    {loading ?
                        <Spinner size="sm" animation="border" />
                        : <i className="bi bi-calendar-date"></i>}
                    {connectedToGoogleCalendar ?
                        ' Add to your calendar'
                        : ' Connect to Google Calendar'}
                </Button>
            </div>
            <div>
                <Row
                    className="mb-3"
                >
                    <Col sm={2}><strong>Booking ID: </strong></Col>
                    <Col sm={4}>{bookingLoading ? <AnimatedPlaceholder as='p' size={11} /> : currentBooking.id}</Col>
                </Row>
                <Row
                    className="mb-3"
                >
                    <Col sm={2}><strong>Seat type: </strong></Col>
                    <Col sm={4}>{bookingLoading ? <AnimatedPlaceholder as='p' size={11} /> : currentBooking.title}</Col>
                </Row>
                <Row
                    className="mb-3"
                >
                    <Col sm={2}><strong>Date: </strong></Col>
                    <Col sm={4}>{bookingLoading ? <AnimatedPlaceholder as='p' size={11} /> : formattedDate}</Col>
                </Row>
                <Row
                    className="mb-3"
                >
                    <Col sm={2}><strong>Time: </strong></Col>
                    <Col sm={4}>{bookingLoading ? <AnimatedPlaceholder as='p' size={11} /> : currentBooking.start_time + ' to ' + currentBooking.end_time}</Col>
                </Row>
            </div>
        </Container >
    )
}