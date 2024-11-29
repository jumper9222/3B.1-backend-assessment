import { Carousel, Image } from "react-bootstrap";

export default function ImageCarousel() {
    return (
        <div>
            <Carousel>
                <Carousel.Item style={{ minHeight: "85vh" }}>
                    <Image
                        src="https://worq.space/wp-content/uploads/2024/07/TTDI-Hot-Desk-scaled.webp"
                        fluid
                        alt="First slide label"
                        style={{ position: "absolute", bottom: "0" }}
                    />
                    <GradientOverlay />
                    <Carousel.Caption>
                        <h3>Hot Desks</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ height: "85vh" }}>
                    <Image
                        src="https://worq.space/wp-content/uploads/2024/10/1-3-scaled.jpg"
                        fluid
                        alt="Second slide label"
                        style={{ position: "absolute", bottom: "0" }}
                    />
                    <GradientOverlay />
                    <Carousel.Caption>
                        <h3>Dedicated Desks</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ height: "85vh" }}>
                    <Image
                        src="https://worq.space/wp-content/uploads/2023/07/CZE0965-scaled.jpg"
                        fluid
                        alt="Third slide label"
                        style={{ position: "absolute", bottom: "0" }}
                    />
                    <GradientOverlay />
                    <Carousel.Caption>
                        <h3>Meeting Rooms</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

function GradientOverlay() {
    return (
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '20%',
                backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)',
            }}
        ></div>
    )
}
