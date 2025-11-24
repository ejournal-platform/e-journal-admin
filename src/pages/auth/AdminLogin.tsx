import React, { useState } from "react";
import { FaLeaf, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const DUMMY_ADMINS = [
    { nic: "1", password: "2" },
    { nic: "798164171V", password: "Judy" },
    { nic: "199573801049", password: "Chamodi" },
    { nic: "976392779V", password: "Ishani" },
  ];

  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const foundAdmin = DUMMY_ADMINS.find(
        (admin) => admin.nic === nic && admin.password === password
      );

      setIsLoading(false);

      if (foundAdmin) {
        setMessage({
          type: "success",
          text: "Login successful! Redirecting..."
        });

        setTimeout(() => {
          navigate("/dashboard/moderation");
        }, 1000);
      } else {
        setMessage({
          type: "error",
          text: "Invalid NIC or password. Please try again."
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden font-sans">
        {/* Left Side (Brand Section) */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-600 text-white p-8 md:w-1/2">
          {/* <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-blue-600">
            <FaLeaf className="w-8 h-8" />
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold mt-5 text-center">
            Food Safety E-Journal
          </h2>
          <p className="text-sm md:text-base opacity-90 text-center font-sans mt-5 px-6">
            Admin Portal – Manage users and submissions efficiently
          </p>
        </div>

        {/* Right Side (Login Form) */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-6 sm:p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Admin Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-xl space-y-4"
          >
            {/* NIC Field */}
            <div className="relative">
              <label
                htmlFor="nic"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                NIC Number
              </label>
              <input
                type="text"
                id="nic"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter NIC"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute bg-white! top-7.5 right-1 text-gray-500 hover:text-gray-700 focus:outline-none! border-none!"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600! rounded-md font-medium hover:bg-blue-700! focus:outline-none! transition"
            >
              Sign In
            </button>

            {/* Message */}
            <div className="min-h-12 transition-all duration-300">
              {message && (
                <div
                  className={`p-3 rounded-lg text-sm font-medium text-center ${message.type === "error"
                    ? "text-red-700 bg-red-100 border border-red-300"
                    : "text-green-700 bg-green-100 border border-green-300"
                    }`}
                >
                  {message.text}
                </div>
              )}
            </div>
          </form>

          {/* Footer */}
          {/* <p className="mt-6 text-xs sm:text-sm text-gray-500 text-center">
            A project by{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline font-semibold"
            >
              FAO/INGO Alliance
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;