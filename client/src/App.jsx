import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AdminPage from "./components/pages/AdminPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Hero from "./components/common/Hero";
import AboutUsPage from "./components/pages/AboutUsPage";
import PlansPage from "./components/pages/PlansPage";
import ReviewsPage from "./components/pages/ReviewsPage";
import TeamPage from "./components/pages/TeamPage";
import ShopPage from "./components/pages/ShopPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import FeedbackPage from "./components/pages/FeedbackPage";
import ThanksPage from "./components/pages/ThanksPage";
import ProfilePage from "./components/pages/ProfilePage";
import CheckoutPage from "./components/pages/CheckoutPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./App.css";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Hero />
      <section id="about"><AboutUsPage /></section>
      <section id="reviews"><ReviewsPage /></section>
      <section id="plans"><PlansPage /></section>
      <section id="team"><TeamPage /></section>
      {user && <section id="store"><ShopPage /></section>}
    </>
  );
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;