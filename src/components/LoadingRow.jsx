import { Col, Row, Placeholder } from "react-bootstrap";



export default function LoadingRow() {
    return (
        <Row className="mx-5 my-3 pb-2 border-bottom">
            <Col sm={2}>
                <Placeholder animation="glow" as="p">
                    <Placeholder xs={12} />
                </Placeholder>
            </Col>
            <Col sm={2}>
                <Placeholder animation="glow" as="p">
                    <Placeholder xs={12} />
                </Placeholder>
            </Col>
            <Col sm={2}>
                <Placeholder animation="glow" as="p">
                    <Placeholder xs={12} />
                </Placeholder>
            </Col>
            <Col>
                <Placeholder animation="glow" as="p">
                    <Placeholder xs={12} />
                </Placeholder>
            </Col>
            <Col sm={2}>
                <Placeholder animation="glow" as="p">
                    <Placeholder xs={12} />
                </Placeholder>
            </Col>
            <Col sm={1}>
                <Placeholder animation="glow" as="p">
                    <Placeholder xs={12} />
                </Placeholder>
            </Col>
        </Row>
    )
}
