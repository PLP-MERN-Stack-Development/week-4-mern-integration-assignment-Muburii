import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import  Home from "./pages/Home";
import PostList from "./components/PostList";
import SinglePost from "./components/PostItem";
import PostForm from "./components/PostForm";

function AppRoutes() {
  const location = useLocation();
  const hideNav = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/home" element={<Home />} />
        <Route path="/posts" element={<PostList />} /> 
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
