import { useNavigate } from "react-router-dom";
import { logout } from "../services/user.service";
import { Modal } from "antd";
interface LogoutButtonProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  setIsLoggedIn,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //replace window.confirm with antd modal
    Modal.confirm({
      title: "You are going to sign out!",
      content: "Are you sure?",
      onOk() {
        logout();
        navigate("/");
        setIsLoggedIn(false);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return <button onClick={handleLogout}>Sign out</button>;
};
