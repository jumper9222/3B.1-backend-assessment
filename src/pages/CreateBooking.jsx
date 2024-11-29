import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../components/context-providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../features/bookings/bookingsSlice'

export default function CreateBooking() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const { loading } = useSelector((state) => state.bookings);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser])

    const seatTypes = ["Hot desk", "Meeting room", "Private office", "Private seat"];

    const [seatType, setSeatType] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState(currentUser ? currentUser.email : " ");

    const handleSubmit = (e) => {
        if (startTime !== endTime && startTime < endTime) {
            e.preventDefault();
            const data = { seatType, date, startTime, endTime, phoneNumber, email, userId: currentUser.uid };
            dispatch(createBooking(data))
                .then(() => navigate('/bookings'))
        }
    }

    return (
        <Container
            style={{ marginTop: "84px", minHeight: "100vh" }}
        >
            <h1 className='mb-4'>Create a new booking</h1>
            <Row>
                <Col lg={7}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Seat Type</Form.Label>
                        <Form.Select
                            value={seatType}
                            onChange={(e) => setSeatType(e.target.value)}
                            className='mb-3'
                            required
                        >
                            <option>Select a seat type</option>
                            {seatTypes.map((seatType, index) => {
                                return (
                                    <option key={index} value={seatType}>{seatType}</option>
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
                            required
                        />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className='mb-4'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type='submit'>
                            Submit {loading && <Spinner animation="border" size="sm" />}
                        </Button>
                    </Form>
                </Col>
                <Col lg={5}></Col>
            </Row>
        </Container>
    )
}