import { useState, useEffect } from "react";
import { postService } from "../services/api";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService.getAllPosts()
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <PostForm onSuccess={(newPost) => setPosts([newPost, ...posts])} />
      {loading ? <p>Loading posts...</p> : <PostList posts={posts} />}
    </div>
  );
}