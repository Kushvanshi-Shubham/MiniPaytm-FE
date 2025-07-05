import { Appbar } from "../components/Signed-In-Components/AppBar";
import { Balance } from "../components/Signed-In-Components/Balance";
import { Users } from "../components/Signed-In-Components/Users";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <main className="p-6 max-w-4xl mx-auto animate-fade-in">
        <Balance/>
        <div className="mt-6">
          <Users />
        </div>
      </main>
    </div>
  );
};
