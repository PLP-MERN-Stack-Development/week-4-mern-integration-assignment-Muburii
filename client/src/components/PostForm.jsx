import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsername } from '../utils/auth';
import { postService, categoryService } from '../services/api';

export default function PostForm({ isEdit = false, onSuccess }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get current user from token
  const currentUser = getUsername();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: currentUser || 'Anonymous' // Use authenticated user
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load categories from API
        const catData = await categoryService.getAllCategories();
        setCategories(catData.categories || catData.data || catData || []);
        
        if (isEdit && id) {
          const postData = await postService.getPost(id);
          setFormData({
            title: postData.title,
            content: postData.content,
            category: postData.category?._id || '',
            author: postData.author // Keep existing author when editing
          });
        }
      } catch (err) {
        setError('Failed to load form data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For new posts, use authenticated user as author
      const finalData = isEdit 
        ? formData 
        : { ...formData, author: currentUser || 'Anonymous' };

      let result;
      if (isEdit) {
        result = await postService.updatePost(id, finalData);
      } else {
        result = await postService.createPost(finalData);
      }
      
      // Call onSuccess callback if provided (for HomePage integration)
      if (onSuccess && result) {
        onSuccess(result);
      } else {
        navigate('/posts');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading form...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Show author field only when editing */}
        {isEdit && (
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isEdit} // Only editable when editing existing post
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => onSuccess ? onSuccess(null) : navigate('/posts')}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </form>
    </div>
  );
}