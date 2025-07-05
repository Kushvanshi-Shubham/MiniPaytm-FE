import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { SendMoney } from "./pages/SendMoney"; 
import { Dashboard } from "./pages/Dasboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Landing } from "./pages/Landipage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
     
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
