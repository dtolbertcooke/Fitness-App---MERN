import { NavLink, useNavigate } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <>
      <nav className={"flex justify-between items-center mb-6"}>
        <NavLink to="/">
          <img alt="Doug fitness app logo" src="./logo.png"></img>
        </NavLink>
        {token ? (
          <>
            <NavLink to="/profile">Profile</NavLink>

            <NavLink className="last" onClick={handleLogout}>
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink className="last" to="/login">
            Login / SignUp
          </NavLink>
        )}
      </nav>
    </>
  );
}
