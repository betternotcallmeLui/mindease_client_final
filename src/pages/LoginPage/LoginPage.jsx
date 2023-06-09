import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post("https://mindserver-production.up.railway.app/auth/login", requestBody)
      .then((response) => {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("username", response.data.username);
        navigate("/chat");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="me_signupPage">
      <div className="signupPage">
        <div className="card-header">Inicia Sesión en mindease</div>
        <div className="card-body">
          <form onSubmit={handleLoginSubmit}>
            <div className="signupPage_inputContainer">
              <span className="signupPage_inputTitle">Correo electrónico:</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                className="signupPage_input"
              />
            </div>

            <div className="signupPage_inputContainer">
              <span className="signupPage_inputTitle">Contraseña:</span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                className="signupPage_input"
              />
            </div>

            <button type="submit" className="signupPage_button">
              Inicia Sesión
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>¿Aún no tienes cuenta?</p>
          <Link to={"/signup"}>Crea una</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
