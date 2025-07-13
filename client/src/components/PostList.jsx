import { useEffect, useState } from "react";
import { postService } from "../services/api";
import { Link } from "react-router-dom";

export default function PostList({ posts, setPosts }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (posts.length === 0) {
      postService.getAllPosts()
        .then((data) => {
          setPosts(data.posts || data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load posts");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [posts, setPosts]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 && <p>No posts found</p>}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}