import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './SignupPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage('Ingresa un correo electrónico válido.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage('La contraseña solo puede contener letras y números.');
      return;
    }

    if (!usernameRegex.test(username)) {
      setErrorMessage('El nombre de usuario solo puede contener letras y números.');
      return;
    }

    axios
      .post('https://mindserver-production.up.railway.app/auth/signup', {
        email: email,
        password: password,
        name: name,
        username: username
      })
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="me_signupPage">
      <div className="signupPage">
        <div className="signupPage_container">
          <div className="signupPage_container_left">
            <p className="signupPage_left_title">MindEase</p>
            <div className="signupPage_left_mini">
              <p className="signupPage_left_mini_title">MindBot</p>
              <p className="signupPage_left_mini_desc">
                ¡MindBot que será tu amigo de confianza! MindEase te ofrece un compañero virtual que está aquí para escucharte y responder como si fuese un amigo. ¿Necesitas desahogarte después de un día difícil? ¿Quieres compartir tus alegrías y logros? Nuestro bot está preparado para estar a tu lado en todas las circunstancias.
              </p>
            </div>
            <div className="signupPage_left_mini">
              <p className="signupPage_left_mini_title">Directorio</p>
              <p className="signupPage_left_mini_desc">
                ¡Encuentra el especialista en salud mental adecuado para ti en nuestro directorio de especialistas! Te proporcionamos información detallada sobre una amplia variedad de lugares de atención, desde clínicas presenciales hasta servicios gratuitos y públicos en diferentes áreas de México.
              </p>
            </div>
            <div className="signupPage_left_mini">
              <p className="signupPage_left_mini_title">MindCommunity</p>
              <p className="signupPage_left_mini_desc">
                ¡Únete a nuestra comunidad en MindEase y descubre un espacio donde encontrarás apoyo, conexión y amistad en México! Aquí podrás interactuar con personas que han experimentado o están pasando por situaciones similares a las tuyas. Nuestra plataforma te brinda la oportunidad de compartir tus experiencias, intereses y preocupaciones, y al mismo tiempo, estar allí para otros que necesitan tu apoyo.
              </p>
            </div>
          </div>
          <div className="signupPage_container_right">
            <p className="signupPage_title">Crea tu cuenta de MindEase</p>
            <div className="signupPage_form">
              <form onSubmit={handleSignupSubmit}>
                <div className="signupPage_inputContainer">
                  <span className="signupPage_inputTitle">Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    className="signupPage_input"
                    required
                  />
                </div>

                <div className="signupPage_inputContainer">
                  <span className="signupPage_inputTitle">Password:</span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="signupPage_input"
                    required
                    pattern="^[a-zA-Z0-9]+$"
                    title="La contraseña solo puede contener letras y números."
                  />
                </div>

                <div className="signupPage_inputContainer">
                  <span className="signupPage_inputTitle">Username:</span>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                    className="signupPage_input"
                    required
                    pattern="^[a-zA-Z0-9]+$"
                    title="El nombre de usuario solo puede contener letras y números."
                  />
                </div>

                <div className="signupPage_inputContainer">
                  <span className="signupPage_inputTitle">Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                    className="signupPage_input"
                    required
                  />
                </div>

                <div className="signupPage_inputContainer">
                  <button type="submit" className="signupPage_button">
                    Crea una cuenta
                  </button>
                </div>
              </form>
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="signupPage_finalLinks">
                <p>¿Ya tienes una cuenta?</p>
                <Link to="/login" className="linkfinal">
                  Inicia con ella.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
