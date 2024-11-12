import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context-providers/AuthProvider";
import { provider } from "../firebase";

export default function Login() {
    const auth = getAuth();
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (currentUser) navigate("/")
    }, [currentUser, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                console.log(token, user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(errorCode, errorMessage, email, credential)
            });
    }

    return (
        <Container>
            <Row
                className="d-flex flex-column align-items-center justify-content-center"
                style={{
                    minHeight: "90vh",
                    border: "1px"
                }}
            >
                <Col lg={5}>
                    <h1 className="mb-4">Login</h1>
                    <p className="mb-2 text-muted">Login using your email address</p>
                    <Form className="mb-3" onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="emailLabel"
                            label="Email"
                        >
                            <Form.Control
                                className="mb-3"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="passwordLabel"
                            label="Password"
                        >
                            <Form.Control
                                className="mb-3"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </FloatingLabel>
                        <Button variant="primary" type="submit" className="rounded-pill px-3">
                            Login
                        </Button>
                    </Form>
                    <div className="d-flex align-items-center my-3">
                        <div style={{ flex: 1, borderBottom: "2px solid #dee2e6" }}></div>
                        <span className="px-3 text-muted">OR</span>
                        <div style={{ flex: 1, borderBottom: "2px solid #dee2e6" }}></div>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <Button
                            variant="secondary"
                            className="rounded-pill"
                            onClick={signInWithGoogle}
                        ><i className="bi bi-google"></i>{' '}Login with Google</Button>
                        <Button
                            variant="secondary"
                            className="rounded-pill"
                        ><i className="bi bi-facebook"></i>{' '}Login with Facebook</Button>
                        <Button
                            variant="secondary"
                            className="rounded-pill"
                        ><i className="bi bi-apple"></i>{' '}Login with Apple</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}