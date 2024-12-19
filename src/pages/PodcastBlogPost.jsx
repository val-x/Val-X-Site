import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import PodcastPlayer, { samplePodcasts } from '../components/podcast/PodcastPlayer';
import DynamicBackground from '../components/podcast/DynamicBackground';

const PodcastBlogPost = () => {
  const { slug } = useParams();
  const [post] = useState(() => {
    const blogPost = blogPosts.find(p => p.slug === slug);
    if (blogPost?.type === 'podcast') {
      return {
        ...blogPost,
        audioUrl: blogPost.audioUrl || samplePodcasts.synthwave.audioUrl,
        thumbnail: blogPost.thumbnail || blogPost.image,
        duration: blogPost.duration || "3:24"
      };
    }
    return samplePodcasts.synthwave;
  });

  useEffect(() => {
    console.log('Current post:', post);
    console.log('Audio URL:', post.audioUrl);
  }, [post]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Dynamic Background */}
        <DynamicBackground imageUrl={post.thumbnail} />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Podcast Player */}
          <PodcastPlayer 
            post={post}
            onProgress={(progress) => {
              console.log('Progress:', progress);
            }}
          />

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert max-w-none mt-8"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.div>

          {/* Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {post.tags?.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 text-sm text-blue-400 bg-blue-500/10 rounded-full
                  hover:bg-blue-500/20 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PodcastBlogPost; 