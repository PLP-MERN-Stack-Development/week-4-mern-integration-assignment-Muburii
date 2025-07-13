import { useState } from "react";
import { postService } from "../services/api";

export default function PostForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      const newPost = await postService.createPost({ title, content });
      onSuccess(newPost); // Update list optimistically
      setTitle("");
      setContent("");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Post</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create Post"}
      </button>
    </form>
  );
}