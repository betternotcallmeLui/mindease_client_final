import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa'

import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/")
    navigate(0);
  };

  const username = localStorage.getItem("authToken")

  const location = useLocation();

  return (
    <header className="me_header">
      <div className="header">
        <div className="header_container">
          <Link to="/" className="header_logo">MindEase</Link>
          <Link to="/directory" >Directorio</Link>
          <Link to="/blog" >MindBlog</Link>
          {username ? (
            <>
              {location.pathname !== "/chat" && (
                <div classN ame="m-0">
                  <Link to="/chat" className="signupPage_button link">Chat</Link>
                </div>

              )}
              <div className="">
                <Link to="/profile" className="header btn fs-4 bg-transparent m-0" as="button"><FaUser /></Link>
              </div>
              <button onClick={handleLogout} className="signupPage_button">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              {window.location.pathname === "/signup" ? (
                <div className="header-sides m-0 d-flex justify-content-center">
                  <Link className="signupPage_button" to="/login">
                    Login
                  </Link>
                </div>
              ) : window.location.pathname === "/" ? (
                <>
                  <Link className="signupPage_button" to="/signup">
                    Crear Cuenta
                  </Link>
                  <Link className="signupPage_button" to="/login">
                    Iniciar Sesión
                  </Link>
                </>
              ) : (
                <Link className="signupPage_button" to="/signup">
                  Crear Cuenta
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header >
  );
}

export default Navbar;
