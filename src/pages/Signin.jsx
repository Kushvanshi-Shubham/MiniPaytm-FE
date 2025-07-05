import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!username || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(BACKEND_URL + "user/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-80 text-center p-6 shadow-lg animate-fade-in">
        <Heading label="Sign in" />
        <SubHeading label="Enter your credentials to access your account" />

        <InputBox
          placeholder="example@examplemail.com"
          label="Email"
          onChange={(e) => setUsername(e.target.value)}
          id="signin-email"
        />
        <InputBox
          placeholder="••••••"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          id="signin-password"
        />

        {error && (
          <div className="text-red-500 text-sm mt-2 animate-fade-in">{error}</div>
        )}

        <div className="pt-4">
          <Button
            label={loading ? "Signing in..." : "Sign in"}
            onClick={handleSignin}
          />
        </div>

        <BottomWarning
          label="Don't have an account?"
          buttonText="Sign up"
          to="/signup"
        />
      </div>
    </div>
  );
};
