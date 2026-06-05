import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import "./DashboardNavbar.css";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const go = (path) => {
    navigate(`/dashboard/${path}`);
  };

  const menus = [
    "commerce",
    "banque",
    "ca",
    "prediction",
    "transaction",
    "voyage",
    "web",
    "vetement",
    "immobilier",
    "radio",
    "parapharma",
    "server",
    "plot",
    "etude",
    "casa",
    "info",
    "mab"
  ];

  return (
    <div className="dash-navbar">

      <div className="nav-left">
        <h2 className="nav-logo">BI Platform</h2>
      </div>

      <div className="nav-center">
        {menus.map((m) => (
          <button key={m} onClick={() => go(m)}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <div className="nav-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
};

export default DashboardNavbar;