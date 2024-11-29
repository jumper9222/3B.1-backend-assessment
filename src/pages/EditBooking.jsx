import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../components/context-providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, updateBooking } from '../features/bookings/bookingsSlice'

export default function EditBooking() {
    const bookingId = useParams().bookingId;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const { loading } = useSelector((state) => state.bookings)

    const bookings = useSelector((state) => state.bookings.bookings);
    const currentBooking = bookings.find((booking) => booking.id === bookingId);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else if (currentUser && !currentBooking) {
            navigate('/404')
        }
    }, [currentUser, currentBooking])

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const seatTypes = ["Hot desk", "Meeting room", "Private office", "Private seat"];

    const [seatType, setSeatType] = useState(currentBooking?.title || "");
    const [date, setDate] = useState(currentBooking?.date || "");
    const [startTime, setStartTime] = useState(currentBooking?.start_time || "");
    const [endTime, setEndTime] = useState(currentBooking?.end_time || "");
    const [phoneNumber, setPhoneNumber] = useState(currentBooking?.phone_number || "");
    const [email, setEmail] = useState(currentBooking?.email || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { seatType, date, startTime, endTime, phoneNumber, email, userId: currentUser.uid, id: currentBooking.id };
        dispatch(updateBooking(data)).then(() => navigate('/bookings'))
    }

    const deleteData = {
        userId: currentUser?.uid || null,
        bookingId: currentBooking?.id || null
    }

    return (
        <Container
            className='mt-5'
            style={{
                minHeight: "100vh"
            }}
        >
            <Button className='mb-4' variant="secondary" onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></Button>
            <h1 className='mb-4'>Edit Your Booking</h1>
            <p className='text-muted'>Booking ID: {currentBooking && currentBooking.id}</p>
            <Row>
                <Col lg={7}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Seat Type</Form.Label>
                        <Form.Select
                            value={seatType}
                            onChange={(e) => setSeatType(e.target.value)}
                            className='mb-3'
                        >
                            <option>Select a seat type</option>
                            {seatTypes.map((seatType, index) => {
                                return (
                                    <option key={index}>{seatType}</option>
                                )
                            })}
                        </Form.Select>
                        <Row>
                            <Col>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    className='mb-3'
                                    type='date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Label>Start Time</Form.Label>
                                <Form.Select
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className='mb-3'
                                    required
                                >
                                    <option>Select a time</option>
                                    <option value={"08:00"}>08:00</option>
                                    <option value={"13:00"}>13:00</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label>End Time</Form.Label>
                                <Form.Select
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className='mb-3'
                                    required
                                >
                                    <option>Select a time</option>
                                    <option value={"13:00"}>13:00</option>
                                    <option value={"18:00"}>18:00</option>
                                </Form.Select>
                                {startTime === endTime && startTime !== '' && endTime !== '' && <p className='text-danger'>Start time cannot be the same as end time</p>}
                            </Col>
                        </Row>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            className='mb-3'
                            type='number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className='mb-4'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button type='submit'>
                            Submit {loading ? <Spinner animation="border" size="sm" /> : ''}
                        </Button>
                        <Button variant='danger' className='ms-3' onClick={() => setShowDeleteModal(true)}>
                            Delete
                        </Button>
                    </Form>
                </Col>
                <Col lg={5}></Col>
            </Row>
            <DeleteBookingModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                data={deleteData}
            />
        </Container>
    )
}

function DeleteBookingModal({ showDeleteModal, setShowDeleteModal, data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDelete = () => {
        dispatch(deleteBooking(data))
        navigate('/bookings')
    }

    return (
        <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this booking? This cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                <Button variant='danger' onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}