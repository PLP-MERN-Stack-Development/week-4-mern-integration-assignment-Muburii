
import { useState } from 'react';
import { postService, categoryService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data.categories || data);
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    }

    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postService.createPost({ title, content, category });
      navigate('/');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  }

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
