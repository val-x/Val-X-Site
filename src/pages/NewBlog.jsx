import { useState, useCallback, useEffect, useRef, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { categories } from '../data/blogData';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';
import { blogTemplates } from '../data/blogTemplates';
import { 
  ArticleIcon, 
  ImageIcon, 
  VideoIcon, 
  PodcastIcon,
  CloseIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  CodeIcon,
  H1Icon,
  H2Icon,
  QuoteIcon,
  ListIcon,
  LoadingIcon 
} from '../components/Icons';

const NewBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    metaTitle: '',
    metaDescription: '',
    readTime: '5 min read',
    slug: '',
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const contentRef = useRef(null);
  const [splitView, setSplitView] = useState(false);
  const [showMarkdownGuide, setShowMarkdownGuide] = useState(false);
  const [customTag, setCustomTag] = useState('');
  const [showCustomTagInput, setShowCustomTagInput] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [contentType, setContentType] = useState('blog');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [duration, setDuration] = useState(null);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showTemplateGuide, setShowTemplateGuide] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const EditorContext = createContext({
    wordCount: 0,
    charCount: 0,
    readTime: '0 min read'
  });

  const contentTypes = [
    { 
      id: 'blog', 
      label: 'Blog Post', 
      icon: ArticleIcon,
      description: 'Write an article with text and images'
    },
    { 
      id: 'image', 
      label: 'Photo Post', 
      icon: ImageIcon,
      description: 'Share photos and galleries'
    },
    { 
      id: 'video', 
      label: 'Video', 
      icon: VideoIcon,
      description: 'Upload and share videos'
    },
    { 
      id: 'podcast', 
      label: 'Podcast', 
      icon: PodcastIcon,
      description: 'Share audio content'
    }
  ];

  useEffect(() => {
    const words = formData.content.trim().split(/\s+/).length;
    setWordCount(words);
    setFormData(prev => ({
      ...prev,
      readTime: `${Math.max(1, Math.ceil(words / 200))} min read`
    }));
  }, [formData.content]);

  useEffect(() => {
    const autoSave = async () => {
      if (formData.title || formData.content) {
        setAutoSaveStatus('Saving...');
        try {
          localStorage.setItem('blog-draft', JSON.stringify({
            formData,
            selectedTags,
            previewImage,
            lastSaved: new Date().toISOString()
          }));
          setAutoSaveStatus('Saved');
          setTimeout(() => setAutoSaveStatus(''), 2000);
        } catch (error) {
          setAutoSaveStatus('Failed to save');
        }
      }
    };

    const timeoutId = setTimeout(autoSave, 3000);
    return () => clearTimeout(timeoutId);
  }, [formData, selectedTags, previewImage]);

  useEffect(() => {
    const savedDraft = localStorage.getItem('blog-draft');
    if (savedDraft) {
      const { formData: savedFormData, selectedTags: savedTags, previewImage: savedImage } = JSON.parse(savedDraft);
      setFormData(savedFormData);
      setSelectedTags(savedTags);
      setPreviewImage(savedImage);
    }
  }, []);

  useEffect(() => {
    setCharCount(formData.content.length);
  }, [formData.content]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedChanges]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && {
        slug: value.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      })
    }));
    setUnsavedChanges(true);
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 4) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file);
    }
  }, []);

  const handleImageFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageFile(file);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            handleFormatClick('bold');
            break;
          case 'i':
            e.preventDefault();
            handleFormatClick('italic');
            break;
          case 'k':
            e.preventDefault();
            handleFormatClick('link');
            break;
          case 's':
            e.preventDefault();
            handleSubmit(true); // Save as draft
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const validatePost = () => {
    if (!formData.title) {
      toast.error('Please add a title');
      return false;
    }

    switch (contentType) {
      case 'blog':
        if (!formData.content) {
          toast.error('Please add some content');
          return false;
        }
        break;
      case 'image':
        if (mediaFiles.length === 0) {
          toast.error('Please add at least one image');
          return false;
        }
        break;
      case 'video':
        if (mediaFiles.length === 0) {
          toast.error('Please upload a video');
          return false;
        }
        break;
      case 'podcast':
        if (mediaFiles.length === 0) {
          toast.error('Please upload an audio file');
          return false;
        }
        break;
    }

    if (selectedTags.length === 0) {
      toast.error('Please add at least one tag');
      return false;
    }

    return true;
  };

  const handleSubmit = async (isDraft = false) => {
    try {
      setIsSubmitting(true);
      
      if (!validatePost()) {
        setIsSubmitting(false);
        return;
      }

      // Create base post object
      const basePost = {
        title: formData.title,
        excerpt: formData.excerpt || formData.content?.slice(0, 150) + '...',
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        tags: selectedTags,
        author: {
          name: "Current User",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        },
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        reactions: 0,
        comments: 0,
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.excerpt,
        status: isDraft ? 'draft' : 'published',
        type: contentType
      };

      // Add content type specific data
      let postData = { ...basePost };

      switch (contentType) {
        case 'blog':
          postData = {
            ...postData,
            content: formData.content,
            readTime: formData.readTime,
            image: previewImage
          };
          break;

        case 'image':
          postData = {
            ...postData,
            type: mediaFiles.length > 1 ? 'gallery' : 'image',
            images: mediaFiles.length > 1 ? mediaFiles.map(f => f.preview) : undefined,
            image: mediaFiles.length === 1 ? mediaFiles[0].preview : undefined
          };
          break;

        case 'video':
          postData = {
            ...postData,
            videoUrl: mediaFiles[0].preview,
            thumbnail: previewImage,
            duration: duration ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}` : undefined
          };
          break;

        case 'podcast':
          postData = {
            ...postData,
            audioUrl: mediaFiles[0].preview,
            thumbnail: previewImage,
            duration: duration ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}` : undefined
          };
          break;
      }

      // Save to localStorage
      const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      const updatedPosts = [postData, ...existingPosts];
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));

      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event('storage'));

      toast.success(isDraft ? 'Draft saved successfully!' : 'Post published successfully!');
      setUnsavedChanges(false);
      
      if (!isDraft) {
        localStorage.removeItem('blog-draft');
        
        // Clean up media previews
        mediaFiles.forEach(file => {
          URL.revokeObjectURL(file.preview);
        });
      }

      // Navigate based on content type
      const baseRoute = isDraft ? '/blog/drafts' : '/blog';
      switch (contentType) {
        case 'video':
          navigate(`/blog/video/${postData.slug}`);
          break;
        case 'podcast':
          navigate(`/blog/podcast/${postData.slug}`);
          break;
        default:
          navigate(`${baseRoute}/${postData.slug}`);
      }
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to publish post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const insertText = (before, after = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = before + selectedText + after;
    const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    
    setFormData(prev => ({ ...prev, content: newContent }));
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleFormatClick = (format) => {
    switch (format) {
      case 'bold':
        insertText('**', '**');
        break;
      case 'italic':
        insertText('*', '*');
        break;
      case 'code':
        insertText('`', '`');
        break;
      case 'link':
        insertText('[', '](url)');
        break;
      case 'h1':
        insertText('# ');
        break;
      case 'h2':
        insertText('## ');
        break;
      case 'h3':
        insertText('### ');
        break;
      case 'quote':
        insertText('> ');
        break;
      case 'list':
        insertText('- ');
        break;
      default:
        return;
    }
  };

  const clearDraft = () => {
    if (window.confirm('Are you sure you want to clear this draft? This action cannot be undone.')) {
      localStorage.removeItem('blog-draft');
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        metaTitle: '',
        metaDescription: '',
        readTime: '5 min read',
        slug: '',
      });
      setSelectedTags([]);
      setPreviewImage(null);
      setMediaFiles([]);
      setSelectedTemplate(null);
      toast.success('Draft cleared successfully');
    }
  };

  const handleCustomTagSubmit = (e) => {
    e.preventDefault();
    if (customTag && customTag.length <= 20) {
      if (selectedTags.length < 4) {
        if (!selectedTags.includes(customTag.toLowerCase())) {
          setSelectedTags([...selectedTags, customTag.toLowerCase()]);
          setCustomTag('');
          setShowCustomTagInput(false);
          toast.success('Tag added successfully');
        } else {
          toast.error('Tag already exists');
        }
      } else {
        toast.error('Maximum 4 tags allowed');
      }
    } else {
      toast.error('Tag must be between 1 and 20 characters');
    }
  };

  const handleTemplateSelect = (template) => {
    if (formData.content && !window.confirm('This will replace your current content. Continue?')) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      content: template.structure,
      tags: [...new Set([...selectedTags, ...template.tags])].slice(0, 4)
    }));
    setSelectedTemplate(template.id);
    
    // Scroll to editor
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const TemplateSelector = () => {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-6 
      border border-gray-800/50 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Start with a Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`flex flex-col items-center p-6 rounded-xl border transition-all
              ${selectedTemplate === template.id 
                ? 'bg-blue-500/10 border-blue-500/50' 
                : 'bg-gray-900/50 border-gray-800/50 hover:border-blue-500/30'}`}
            >
              <span className="text-4xl mb-3">{template.icon}</span>
              <h3 className="text-white font-medium mb-2">{template.name}</h3>
              <p className="text-sm text-gray-400 text-center mb-3">{template.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {template.tags.map(tag => (
                  <span key={tag} className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const ContentTypeSelector = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {contentTypes.map(type => (
        <button
          key={type.id}
          onClick={() => setContentType(type.id)}
          className={`flex flex-col items-center p-6 rounded-xl border transition-all
          ${contentType === type.id 
            ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10' 
            : 'bg-gray-900/50 border-gray-800/50 hover:border-blue-500/30'}`}
        >
          <type.icon className={`w-8 h-8 mb-3 ${
            contentType === type.id ? 'text-blue-400' : 'text-gray-400'
          }`} />
          <h3 className="text-white font-medium mb-2">{type.label}</h3>
          <p className="text-sm text-gray-400 text-center">{type.description}</p>
        </button>
      ))}
    </div>
  );

  const ImageUploadForm = () => {
    const handleImageSelect = (files) => {
      const newFiles = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        type: 'image'
      }));
      setMediaFiles(prev => [...prev, ...newFiles]);
    };

    return (
      <div className="space-y-6">
        {/* Image Drop Zone */}
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 text-center
          ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-blue-500/50'}
          transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => handleImageSelect(e.target.files)}
          />
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-800/50 
            flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-white font-medium">Drag photos here</p>
              <p className="text-sm text-gray-400">or click to upload</p>
            </div>
            <div className="text-xs text-gray-500">
              Up to 10 photos, max 5MB each
            </div>
          </div>
        </div>

        {/* Image Preview Grid */}
        {mediaFiles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaFiles.map((file, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <img 
                  src={file.preview} 
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    URL.revokeObjectURL(file.preview);
                    setMediaFiles(prev => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white 
                  opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const VideoUploadForm = () => {
    const handleVideoSelect = (file) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        setDuration(video.duration);
        setMediaFiles([{
          file,
          preview: URL.createObjectURL(file),
          type: 'video',
          duration: video.duration
        }]);
      };
    };

    return (
      <div className="space-y-6">
        {/* Video Drop Zone */}
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 text-center
          ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-blue-500/50'}
          transition-colors`}
        >
          <input
            type="file"
            accept="video/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => handleVideoSelect(e.target.files[0])}
          />
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-800/50 
            flex items-center justify-center">
              <VideoIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-white font-medium">Upload your video</p>
              <p className="text-sm text-gray-400">or drag and drop</p>
            </div>
            <div className="text-xs text-gray-500">
              MP4 or WebM, max 1GB
            </div>
          </div>
        </div>

        {/* Video Preview */}
        {mediaFiles[0] && (
          <div className="relative rounded-xl overflow-hidden bg-gray-900">
            <video
              src={mediaFiles[0].preview}
              className="w-full aspect-video"
              controls
            />
            <div className="absolute top-2 right-2">
              <button
                onClick={() => {
                  URL.revokeObjectURL(mediaFiles[0].preview);
                  setMediaFiles([]);
                }}
                className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 
                transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const PodcastUploadForm = () => {
    const handleAudioSelect = (file) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
        setMediaFiles([{
          file,
          preview: URL.createObjectURL(file),
          type: 'audio',
          duration: audio.duration
        }]);
      };
    };

    return (
      <div className="space-y-6">
        {/* Audio Drop Zone */}
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 text-center
          ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-blue-500/50'}
          transition-colors`}
        >
          <input
            type="file"
            accept="audio/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => handleAudioSelect(e.target.files[0])}
          />
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-800/50 
            flex items-center justify-center">
              <PodcastIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-white font-medium">Upload your audio</p>
              <p className="text-sm text-gray-400">or drag and drop</p>
            </div>
            <div className="text-xs text-gray-500">
              MP3 or WAV, max 500MB
            </div>
          </div>
        </div>

        {/* Audio Preview */}
        {mediaFiles[0] && (
          <div className="relative rounded-xl overflow-hidden bg-gray-900 p-6">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-gray-800 flex items-center justify-center">
                <PodcastIcon className="w-12 h-12 text-gray-600" />
              </div>
              <div className="flex-1">
                <audio
                  src={mediaFiles[0].preview}
                  className="w-full"
                  controls
                />
              </div>
              <button
                onClick={() => {
                  URL.revokeObjectURL(mediaFiles[0].preview);
                  setMediaFiles([]);
                }}
                className="p-1.5 rounded-full bg-gray-800 text-gray-400 
                hover:text-white transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const EditorPanel = ({ formData, handleInputChange, contentRef, splitView }) => {
    return (
      <div className={`relative ${splitView ? 'h-full' : ''}`}>
        <textarea
          ref={contentRef}
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Write your content here... (Markdown supported)"
          className="w-full h-[calc(100vh-400px)] bg-transparent text-gray-100 
          placeholder-gray-600 border-none focus:ring-0 resize-none font-mono"
        />
        <StatsBar />
      </div>
    );
  };

  const StatsBar = () => {
    const { wordCount, charCount, readTime } = useContext(EditorContext);
    
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm 
      border-t border-gray-800/50 p-2 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
          <span>{readTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowMarkdownGuide(true)} 
            className="hover:text-white transition-colors">
            Markdown Guide
          </button>
          <button onClick={() => setShowKeyboardShortcuts(true)} 
            className="hover:text-white transition-colors">
            Shortcuts
          </button>
        </div>
      </div>
    );
  };

  const MarkdownGuide = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const examples = [
      { label: 'Headers', items: [
        { syntax: '# Heading 1', description: 'Main heading' },
        { syntax: '## Heading 2', description: 'Sub heading' }
      ]},
      { label: 'Emphasis', items: [
        { syntax: '**bold**', description: 'Bold text' },
        { syntax: '*italic*', description: 'Italic text' }
      ]},
      { label: 'Lists', items: [
        { syntax: '- Item 1\n- Item 2', description: 'Unordered list' },
        { syntax: '1. First\n2. Second', description: 'Ordered list' }
      ]},
      { label: 'Code', items: [
        { syntax: '`inline code`', description: 'Inline code' },
        { syntax: '```\ncode block\n```', description: 'Code block' }
      ]},
      { label: 'Links & Images', items: [
        { syntax: '[link text](url)', description: 'Hyperlink' },
        { syntax: '![alt text](image-url)', description: 'Image' }
      ]}
    ];

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Markdown Guide</h2>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-8">
              {examples.map(section => (
                <div key={section.label}>
                  <h3 className="text-lg font-medium text-white mb-4">{section.label}</h3>
                  <div className="grid gap-4">
                    {section.items.map(item => (
                      <div key={item.syntax} className="flex items-start justify-between gap-4 
                      bg-gray-800/50 rounded-lg p-4">
                        <div className="flex-1">
                          <pre className="font-mono text-blue-400 text-sm mb-2">{item.syntax}</pre>
                          <div className="text-sm text-gray-400">{item.description}</div>
                        </div>
                        <div className="prose prose-invert text-sm min-w-[200px]">
                          <ReactMarkdown>{item.syntax}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WritingTips = () => {
    return (
      <div className="bg-gray-900/50 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-medium text-white">Writing Tips</h3>
        <ul className="text-xs text-gray-400 space-y-2">
          <li>• Start with a compelling introduction</li>
          <li>• Use clear headings to organize content</li>
          <li>• Include code examples when relevant</li>
          <li>• End with a strong conclusion</li>
        </ul>
      </div>
    );
  };

  const KeyboardShortcuts = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const shortcuts = [
      { category: 'Text Formatting', items: [
        { keys: ['⌘', 'B'], action: 'Bold text' },
        { keys: ['⌘', 'I'], action: 'Italic text' },
        { keys: ['⌘', 'K'], action: 'Insert link' }
      ]},
      { category: 'Headers', items: [
        { keys: ['⌘', '1'], action: 'H1 heading' },
        { keys: ['⌘', '2'], action: 'H2 heading' },
        { keys: ['⌘', '3'], action: 'H3 heading' }
      ]},
      { category: 'Lists', items: [
        { keys: ['⌘', 'L'], action: 'Bullet list' },
        { keys: ['⌘', 'Shift', 'L'], action: 'Numbered list' }
      ]},
      { category: 'View Controls', items: [
        { keys: ['⌘', 'P'], action: 'Toggle preview' },
        { keys: ['⌘', '\\'], action: 'Toggle split view' },
        { keys: ['⌘', 'S'], action: 'Save draft' }
      ]}
    ];

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-xl max-w-2xl w-full">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-6">
              {shortcuts.map(section => (
                <div key={section.category}>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">{section.category}</h3>
                  <div className="space-y-2">
                    {section.items.map(({ keys, action }) => (
                      <div key={action} className="flex items-center justify-between 
                      bg-gray-800/50 rounded-lg p-3">
                        <span className="text-sm text-white">{action}</span>
                        <div className="flex items-center gap-1">
                          {keys.map(key => (
                            <kbd key={key} className="px-2 py-1 bg-gray-700 text-gray-100 
                            rounded text-sm font-medium min-w-[24px] text-center">
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EditorProvider = ({ children, wordCount, charCount, readTime }) => {
    return (
      <EditorContext.Provider value={{ wordCount, charCount, readTime }}>
        {children}
      </EditorContext.Provider>
    );
  };

  const TemplateGuide = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Template Guide</h2>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-6">
              {blogTemplates.map(template => (
                <div key={template.id} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center 
                    justify-center">
                      <span className="text-2xl">{template.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{template.name}</h3>
                      <p className="text-sm text-gray-400">{template.description}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap">
                      {template.structure}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 
          blur-3xl opacity-30" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
            from-blue-400 via-purple-400 to-pink-400 mb-4">
              Create New Post
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Share your knowledge and insights with our growing community of developers
            </p>
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contentTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setContentType(type.id)}
              className={`relative group p-6 rounded-xl border transition-all duration-300
              ${contentType === type.id 
                ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                : 'bg-gray-900/50 border-gray-800/50 hover:border-blue-500/30'}`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                transition-colors duration-300 ${
                  contentType === type.id 
                    ? 'bg-blue-500/20' 
                    : 'bg-gray-800/50 group-hover:bg-gray-800'
                }`}>
                  <type.icon className={`w-6 h-6 ${
                    contentType === type.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-100'
                  }`} />
                </div>
                <h3 className="mt-4 font-medium text-white group-hover:text-blue-400 
                transition-colors duration-300">
                  {type.label}
                </h3>
                <p className="mt-2 text-sm text-gray-400 text-center">
                  {type.description}
                </p>
              </div>
              {contentType === type.id && (
                <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl 
                animate-pulse-slow pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* Main Editor Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EditorProvider 
              wordCount={wordCount}
              charCount={charCount}
              readTime={formData.readTime}
            >
              {/* Title Input */}
              <div className="relative group mb-8">
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your post title..."
                  className="w-full bg-gray-900/50 text-2xl font-bold text-white placeholder-gray-600 
                  px-6 py-4 rounded-xl border border-gray-800/50 focus:border-blue-500/50 focus:ring-0
                  transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 
                to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity 
                duration-300 pointer-events-none" />
              </div>

              {/* Content Type Specific Forms */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl 
              border border-gray-800/50 overflow-hidden backdrop-blur-sm">
                {contentType === 'blog' && (
                  <>
                    {/* Template Section Toggle */}
                    <div className="p-6 border-b border-gray-800/50">
                      <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="flex items-center justify-between w-full group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg transition-colors ${
                            showTemplates ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800/50 text-gray-400'
                          }`}>
                            <svg 
                              className="w-5 h-5" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M4 5h16M4 12h16m-7 7h7" 
                              />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h3 className="font-medium text-white group-hover:text-blue-400 
                            transition-colors">
                              Start with a Template
                            </h3>
                            <p className="text-sm text-gray-400">
                              Choose from pre-made templates to get started quickly
                            </p>
                          </div>
                        </div>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            showTemplates ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Template Preview Section - Collapsible */}
                    {showTemplates && (
                      <div className="p-6 border-b border-gray-800/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-white">Available Templates</h3>
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => setShowTemplateGuide(!showTemplateGuide)}
                              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              {showTemplateGuide ? 'Hide Guide' : 'View Guide'}
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {blogTemplates.map(template => (
                            <button
                              key={template.id}
                              onClick={() => handleTemplateSelect(template)}
                              className={`relative group p-6 rounded-xl border transition-all duration-300
                              ${selectedTemplate === template.id 
                                ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                                : 'bg-gray-900/50 border-gray-800/50 hover:border-blue-500/30'}`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center 
                                transition-colors duration-300 ${
                                  selectedTemplate === template.id 
                                    ? 'bg-blue-500/20' 
                                    : 'bg-gray-800/50 group-hover:bg-gray-800'
                                }`}>
                                  <span className="text-2xl">{template.icon}</span>
                                </div>
                                <div className="flex-1 text-left">
                                  <h4 className="font-medium text-white group-hover:text-blue-400 
                                  transition-colors duration-300">
                                    {template.name}
                                  </h4>
                                  <p className="text-sm text-gray-400">{template.description}</p>
                                </div>
                              </div>

                              {/* Template Preview */}
                              <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                                <div className="text-xs font-mono text-gray-400 line-clamp-3">
                                  {template.structure.split('\n').slice(0, 3).join('\n')}
                                </div>
                              </div>

                              {/* Template Tags */}
                              <div className="mt-4 flex flex-wrap gap-2">
                                {template.tags.map(tag => (
                                  <span 
                                    key={tag}
                                    className="px-2 py-1 text-xs font-medium rounded-full
                                    bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                              {selectedTemplate === template.id && (
                                <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl 
                                animate-pulse-slow pointer-events-none" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Editor Section */}
                    <div className="p-6">
                      {/* Editor Toolbar */}
                      <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg mb-4">
                        {/* Left side - Formatting tools */}
                        <div className="flex items-center">
                          {/* Text Formatting */}
                          <div className="flex items-center gap-1 pr-2 border-r border-gray-700">
                            <button 
                              onClick={() => handleFormatClick('h1')}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg
                              transition-colors"
                              title="Heading 1 (⌘1)"
                            >
                              <H1Icon className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleFormatClick('h2')}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg
                              transition-colors"
                              title="Heading 2 (⌘2)"
                            >
                              <H2Icon className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleFormatClick('bold')}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg
                              transition-colors"
                              title="Bold (⌘B)"
                            >
                              <BoldIcon className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleFormatClick('italic')}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg
                              transition-colors"
                              title="Italic (⌘I)"
                            >
                              <ItalicIcon className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleFormatClick('link')}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg
                              transition-colors"
                              title="Insert Link (⌘K)"
                            >
                              <LinkIcon className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleFormatClick('code')}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg
                              transition-colors"
                              title="Code Block"
                            >
                              <CodeIcon className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleFormatClick('quote')}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg
                              transition-colors"
                              title="Quote"
                            >
                              <QuoteIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Right side - View controls */}
                        <div className="flex items-center gap-2">
                          {/* Split View Toggle */}
                          <button
                            onClick={() => setSplitView(!splitView)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium 
                            transition-colors ${
                              splitView 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                            title="Toggle Split View (⌘\\)"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            Split View
                          </button>

                          {/* Preview Toggle */}
                          <button
                            onClick={() => setIsPreview(!isPreview)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium 
                            transition-colors ${
                              isPreview 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                            title="Toggle Preview (⌘P)"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {isPreview ? 'Edit' : 'Preview'}
                          </button>
                        </div>
                      </div>

                      {/* Editor/Preview Content */}
                      {isPreview ? (
                        <div className="prose prose-invert max-w-none">
                          <ReactMarkdown>{formData.content || 'Nothing to preview yet...'}</ReactMarkdown>
                        </div>
                      ) : (
                        <textarea 
                          ref={contentRef}
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          placeholder="Start writing your post..."
                          className="w-full h-[500px] bg-transparent text-gray-100 placeholder-gray-600 
                          border-none focus:ring-0 resize-none font-mono"
                        />
                      )}

                      {/* Split View Preview */}
                      {splitView && !isPreview && (
                        <div className="border-t border-gray-800/50 mt-4 pt-4">
                          <div className="prose prose-invert max-w-none">
                            <ReactMarkdown>{formData.content || 'Nothing to preview yet...'}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {contentType === 'image' && <ImageUploadForm />}
                {contentType === 'video' && <VideoUploadForm />}
                {contentType === 'podcast' && <PodcastUploadForm />}
              </div>
            </EditorProvider>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl p-6 
            border border-gray-800/50 backdrop-blur-sm">
              <h3 className="text-lg font-medium text-white mb-6">Publishing Options</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                  transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoadingIcon className="w-5 h-5 animate-spin" />
                      <span>Publishing...</span>
                    </div>
                  ) : 'Publish Post'}
                </button>

                <button 
                  onClick={() => handleSubmit(true)}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gray-800/50 text-gray-100 rounded-lg font-medium
                  hover:bg-gray-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save as Draft
                </button>
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl p-6 
            border border-gray-800/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Tags</h3>
                <button 
                  onClick={() => setShowCustomTagInput(!showCustomTagInput)}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  + Add Custom Tag
                </button>
              </div>

              {showCustomTagInput && (
                <form onSubmit={handleCustomTagSubmit} className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value.replace(/\s+/g, '-'))}
                      placeholder="Enter custom tag"
                      className="flex-1 bg-gray-800/50 text-gray-100 rounded-lg px-3 py-2 
                      border border-gray-700 focus:border-blue-500/50 focus:ring-0 text-sm"
                      maxLength={20}
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm 
                      hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </form>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {categories.filter(tag => tag !== 'all').map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 
                    ${selectedTags.includes(tag)
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Writing Tips */}
            <WritingTips />

            {/* Stats Section */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl p-6 
            border border-gray-800/50 backdrop-blur-sm">
              <h3 className="text-lg font-medium text-white mb-4">Content Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-transparent bg-clip-text 
                  bg-gradient-to-r from-blue-400 to-purple-400">
                    {wordCount}
                  </div>
                  <div className="text-sm text-gray-400">Words</div>
                </div>
                {/* Add other stats */}
              </div>
            </div>

            {/* Clear Draft Button */}
            <button 
              onClick={clearDraft}
              className="w-full px-4 py-2 bg-red-500/10 text-red-400 rounded-lg 
              hover:bg-red-500/20 transition-colors mt-4"
            >
              Clear Draft
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <MarkdownGuide isOpen={showMarkdownGuide} onClose={() => setShowMarkdownGuide(false)} />
      <KeyboardShortcuts isOpen={showKeyboardShortcuts} onClose={() => setShowKeyboardShortcuts(false)} />
      <TemplateGuide isOpen={showTemplateGuide} onClose={() => setShowTemplateGuide(false)} />
    </div>
  );
};

export default NewBlog; 