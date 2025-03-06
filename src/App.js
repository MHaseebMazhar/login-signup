import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import "./App.css";
import AddUser from "./Components/AddUser/AddUser";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Dashboard from "./Components/Home/Dashboard";
import ClassUrl from "./Components/Url/ClassUrl";
import GSM from "./Components/GSM/gsm";
import Settings from "./Components/setting/setting";
import Menu from "./Components/Menu/Menu";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/classurl/:name/:email/:password"
            element={<ClassUrl />}
          />
          <Route path="/dashboard/:email/:password" element={<Dashboard />} />
          <Route path="/gsm" element={<GSM />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
