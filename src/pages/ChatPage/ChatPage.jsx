import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import '../Styles.css';


function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatFrame = useRef(null);

  const fetchMessages = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await axios.get("https://mindserver-production.up.railway.app/chat/messages", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMessages(response.data);
        scrollToBottom();
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      return;
    }
  
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `Paciente: ${newMessage}` },
    ]);
  
    setNewMessage("");
  
    setIsTyping(true);
  
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await axios.post(
          "https://mindserver-production.up.railway.app/chat/messages",
          { text: newMessage },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        const aiMessage = response.data;
        
        setIsTyping(false);
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: aiMessage },
        ]);
        scrollToBottom();
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo enviar el mensaje. Por favor, inténtelo de nuevo más tarde.");
  
      setIsTyping(false);
    }
  };
  
  

  const handleDeleteMessages = async () => {
    const confirmation = window.confirm(
      "¿Seguro que quieres restablecer el chat? Se eliminará todo su historial de mensajes y MindBot olvidará toda la información proporcionada."
    );
  
    if (!confirmation) {
      return;
    }
  
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        await axios.delete("https://mindserver-production.up.railway.app/chat/messages", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
  
        const firstMessage = {
          text: "MindBot: ¡Hola! ¿Cómo puedo ayudarte hoy?",
        };
        setMessages([firstMessage]);
      }
    } catch (error) {
      console.error(error);
      alert("MindBot: ¡Hola! ¿Cómo puedo ayudarte hoy?");
    }
  };   

  useEffect(() => {
    if (messages.length === 0) {
      fetchMessages();
    }
  }, [fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatFrame.current) {
      chatFrame.current.scrollTop = chatFrame.current.scrollHeight;
    }
  };

  const messageType = (message) => {
    if (message.startsWith("Usuario: ")) {
      return "patient";
    } else if (message.startsWith("MindBot: ")) {
      return "therapist";
    }
  };

  const removePrefix = (message) => {
    return message.replace(/^(Usuario: |MindBot: )/, "");
  };

  return (
    <div className="homePage_main">
      <div className="homePage">
        <div className="d-flex flex-row justify-content-center">
          <div className="box-chat d-flex flex-column p-3 gap-2 justify-content-end rounded-4">
            <div id="frame" ref={chatFrame}>
            <ul id="messages-ul" className="list-unstyled">
              {messages.map((message, index) => {
                const type = messageType(message.text);
                return (
                  <div
                    key={index}
                    className={`d-flex flex-row justify-content-${type === "patient" ? "end" : "start"}`}
                  >
                    <li
                      className={`${type} rounded-2 m-2 p-2`}
                      style={{ maxWidth: "250px" }}
                    >
                      {removePrefix(message.text)}
                    </li>
                  </div>
                );
              })}
              {isTyping && (
                <div className="d-flex flex-row justify-content-start">
                  <li className="therapist rounded-2 m-2 p-2" style={{ maxWidth: "250px" }}>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </li>
                </div>
              )}
            </ul>
            </div>
            <div className="d-flex flex-row justify-content-center m-0">
              <form onSubmit={handleMessageSubmit} className="m-0 container">
                <div className="row gap-2">
                <textarea
                  autoFocus
                  type="text"
                  id="message"
                  name="message"
                  maxLength="280"
                  className="col-10 rounded-3 border-0 flex-grow-1"
                  style={{ minHeight: "50px", maxHeight: "80px", outline: "none" }}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleMessageSubmit(e);
                    }
                  }}
                ></textarea>
                  <button type="submit" className="col-1 rounded-3 border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#569fec"
                      className="bi bi-send-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                  </button>
                  <button onClick={handleDeleteMessages} className="btn btn-danger">
                    Eliminar chat
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="profilePic d-flex flex-column justify-content-start">
          <div className="d-flex justify-content-center">
            <a href="/profile" className="logo fs-5 header">
              Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
