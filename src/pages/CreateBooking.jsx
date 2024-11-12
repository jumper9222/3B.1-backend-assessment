import { useNavigate } from 'react-router-dom';
import { Col, Container, Form, Row } from "react-bootstrap";
import { AuthContext } from "../components/context-providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2';

export default function CreateBooking() {
    const seatTypes = []
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [seatType, setSeatType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState(currentUser.email);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate])

    return (
        <Container style={{ marginTop: "84px" }}>
            <h1>Create a new booking</h1>
            <Row>
                <Col lg={7}>
                    <Form>
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
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            className='mb-3'
                            type='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
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
                        <PhoneInput
                            country={"my"}
                            enableSearch={true}
                            className='mb-3'
                            type='text'
                            inputMode='numeric'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder=""
                        />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className='mb-3'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form>
                </Col>
                <Col lg={5}></Col>
            </Row>
        </Container>
    )
}