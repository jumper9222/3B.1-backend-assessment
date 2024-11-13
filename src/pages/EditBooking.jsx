import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AuthContext } from "../components/context-providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { updateBooking } from '../features/bookings/bookingsSlice'


export default function EditBooking() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);

    const seatTypes = ["Hot desk", "Meeting room", "Private office", "Private seat"];

    useEffect(() => {
        if (currentUser === null) {
            navigate('/login');
        }
    }, [currentUser, navigate])

    const [seatType, setSeatType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState(currentUser.email);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { seatType, date, time, phoneNumber, email, userId: currentUser.uid };
        dispatch(updateBooking(data));
    }

    return (
        <Container
            style={{ marginTop: "84px" }}
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
                                />
                            </Col>
                            <Col>
                                <Form.Label>Time</Form.Label>
                                <Form.Select
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className='mb-3'
                                >
                                    <option>Select a time</option>
                                    <option value={"08:00 to 18:00"}>Full day - 08:00 to 18:00</option>
                                    <option value={"08:00 to 13:00"}>Half day - 08:00 to 13:00</option>
                                    <option value={"13:00 to 18:00"}>Half day - 13:00 to 18:00</option>
                                </Form.Select>
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
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col lg={5}></Col>
            </Row>
        </Container>
    )
}