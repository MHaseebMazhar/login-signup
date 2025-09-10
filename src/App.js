import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import "./App.css";
import AddUser from "./Components/AddUser/AddUser";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Dashboard from "./Components/Dashboard/Dashboard";
import ClassUrl from "./Components/Url/ClassUrl";
import GSM from "./Components/GSM/gsm";   // ✅ FIXED
import Settings from "./Components/settings/settings";
import Menu from "./Components/Menu/Menu";
import Home from "./Components/Menu/Home/Home";
import AboutUs from "./Components/Menu/AboutUs/AboutUs";
import ContactUs from "./Components/Menu/ContactUs/ContactUs";
import OurServices from "./Components/Menu/OurServices/OurServices";
import Portfolio from "./Components/Menu/Portfolio/Portfolio";
import Blog from "./Components/Menu/Blog/Blog";
import Career from "./Components/Menu/Career/Career";
import Setting from "./Components/Menu/Setting/Setting";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Only one */}
          <Route path="/classurl/:name/:email/:password" element={<ClassUrl />} />
          <Route path="/gsm" element={<GSM />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career" element={<Career />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
