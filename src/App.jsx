import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AuthPage from "./pages/AuthPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./components/context-providers/AuthProvider";
import CreateBooking from "./pages/CreateBooking";
import AboutPage from "./pages/AboutPage";

export default function App() {
    const { currentUser } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<NavigationBar />}>
                    <Route path="/" element={currentUser ? <Dashboard /> : <AuthPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/book" element={<CreateBooking />} />
                    <Route path="/about" element={<AboutPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}