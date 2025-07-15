import { useState, useEffect } from "react";
import { postService } from "../services/api";
import PostList from "../components/PostList";
import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
import { getUserFromToken } from "../utils/auth";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const user = getUserFromToken();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.getAllPosts();
      setPosts(data.posts || []);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowCreateForm(false);
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section - Now integrated into main content */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.username || 'User'}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage your posts and stay organized
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {showCreateForm ? 'Cancel' : 'Create New Post'}
            </button>
          </div>
        </div>

        {/* Create Post Form */}
        {showCreateForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create New Post
            </h2>
            <PostForm onSuccess={handlePostCreated} />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 mr-2">⚠️</div>
              <div>
                <h3 className="font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
            <button
              onClick={fetchPosts}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Posts Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Posts
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Create your first post to get started!
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Create Post
                </button>
              </div>
            ) : (
              <PostList 
                posts={posts} 
                onPostDeleted={handlePostDeleted}
                onPostUpdated={handlePostUpdated}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}