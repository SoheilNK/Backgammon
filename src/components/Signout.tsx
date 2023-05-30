import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("You are going to sign out!\nAre you sure?")) {
      localStorage.removeItem("user");
      navigate("/signin");
    }
  };

  return <button onClick={handleLogout}>Sign out</button>;
};
