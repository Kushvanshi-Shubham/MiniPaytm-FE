import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!username) {
      newErrors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      newErrors.username = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});
      const response = await axios.post(BACKEND_URL + "user/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({ 
        general: err.response?.data?.message || "Invalid credentials. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignin();
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-300 h-screen flex justify-center items-center px-4">
      <div className="rounded-lg bg-white w-full max-w-md text-center p-8 shadow-2xl animate-fade-in">
        <Heading label="Sign in" />
        <SubHeading label="Enter your credentials to access your account" />

        <InputBox
          placeholder="example@examplemail.com"
          label="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          id="signin-email"
          error={errors.username}
        />
        <InputBox
          placeholder="••••••"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          id="signin-password"
          error={errors.password}
        />

        {errors.general && (
          <div className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded animate-fade-in">
            {errors.general}
          </div>
        )}

        <div className="pt-4">
          <Button
            label={loading ? <LoadingSpinner size="sm" className="mx-auto" /> : "Sign in"}
            onClick={handleSignin}
            disabled={loading}
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
