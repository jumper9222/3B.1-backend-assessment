import { createContext, useEffect, useState } from "react"
import { auth } from "../../firebase"
import { useDispatch } from "react-redux";
import { checkConnectionStatus } from "../../features/userAuth/userAuthSlice";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [connectedToGoogleCalendar, setConnectedToGoogleCalendar] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
            dispatch(checkConnectionStatus())
            // .then((response) => setConnectedToGoogleCalendar(response.payload.data))
            // .catch((error) => console.error(error));
        })
    }, []);

    const value = { currentUser, setCurrentUser, authToken, setAuthToken };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { AuthContext }