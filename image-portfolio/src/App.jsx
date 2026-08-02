import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Upload from "./pages/Upload";
import Favourite from "./pages/Favourite";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login />
          }
        />

        <Route path="/signup" element={<Signup />} />

        {/* MAIN (PROTECTED) */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/gallery"
          element={
            isLoggedIn ? <Gallery /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/profile"
          element={
            isLoggedIn ? <Profile /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/settings"
          element={
            isLoggedIn ? <Settings /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/upload"
          element={
            isLoggedIn ? <Upload /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/favorites"
          element={
            isLoggedIn ? <Favourite /> : <Navigate to="/login" />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;