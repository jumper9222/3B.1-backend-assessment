import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { AuthContext } from "../components/context-providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
    }, [currentUser])

    const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let imageURL = currentUser.photoURL;
        if (file !== null) {
            const imageRef = ref(storage, `profile-pictures/${file.name}`)
            const response = await uploadBytes(imageRef, file);
            imageURL = await getDownloadURL(response.ref);
        }
        const data = { displayName, photoURL: imageURL };
        await updateProfile(currentUser, data)
            .then(() => console.log(
                "Profile updated successfully!",
                currentUser,
            ))
            .catch((error) => console.error(error));
        setEditMode(false);
    }

    return (
        <Container
            className="mt-5"
            style={{
                minHeight: "100vh"
            }}
        >
            <h1>My Profile{' '}
                <i
                    className="bi bi-pencil-square"
                    style={{ color: "light-grey", fontSize: "24px", cursor: "pointer" }}
                    onClick={() => setEditMode(!editMode)}></i></h1>
            <p>Manage your profile</p>
            <Row>
                <Col className="d-flex flex-column justify-content-center">
                    <Form onSubmit={handleSubmit}>
                        <h6>Email</h6>
                        <p className="mb-4">{currentUser?.email || "N/A"}</p>
                        <h6>Phone Number</h6>
                        <p className="mb-4">{currentUser?.phoneNumber || "N/A"}</p>
                        <h6>Display Name</h6>
                        {
                            editMode ?
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                                : <p>{currentUser?.displayName || "N/A"}</p>
                        }
                        {
                            editMode &&
                            <>
                                <h6>Profile Picture</h6>
                                <Form.Control
                                    className="mb-3"
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <Button type="submit">Save</Button>
                            </>
                        }
                    </Form>
                </Col>
                <Col className="d-flex flex-column align-items-center justify-content-center">
                    <Image
                        height={300}
                        width={300}
                        src={currentUser?.photoURL
                            || `https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/http%3A%2F%2Fplacekitten.com%2F250%2F250`} roundedCircle
                    />
                </Col>
            </Row>
        </Container >
    )
}
