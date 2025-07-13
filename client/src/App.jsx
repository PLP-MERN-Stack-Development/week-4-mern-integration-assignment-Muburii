import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostList from './pages/PostList';
import SinglePost from './pages/SinglePost';
import PostForm from './pages/PostForm';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostForm />} />
      </Routes>
    </Router>
  );
}
