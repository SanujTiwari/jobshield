import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import {
  loginUser,
  googleLoginUser,
} from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.token
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {
    try {
      const response =
        await googleLoginUser(
          credentialResponse.credential
        );

      localStorage.setItem(
        "token",
        response.token
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          JobShield
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Detect fake job postings instantly
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t"></div>

          <span className="px-3 text-gray-500">
            OR
          </span>

          <div className="flex-1 border-t"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={
              handleGoogleSuccess
            }
            onError={() => {
              alert(
                "Google Login Failed"
              );
            }}
          />
        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;