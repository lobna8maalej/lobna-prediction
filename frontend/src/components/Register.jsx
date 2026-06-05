import React from "react";
import { useState } from "react";
import { RegisterUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const nav = useNavigate();

  const { error } = useSelector((state) => state.users);

  const create = async (e) => {
    e.preventDefault();

    let result = await dispatch(
      RegisterUser({
        name: username,
        email: email,
        password: password,
      })
    );

    if (!result.error) {
      nav("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Join Us</h1>

        <p className="auth-subtitle">
          Create your account to get started
        </p>

        {error ? (
          <div className="error-message">
            {error}
          </div>
        ) : null}

        <form
          className="auth-form"
          onSubmit={create}
        >
          <div className="form-group">
            <label htmlFor="name">
              Username
            </label>

            <input
              id="name"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) =>
                setemail(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setpassword(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
          >
            Create Account
          </button>
        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;