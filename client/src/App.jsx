import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostList from './pages/PostList';
import SinglePost from './pages/SinglePost';
import PostForm from './pages/PostForm';
import NavBar from './components/NavBar';

function AppRoutes() {
  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostForm />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
