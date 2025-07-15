import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getUsername } from '../utils/auth'; // Import your auth helper
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';

export default function PostItem({ post, onDelete }) {
  const currentUser = getUsername();
  const isAuthor = post.author === currentUser;
  
  return (
    <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow bg-white dark:bg-zinc-800">
      <div className="flex justify-between items-start mb-2">
        <Link to={`/posts/${post._id}`} className="block flex-grow">
          <h2 className="text-xl font-bold hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        {isAuthor && (
          <div className="flex space-x-2">
            <Link to={`/edit-post/${post._id}`}>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Edit size={16} />
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => onDelete(post._id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>
      
      <p className="text-gray-500 text-sm mb-3 dark:text-zinc-400">
        By {post.author} • {format(new Date(post.createdAt), 'MMM d, yyyy')}
        {post.category && (
          <span className="ml-2 px-2 py-1 bg-gray-100 dark:bg-zinc-700 rounded text-xs">
            {post.category.name}
          </span>
        )}
      </p>
      
      <p className="text-gray-700 line-clamp-2 mb-3 dark:text-zinc-300">
        {post.content}
      </p>
      
      <div className="flex justify-between items-center">
        <Link 
          to={`/posts/${post._id}`} 
          className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
        >
          Read more →
        </Link>
        
        {post.comments && post.comments.length > 0 && (
          <span className="text-xs text-gray-500 dark:text-zinc-400">
            {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
          </span>
        )}
      </div>
    </div>
  );
}