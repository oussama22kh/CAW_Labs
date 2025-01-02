import { useState } from "react";
import PocketBase from "pocketbase";

export default function Auth() {
  const pb = new PocketBase("https://masroofy.pockethost.io");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pb.collection("users").authWithPassword(email, password).then((data)=>{
      try {
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    });
   
  };
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center p-4 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-8">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-300"
        >
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#35A29F]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#35A29F] text-white font-semibold rounded-md hover:bg-[#2e8b88] focus:outline-none focus:ring-2 focus:ring-[#2e8b88]"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
