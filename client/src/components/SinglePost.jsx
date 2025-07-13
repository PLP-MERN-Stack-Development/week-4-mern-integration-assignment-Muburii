import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../services/api'; // adjust if your service file is in a different place

export default function SinglePost() {
  const { id } = useParams(); // get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        console.error(err);
        setError('Could not fetch post.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>No post found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-2">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="prose">
        <p>{post.content}</p>
      </div>
      {/* If you have comments */}
      {post.comments && post.comments.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          <ul className="space-y-2">
            {post.comments.map((comment, index) => (
              <li key={index} className="border p-2 rounded">
                <p className="font-medium">{comment.author}</p>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
