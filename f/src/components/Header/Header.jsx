import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const Header = ({ isLoggedIn, setIsLoggedIn, userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // ✅ Clear it on logout
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Excel Analytics</Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          {isLoggedIn && (
            <Navbar.Text className="me-3 text-light">
              Welcome, <strong>{userEmail}</strong>
            </Navbar.Text>
          )}

          {!isLoggedIn ? (
            <Button variant="outline-light" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
