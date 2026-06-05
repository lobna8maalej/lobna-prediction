import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#222" }}>
      <Link
        to="/"
        style={{ color: "white", marginRight: "15px" }}
      >
        Home
      </Link>

      <Link
        to="/login"
        style={{ color: "white", marginRight: "15px" }}
      >
        Login
      </Link>

      <Link
        to="/register"
        style={{ color: "white" }}
      >
        Register
      </Link>
    </nav>
  );
};

export default Navbar;