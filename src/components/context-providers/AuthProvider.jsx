import { createContext, useEffect, useState } from "react"
import { auth } from "../../firebase"
import { useDispatch } from "react-redux";
import { checkConnectionStatus } from "../../features/userAuth/userAuthSlice";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
            dispatch(checkConnectionStatus())
        })
    }, []);

    const value = { currentUser, setCurrentUser };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { AuthContext }