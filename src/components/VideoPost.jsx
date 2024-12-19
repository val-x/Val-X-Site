import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiHeadphones } from 'react-icons/fi';

const VideoPost = ({ post }) => {
  const navigate = useNavigate();
  const isAudio = post.type === 'audio' || post.type === 'podcast';

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/blog/${post.slug}`);
  };

  return (
    <>
      <div 
        className="relative h-[300px] cursor-pointer group"
        onClick={handleClick}
      >
        {/* Thumbnail Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60" />
        <img 
          src={post.thumbnail || post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center 
            group-hover:bg-white/20 transition-all duration-300">
            {isAudio ? (
              <FiHeadphones className="w-8 h-8 text-white" />
            ) : (
              <FiPlay className="w-8 h-8 text-white transform translate-x-0.5" />
            )}
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 
          rounded-full bg-black/70 text-white text-sm backdrop-blur-sm">
          {isAudio ? (
            <>
              <FiHeadphones className="w-4 h-4" />
              <span>Podcast</span>
            </>
          ) : (
            <>
              <FiPlay className="w-4 h-4" />
              <span>Video</span>
            </>
          )}
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4 z-20 px-2 py-1 rounded bg-black/70 text-white text-sm">
          {post.duration || post.readTime}
        </div>
      </div>
    </>
  );
};

export default VideoPost; 