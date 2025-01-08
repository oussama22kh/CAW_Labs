import { useState } from "react";
import { pb } from "../../pocketbaseService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await pb
        .collection("users")
        .authWithPassword(email, password);
      console.log("Login successful:", data);
      toast.success("Login successful:");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login error:");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      passwordConfirm: passwordConfirm,
      emailVisibility: false,
      verified: false,
      name,
    };

    try {
      const newUser = await pb.collection("users").create(data);
      console.log("Signup successful:", newUser);
      toast.success("Signup successful:", newUser);
      // Automatically log in the user after signup
      await pb.collection("users").authWithPassword(email, password);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup error:", error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await pb.collection("users").requestPasswordReset(email);
      alert("Password reset email sent. Please check your inbox.");
      setIsForgotPassword(false); // Return to login view
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Password reset error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center p-4 bg-gray-50">
        <h2 className="text-[36px] text-[#0B666A] font-bold mb-8">
          {isSignup
            ? "Create a Ma$roofy Account"
            : isForgotPassword
            ? "Reset Password"
            : "Login to Ma$roofy"}
        </h2>
        <form
          onSubmit={
            isForgotPassword
              ? handlePasswordReset
              : isSignup
              ? handleSignup
              : handleLogin
          }
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-300"
        >
          {isForgotPassword ? (
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#35A29F]"
              />
            </div>
          ) : (
            <>
              {isSignup && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#35A29F] mb-4"
                  />
                </div>
              )}
              <div className="mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#35A29F] mb-4"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#35A29F] mb-4"
                />
                {isSignup && (
                  <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#35A29F] mb-4"
                  />
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#35A29F] text-white font-semibold rounded-md hover:bg-[#2e8b88] focus:outline-none focus:ring-2 focus:ring-[#2e8b88]"
          >
            {isSignup
              ? "Sign Up"
              : isForgotPassword
              ? "Send Reset Email"
              : "Login"}
          </button>
        </form>
        {!isForgotPassword && (
          <p className="mt-4 text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-[#35A29F] underline focus:outline-none"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="flex justify-center flex-col">
                <div>
                  Don't have an account?{"  "}
                  <button
                    onClick={() => setIsSignup(true)}
                    className="text-[#35A29F] underline focus:outline-none"
                  >
                    Sign Up
                  </button>
                </div>
                <button
                  onClick={() => setIsForgotPassword(true)}
                  className="text-[#35A29F] underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </p>
        )}
        {isForgotPassword && (
          <p className="mt-4 text-gray-600">
            Remember your password?{" "}
            <button
              onClick={() => setIsForgotPassword(false)}
              className="text-[#35A29F] underline focus:outline-none"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </>
  );
}
