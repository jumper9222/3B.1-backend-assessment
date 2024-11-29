import { Row, Col, Image, Container } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import image01 from "../assets/undraw_Co-working_re_w93t.png"
import image02 from "../assets/undraw_coffee_with_friends_3cbj.png"
import image03 from "../assets/undraw_Online_calendar_re_wk3t.png"

export default function HomePage() {
    return (
        <div>
            <ImageCarousel />
            <Container className="my-5">
                <Row>
                    <Col className="d-flex flex-column justify-content-center">
                        <h1>All your WERK space needs</h1>
                        <p>Praesent lacinia nibh id elit pharetra, pretium bibendum dolor eleifend. Nam dignissim turpis quis luctus pretium. Aenean pretium dui a pulvinar egestas. Sed feugiat interdum odio et efficitur. Morbi felis magna, blandit ut tellus vitae, convallis cursus magna. Maecenas vitae porta sem. Nullam cursus semper pharetra. Curabitur sed lectus semper, elementum arcu vitae, tincidunt dolor. Cras viverra molestie lorem ut consequat. In eget molestie purus. Nulla efficitur.                        </p>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center">
                        <Image src={image01} fluid />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex flex-column justify-content-center">
                        <Image src={image02} fluid />
                    </Col>
                    <Col className="d-flex flex-column justify-content-center">
                        <h1>Fuel Up With Free Flow Coffee</h1>
                        <p>Praesent lacinia nibh id elit pharetra, pretium bibendum dolor eleifend. Nam dignissim turpis quis luctus pretium. Aenean pretium dui a pulvinar egestas. Sed feugiat interdum odio et efficitur. Morbi felis magna, blandit ut tellus vitae, convallis cursus magna. Maecenas vitae porta sem. Nullam cursus semper pharetra. Curabitur sed lectus semper, elementum arcu vitae, tincidunt dolor. Cras viverra molestie lorem ut consequat. In eget molestie purus. Nulla efficitur.                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex flex-column justify-content-center">
                        <h1>Book Easily Anywhere</h1>
                        <p>Praesent lacinia nibh id elit pharetra, pretium bibendum dolor eleifend. Nam dignissim turpis quis luctus pretium. Aenean pretium dui a pulvinar egestas. Sed feugiat interdum odio et efficitur. Morbi felis magna, blandit ut tellus vitae, convallis cursus magna. Maecenas vitae porta sem. Nullam cursus semper pharetra. Curabitur sed lectus semper, elementum arcu vitae, tincidunt dolor. Cras viverra molestie lorem ut consequat. In eget molestie purus. Nulla efficitur.                        </p>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center">
                        <Image src={image03} fluid />
                    </Col>
                </Row>
            </Container>
        </div >
    )
}