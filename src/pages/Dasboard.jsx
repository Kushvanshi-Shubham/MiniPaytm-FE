import { Appbar } from "../components/Signed-In-Components/AppBar";
import { Balance } from "../components/Signed-In-Components/Balance";
import { Users } from "../components/Signed-In-Components/Users";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Appbar />
      <main className="p-4 sm:p-6 max-w-5xl mx-auto animate-fade-in">
        <Balance />
        <div className="mt-6">
          <Users />
        </div>
      </main>
    </div>
  );
};
