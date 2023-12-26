import { useNavigate } from "react-router-dom";
import { logout } from "../services/user.service";
interface LogoutButtonProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  setIsLoggedIn,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("You are going to sign out!\nAre you sure?")) {
      logout();
      navigate("/");
      setIsLoggedIn(false);
    }
  };

  return <button onClick={handleLogout}>Sign out</button>;
};
