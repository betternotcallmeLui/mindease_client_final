import React, { useState, useContext, useEffect } from "react";
import '../Styles.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState("");
  const [setUser] = useState({});


  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await axios.delete("https://mindserver-production.up.railway.app/auth/delete", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log(response.data.message);

        localStorage.removeItem("authToken");

        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateDiagnosis = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await axios.post("https://mindserver-production.up.railway.app/diagnosis/diagnosis", {}, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setDiagnosis(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
          const response = await axios.get("https://mindserver-production.up.railway.app/chat/messages", {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setUser]);

  return (
    <div>
      <h1>Mi perfil</h1>
      <div className="row justify-content-center">
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="accountDetail text-white fw-bold d-flex ps-4 pe-4 justify-content-between align-items-center">
              <div className="mt-3">
                <p>Detalles de la cuenta</p>
              </div>
              <div>
              </div>
            </div>
            <div className="card-body">
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputFirstName">
                    Nombre: {localStorage.getItem("username")}
                  </label>
                  <h5 className="lead"></h5>
                </div>
                {/* <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputLastName">
                  Last name
                </label>
                <h5 className="lead">{user.lastName}</h5>
              </div> */}
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-md-6 mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Correo electrónico
                  </label>
                  <h5 className="lead"></h5>
                </div>
              </div>
              <div className="row gx-3 mb-3">
                <div>
                  <p>{"hola"}</p>
                </div>
              </div>
            </div>
            <div>
              <button
                className="signupPage_button"
                type="button"
                onClick={handleGenerateDiagnosis}
              >
                Generar diagnóstico
              </button>
              {diagnosis && (
                <div>
                  <h2>Notas de MindBot</h2>
                  <p>{diagnosis}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
