import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!firstName || !lastName || !username || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(BACKEND_URL + "user/signup", {
        username,
        firstName,
        lastName,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/signin"); // optional: auto-redirect
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-80 text-center p-6 shadow-lg animate-fade-in">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />

        <InputBox
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          label="First Name"
          id="first-name"
        />
        <InputBox
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          label="Last Name"
          id="last-name"
        />
        <InputBox
          onChange={(e) => setUsername(e.target.value)}
          placeholder="example@example.com"
          label="Email"
          id="email"
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          label="Password"
          id="password"
        />

        {error && (
          <div className="text-red-500 text-sm mt-2 animate-fade-in">{error}</div>
        )}

        <div className="pt-4">
          <Button onClick={handleSignup} label={loading ? "Signing up..." : "Sign up"} />
        </div>

        <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
      </div>
    </div>
  );
};
