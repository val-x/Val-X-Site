import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPostForm = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([
    { type: 'text', content: '' }
  ]);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    image: '',
    tags: '',
    readTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectionChange = (index, value, type = 'text') => {
    setSections(prev => {
      const newSections = [...prev];
      newSections[index] = { type, content: value };
      return newSections;
    });
  };

  const addSection = (type = 'text') => {
    setSections(prev => [...prev, { type, content: '' }]);
  };

  const removeSection = (index) => {
    setSections(prev => prev.filter((_, i) => i !== index));
  };

  const formatContent = (sections) => {
    return sections.map(section => {
      switch (section.type) {
        case 'code':
          return "```\n" + section.content + "\n```\n\n";
        case 'heading':
          return "## " + section.content + "\n\n";
        case 'subheading':
          return "### " + section.content + "\n\n";
        case 'list':
          return section.content.split('\n')
            .map(item => "- " + item + "\n")
            .join('') + "\n";
        default:
          return section.content + "\n\n";
      }
    }).join('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Format current date
    const date = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    // Create new blog post object
    const newPost = {
      title: formData.title,
      excerpt: formData.excerpt,
      image: formData.image,
      date,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      author: {
        name: "Your Name", // You can make this dynamic or get from user context
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" // Default author image
      },
      readTime: formData.readTime || "5 min read",
      slug,
      reactions: 0,
      comments: 0,
      content: formatContent(sections)
    };

    // Add to blogPosts array
    blogPosts.unshift(newPost);

    // Redirect to the new blog post
    navigate(`/blog/${slug}`);
  };

  const renderSectionInput = (section, index) => {
    switch (section.type) {
      case 'code':
        return (
          <div className="relative">
            <textarea
              value={section.content}
              onChange={(e) => handleSectionChange(index, e.target.value, 'code')}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 font-mono"
              rows="8"
              placeholder="Enter code here..."
            />
            <div className="absolute top-2 right-2 text-xs text-gray-500">Code Block</div>
          </div>
        );
      case 'heading':
        return (
          <input
            type="text"
            value={section.content}
            onChange={(e) => handleSectionChange(index, e.target.value, 'heading')}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xl font-bold"
            placeholder="Enter heading..."
          />
        );
      case 'subheading':
        return (
          <input
            type="text"
            value={section.content}
            onChange={(e) => handleSectionChange(index, e.target.value, 'subheading')}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg font-semibold"
            placeholder="Enter subheading..."
          />
        );
      case 'list':
        return (
          <textarea
            value={section.content}
            onChange={(e) => handleSectionChange(index, e.target.value, 'list')}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            rows="4"
            placeholder="Enter list items (one per line)..."
          />
        );
      default:
        return (
          <textarea
            value={section.content}
            onChange={(e) => handleSectionChange(index, e.target.value, 'text')}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            rows="4"
            placeholder="Enter text content..."
          />
        );
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Create New Blog Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div className="bg-gray-900/50 p-6 rounded-lg space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="How to Connect Redis with PHP using Docker Compose"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="A brief introduction to setting up Redis with PHP in a Docker environment..."
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Cover Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                required
                placeholder="redis, php, docker, tutorial"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Read Time</label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="5 min read"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Content Sections</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addSection('text')}
                  className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Add Text
                </button>
                <button
                  type="button"
                  onClick={() => addSection('code')}
                  className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Add Code
                </button>
                <button
                  type="button"
                  onClick={() => addSection('heading')}
                  className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Add Heading
                </button>
                <button
                  type="button"
                  onClick={() => addSection('subheading')}
                  className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Add Subheading
                </button>
                <button
                  type="button"
                  onClick={() => addSection('list')}
                  className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Add List
                </button>
              </div>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="relative bg-gray-900/50 p-6 rounded-lg">
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-gray-400 capitalize">{section.type}</span>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
                {renderSectionInput(section, index)}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Publish Post
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostForm; 