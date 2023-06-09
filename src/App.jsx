import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ChatPage from './pages/ChatPage/ChatPage';

import Navbar from "./components/Navbar/Navbar";
import MindBlog from "./pages/MindBlog/MindBlog";
import DirectoryPage from "./pages/DirectoryPage/DirectoryPage"

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/chat"
          element={
            <ChatPage />
          }
        />

        <Route
          path="/profile"
          element={
            <ProfilePage />
          }
        />

        <Route
          path="/signup"
          element={
            <SignupPage />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />

        <Route path="/blog" element={<MindBlog />} ></Route>
        <Route path="directory" element={<DirectoryPage />} />

      </Routes>
    </div>
  );
}

export default App;