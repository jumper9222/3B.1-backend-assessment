import { useEffect, useState } from "react";
import { Button, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import lampPic from '../assets/lamp-pic.jpg'
import { createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../firebase"
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export default function AuthPage() {
    const [showModal, setShowModal] = useState("")

    const showSignupModal = () => {
        setShowModal("signup")
    }

    const handleClose = () => {
        setShowModal("")
    }

    return (
        <div
            className=""
            style={{
                backgroundImage: `url(${lampPic})`,
                backgroundSize: 'auto 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                overflow: 'visible'
            }}
        >
            <Row style={{ height: '100vh' }}>
                <Col md={1}></Col>
                <Col className="mt-5 ms-5 d-flex flex-column justify-content-center" lg={7}>
                    <h1 className="mb-3">Get WERK done <br />at WERK Co-WERKing Space</h1>
                    <div>
                        <Button
                            onClick={showSignupModal}
                            variant="primary"
                        >
                            Create an account now and start WERKing
                        </Button>
                    </div>
                </Col>
            </Row>
            <SignUpModal show={showModal === "signup"} handleClose={handleClose} />
        </div>
    )
}

function SignUpModal({ show, handleClose }) {
    const auth = getAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(null)
    const [isValidPassword, setIsValidPassword] = useState(null);

    useEffect(() => {
        if (password !== confirmPassword) {
            setPasswordsMatch(false)
        } else {
            setPasswordsMatch(true)
        }
    }, [password, confirmPassword, setPasswordsMatch])

    useEffect(() => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[a-zA-Z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,30}$/
        setIsValidPassword(regex.test(password))
    }, [setIsValidPassword, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage)
                // ..
            });
    }

    const signUpWithGoogle = () => {
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
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="d-flex flex-column gap-2">
                        <Button
                            variant="secondary"
                            className="rounded-pill"
                            onClick={signUpWithGoogle}
                        ><i className="bi bi-google"></i>{' '}Signup with Google</Button>
                        <Button
                            variant="secondary"
                            className="rounded-pill"
                        ><i className="bi bi-facebook"></i>{' '}Signup with Facebook</Button>
                        <Button
                            variant="secondary"
                            className="rounded-pill"
                        ><i className="bi bi-apple"></i>{' '}Signup with Apple</Button>
                    </div>
                    <div className="d-flex align-items-center my-3">
                        <div style={{ flex: 1, borderBottom: "2px solid #dee2e6" }}></div>
                        <span className="px-3 text-muted">OR</span>
                        <div style={{ flex: 1, borderBottom: "2px solid #dee2e6" }}></div>
                    </div>
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
                    <Form.Text className={isValidPassword ? "muted" : "danger"}>
                        Password must contain:
                        <ul>
                            <li>At least one upper case letter.</li>
                            <li>At least one lower case letter.</li>
                            <li>At least one number.</li>
                            <li>At least one special character.</li>
                            <li>At least 8 characters.</li>
                        </ul>
                    </Form.Text>
                    <FloatingLabel
                        controlId="confirmPasswordLabel"
                        label="Confirm Password"
                    >
                        <Form.Control
                            className="mb-3"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                    </FloatingLabel>
                    {passwordsMatch === false && (
                        <p className="text-danger">Passwords do not match</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}