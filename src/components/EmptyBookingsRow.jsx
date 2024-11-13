import { Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function EmptyBookingsRow() {
    const navigate = useNavigate();
    return (
        <>
            <Row className="d-flex flex-column justify-content-center mx-5 my-3 px-3 pb-2 pt-1" style={{ height: "480px" }}>
                <div className="d-flex flex-column align-items-center">
                    <p className="text-muted">You have no upcoming WERK seshes</p>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <Button variant="secondary" onClick={() => navigate("/book")}>Book one now!</Button>
                </div>
            </Row>
        </>
    )
}