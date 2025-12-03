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

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.username) {
      newErrors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = "Invalid email format";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});
      const response = await axios.post(BACKEND_URL + "user/signup", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({
        general: err.response?.data?.message || "Signup failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-300 min-h-screen flex justify-center items-center px-4 py-8">
      <div className="rounded-lg bg-white w-full max-w-md text-center p-8 shadow-2xl animate-fade-in">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />

        <InputBox
          onChange={handleChange('firstName')}
          value={formData.firstName}
          placeholder="John"
          label="First Name"
          id="first-name"
          error={errors.firstName}
        />
        <InputBox
          onChange={handleChange('lastName')}
          value={formData.lastName}
          placeholder="Doe"
          label="Last Name"
          id="last-name"
          error={errors.lastName}
        />
        <InputBox
          onChange={handleChange('username')}
          value={formData.username}
          placeholder="example@example.com"
          label="Email"
          id="email"
          error={errors.username}
        />
        <InputBox
          onChange={handleChange('password')}
          value={formData.password}
          placeholder="••••••"
          label="Password"
          type="password"
          id="password"
          onKeyDown={handleKeyDown}
          error={errors.password}
        />

        {errors.general && (
          <div className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded animate-fade-in">
            {errors.general}
          </div>
        )}

        <div className="pt-4">
          <Button 
            onClick={handleSignup} 
            label={loading ? <LoadingSpinner size="sm" className="mx-auto" /> : "Sign up"}
            disabled={loading}
          />
        </div>

        <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
      </div>
    </div>
  );
};
