import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateBooking from "./pages/CreateBooking";
import AboutPage from "./pages/AboutPage";
import EditBooking from "./pages/EditBooking";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import BookingInfo from "./pages/BookingInfo";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<NavigationBar />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/book" element={<CreateBooking />} />
                    <Route path="/edit/:bookingId" element={<EditBooking />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/bookings" element={<Dashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/booking/:bookingId" element={<BookingInfo />} />
                </Route>
                <Route path="/404" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}