import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">

        <div className="home-badge">
          Business Intelligence Platform
        </div>

        <h1 className="home-title">
          Power BI & <span>Prediction</span> Platform
        </h1>

        <p className="home-description">
          Welcome to your AI-powered analytics dashboard.
          Explore interactive reports, monitor key business
          indicators, and leverage predictive analytics to
          support smarter decisions.
        </p>

        <div className="home-buttons">
          <Link
            to="/login"
            className="btn-primary"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn-secondary"
          >
            Register
          </Link>
        </div>

        <div className="home-stats">

          <div className="stat-box">
            <h3>Power BI</h3>
            <p>Interactive Dashboards</p>
          </div>

          <div className="stat-box">
            <h3>AI</h3>
            <p>Predictive Analytics</p>
          </div>

          <div className="stat-box">
            <h3>24/7</h3>
            <p>Business Monitoring</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;