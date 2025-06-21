import PuzzleForm from "../components/PuzzleForm";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminPanel() {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/" />;
  return (
    <div>
      <h2>Admin Panel</h2>
      <PuzzleForm />
    </div>
  );
}
