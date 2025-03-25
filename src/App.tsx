import { Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import {
  TUserFromToken,
  userCurrentToken,
} from "./redux/features/auth/authSlice";
import { useAppSelector } from "./redux/hooks";
import { verifyToken } from "./utils/verifyToken";

function App() {
  const token = useAppSelector(userCurrentToken);

  const user = token ? (verifyToken(token as string) as TUserFromToken) : null;

  if (!token || !user) {
    return <Navigate to="/home" replace={true} />;
  }

  return (
    <ProtectedRoute role={user?.role}>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
