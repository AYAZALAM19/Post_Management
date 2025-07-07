import React from 'react';
import appwrite from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({$id, title, featuredImage, content}) {
  // console.log("Image fileId:", featuredImage)
  //  console.log("Image preview URL:", appwrite.getFilePreview(featuredImage));
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full rounded-xl bg-gray-600 p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={appwrite.getFilePreview(featuredImage)} alt={title} 
          className='rounded-xl'
          onError={(e) => {
            e.target.src = "/assets/image/logo.jpg"
          }}/>
        </div>
        <h2 className='text-xl font-bold text-black'>{title}</h2>
        <p>{content}</p>
      </div>
    </Link>
  )
}

export default PostCard