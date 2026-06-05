
import React from "react";
import { useState } from "react";
import { LoginUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const nav = useNavigate();

  const { error } = useSelector((state) => state.users);

  const create = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      LoginUser({
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
        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to your account
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
            Sign in
          </button>
        </form>

        <p className="auth-link">
          Don't have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;