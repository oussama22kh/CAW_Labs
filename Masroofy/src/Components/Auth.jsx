import { useState } from "react";
import { pb } from "../../pocketbaseService";
import { Link ,useNavigate} from "react-router-dom";
export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await pb
        .collection("users")
        .authWithPassword(email, password);
      console.log("Login successful:", data);
      navigate("/")

    } catch (error) {
      console.error("Login error:", error);
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
      // Automatically log in the user after signup
      await pb.collection("users").authWithPassword(email, password);
      navigate("/")
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center p-4 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-8 italic">
          {isSignup ? "Create a Ma$roofy Account" : "Login to Ma$roofy"}
        </h2>
        <form
          onSubmit={isSignup ? handleSignup : handleLogin}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-300"
        >
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
          
            <button
              type="submit"
              className="w-full py-3 bg-[#35A29F] text-white font-semibold rounded-md hover:bg-[#2e8b88] focus:outline-none focus:ring-2 focus:ring-[#2e8b88]"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          
        </form>
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
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsSignup(true)}
                className="text-[#35A29F] underline focus:outline-none"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </>
  );
}
