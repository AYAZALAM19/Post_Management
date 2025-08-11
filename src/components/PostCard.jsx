import React, { useState } from 'react';
import appwrite from '../appwrite/config';
import { Link } from 'react-router-dom';
import { Clock, User, Heart, MessageCircle, Share2, Eye } from 'lucide-react';

function PostCard({ $id, title, featuredImage, content, author, $createdAt, likes = 0, comments = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // Truncate content
  const truncateContent = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Handle like toggle
  const handleLike = (e) => {
    e.preventDefault(); // Prevent navigation when clicking like
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <article className='group h-full'>
      <Link to={`/post/${$id}`} className='block h-full'>
        <div className='h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-lg'>
          
          {/* Image Section */}
          <div className='relative aspect-[4/3] overflow-hidden bg-gray-100'>
            {!imageLoaded && (
              <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200'>
                <div className='w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
              </div>
            )}
            
            <img 
              src={appwrite.getFilePreview(featuredImage)} 
              alt={title}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.src = "/assets/image/logo.jpg";
                setImageLoaded(true);
              }}
            />
            
            {/* Overlay on hover */}
            <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            
            {/* View indicator */}
            <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
              <Eye className='w-4 h-4 text-gray-700' />
            </div>
          </div>

          {/* Content Section */}
          <div className='p-5 bg-gray-400'>
            {/* Title */}
            <h2 className='font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300'>
              {title}
            </h2>

            {/* Content Preview */}
            <p className='text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3'>
              {truncateContent(content)}
            </p>

            {/* Meta Info */}
            <div className='flex items-center justify-between text-xs text-gray-500 mb-4'>
              <div className='flex items-center gap-4'>
                {author && (
                  <div className='flex items-center gap-1'>
                    <User className='w-3 h-3' />
                    <span className='font-medium'>{author}</span>
                  </div>
                )}
                <div className='flex items-center gap-1'>
                  <Clock className='w-3 h-3' />
                  <span>{formatDate($createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
              <div className='flex items-center gap-4'>
                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 text-xs transition-colors duration-200 hover:scale-105 transform ${
                    isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className='font-medium'>{likeCount}</span>
                </button>

                {/* Comments */}
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                  <MessageCircle className='w-4 h-4' />
                  <span>{comments}</span>
                </div>
              </div>

              {/* Share Button */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Add share functionality here
                }}
                className='text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110 transform'
              >
                <Share2 className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PostCard;