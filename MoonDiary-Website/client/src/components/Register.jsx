import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config.js";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${BACKEND_URL}/api/users/register`, form, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("Network error. Please try again.");
      } else {
        setError("An unexpected error occurred during registration.");
      }
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex overflow-hidden">
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-200 to-blue-300 p-12 flex-col justify-center items-center text-gray-800">
          <span className="text-5xl mb-6">📘</span>
          <h1 className="text-3xl font-semibold mb-3">Start Moon Diary!</h1>
          <p className="text-base text-center mb-8">
            Create an account to start your personal journaling adventure.
          </p>
          <p className="text-sm">Your serene space for reflection.</p>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            ✨ Create an Account
          </h2>

          {error && (
            <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-left flex items-center">
              <span role="img" aria-label="warning" className="mr-2 text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-shadow shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-shadow shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-shadow shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
            >
              <span role="img" aria-label="rocket" className="mr-2">🚀</span>Register
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-blue-400 hover:text-blue-500 hover:underline">
              Log in here 🔑
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;