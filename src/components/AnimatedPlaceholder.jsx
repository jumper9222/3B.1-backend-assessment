import { Placeholder } from "react-bootstrap";

export default function AnimatedPlaceholder({ as, size }) {
    return (
        <Placeholder as={as} animation='waveS'>
            <Placeholder xs={size} />
        </Placeholder>
    )
}