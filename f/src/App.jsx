

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Component imports
// import Header from "./components/Header/Header";
// import StartingPage from "./components/StartingPage/Startingpage.jsx";
// import LoginPage from "./components/Login/LoginPage.jsx";
// import SignupPage from "./components/Login/Signup.jsx";
// import ForgotPasswordPage from './components/Login/ForgotPasswordPage.jsx';
// import MainPage from './components/MainPage/MainPage.jsx';
// import Dashboard from "./components/MainPage/Dashboard.jsx";
// import UploadedFiles from "./components/MainPage/UploadedFiles.jsx";

// // Bootstrap styling
// import "bootstrap/dist/css/bootstrap.min.css";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       {/* Global Header */}
//       <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

//       {/* All Routes */}
//       <Routes>
//          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userEmail={userEmail} />
//         <Route path="/" element={<StartingPage />} />
//         {/* <Route path="/login" element={<LoginPage />} /> */}
//          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/Mainpage" element={<MainPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/uploaded-files" element={<UploadedFiles />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component imports
import Header from "./components/Header/Header";
import StartingPage from "./components/StartingPage/Startingpage.jsx";
import LoginPage from "./components/Login/LoginPage.jsx";
import SignupPage from "./components/Login/Signup.jsx";
import ForgotPasswordPage from './components/Login/ForgotPasswordPage.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import Dashboard from "./components/MainPage/Dashboard.jsx";
import UploadedFiles from "./components/MainPage/UploadedFiles.jsx";

// Bootstrap styling
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // ✅ Define it

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      {/* ✅ Use Header once and pass userEmail */}
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userEmail={userEmail} />

      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/Mainpage" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploaded-files" element={<UploadedFiles />} />
      </Routes>
    </Router>
  );
};

export default App;
