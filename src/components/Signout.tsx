import { useNavigate } from "react-router-dom";
import { logout } from "../services/user.service";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("You are going to sign out!\nAre you sure?")) {
      logout();
      navigate("/");
    }
  };

  return <button onClick={handleLogout}>Sign out</button>;
};
