import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/button";
import API from "../Api/api";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    } else if (!password) {
      setError("Password is required");
      return;
    } else {
      setError("");
    }
    setLoading(true);

    try {
      const response = await API.post("/login", {
        email,
        password,
      });

      console.log("Login success:", response.data);

      const token = response.data.user.token;

      Cookies.set("auth_token", token, { expires: 1 });
      navigate("/updateProfile");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-10 bg-white shadow-xl rounded-3xl flex flex-col gap-6"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />

        <InputField
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />

        <Button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl w-full transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Logging up...
            </>
          ) : (
            "LogIn"
          )}
        </Button>

        {error && (
          <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
        )}

        <div className="text-center mt-4 text-gray-600">
          <Link to="/forgotPassword" className="hover:underline text-blue-500">
            Forgot Password?
          </Link>
        </div>

        <div className="text-center text-gray-600 mt-2">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
