import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { categories } from '../data/blogData';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';
import { blogTemplates } from '../data/blogTemplates';

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

  const handleSubmit = async (isDraft = false) => {
    try {
      setIsSubmitting(true);
      
      if (!formData.title || !formData.content || !previewImage) {
        toast.error('Please fill in all required fields and add a cover image');
        return;
      }

      const newBlogPost = {
        title: formData.title,
        excerpt: formData.excerpt || formData.content.slice(0, 150) + '...',
        image: previewImage,
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
        readTime: formData.readTime,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        reactions: 0,
        comments: 0,
        content: formData.content,
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.excerpt,
        status: isDraft ? 'draft' : 'published'
      };

      const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      const updatedPosts = [newBlogPost, ...existingPosts];
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));

      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event('storage'));

      toast.success(isDraft ? 'Draft saved successfully!' : 'Post published successfully!');
      setUnsavedChanges(false);
      
      if (!isDraft) {
        localStorage.removeItem('blog-draft');
      }

      navigate(isDraft ? '/blog/drafts' : `/blog/${newBlogPost.slug}`);
    } catch (error) {
      toast.error(error.message);
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
    }
  };

  const handleCustomTagSubmit = (e) => {
    e.preventDefault();
    if (customTag && customTag.length <= 20) {
      if (selectedTags.length < 4) {
        setSelectedTags([...selectedTags, customTag.toLowerCase()]);
        setCustomTag('');
        setShowCustomTagInput(false);
      } else {
        toast.error('Maximum 4 tags allowed');
      }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Create New Post</h1>
            <p className="text-gray-400">Share your thoughts and knowledge with the community</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {wordCount} words · {formData.readTime}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSplitView(!splitView)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  splitView 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setIsPreview(!isPreview)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isPreview 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                }`}
              >
                {isPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-2 ${splitView ? 'grid grid-cols-2 gap-0' : ''}`}>
            {isPreview ? (
              <div className="space-y-6">
                {previewImage && (
                  <img 
                    src={previewImage} 
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                )}
                <h1 className="text-3xl font-bold text-white">{formData.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                  <span>·</span>
                  <span>{formData.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{formData.content}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className={`${splitView ? 'grid grid-cols-2 fixed inset-0 pt-24 px-4 pb-4 bg-black/95 z-50' : 'space-y-6'}`}>
                {!splitView && !isPreview && (
                  <TemplateSelector />
                )}

                {/* Editor Panel */}
                <div className={`${splitView ? 'h-full overflow-y-auto px-4 border-r border-gray-800/50' : ''}`}>
                  {!splitView && (
                    // Image upload and other sections for non-split view...
                    <div className="space-y-6">
                      {/* Existing image upload and title sections */}
                    </div>
                  )}

                  <div className={`relative ${splitView ? 'h-full flex flex-col' : ''}`}>
                    {splitView && (
                      <div className="flex items-center justify-between py-3 border-b border-gray-800/50 mb-4">
                        <h3 className="text-lg font-semibold text-white">Editor</h3>
                        <button
                          onClick={() => setSplitView(false)}
                          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50"
                          title="Close Split View"
                        >
                          <CloseIcon className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    {/* Formatting Toolbar */}
                    <div className={`${splitView ? 'sticky top-0 bg-black/95 py-2 z-10' : ''}`}>
                      <div className="flex items-center gap-1 p-1 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleFormatClick('h1')}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                            title="Heading 1"
                          >
                            <H1Icon className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleFormatClick('h2')}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                            title="Heading 2"
                          >
                            <H2Icon className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="w-px h-5 bg-gray-700" />
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleFormatClick('bold')}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                            title="Bold (⌘B)"
                          >
                            <BoldIcon className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleFormatClick('italic')}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                            title="Italic (⌘I)"
                          >
                            <ItalicIcon className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="w-px h-5 bg-gray-700" />
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleFormatClick('link')}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                            title="Add Link (⌘K)"
                          >
                            <LinkIcon className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleFormatClick('code')}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                            title="Code"
                          >
                            <CodeIcon className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="w-px h-5 bg-gray-700" />
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleFormatClick('quote')}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                            title="Quote"
                          >
                            <QuoteIcon className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleFormatClick('list')}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                            title="List"
                          >
                            <ListIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Editor */}
                    <div className={`${splitView ? 'flex-1' : ''}`}>
                      <textarea 
                        ref={contentRef}
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Write your post content here... (Markdown supported)"
                        className={`w-full bg-transparent text-gray-100 rounded-lg p-4 
                        border border-gray-800/50 focus:border-blue-500/50 focus:ring-0 resize-none
                        ${splitView ? 'h-[calc(100vh-200px)]' : 'h-96'}`}
                      />
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-400 px-1">
                      <div className="flex items-center gap-4">
                        <span>{charCount} characters</span>
                        <span>{wordCount} words</span>
                        <span>{formData.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Markdown</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded text-xs">supported</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Panel */}
                {splitView && (
                  <div className="h-full overflow-y-auto px-6">
                    <div className="sticky top-0 bg-gradient-to-b from-black via-black/95 to-transparent py-3 mb-4">
                      <div className="flex items-center justify-between border-b border-gray-800/50 pb-3">
                        <h3 className="text-lg font-semibold text-white">Preview</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>Auto-updating</span>
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown>{formData.content || 'Start writing to see the preview...'}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {splitView && (
            <div className="relative">
              <div className="sticky top-0 bg-gradient-to-b from-black to-transparent py-2 mb-4">
                <h3 className="text-sm font-medium text-gray-400">Live Preview</h3>
              </div>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{formData.content}</ReactMarkdown>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Writing Tips */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-6 
            border border-gray-800/50">
              <h3 className="font-bold text-white mb-4">Writing Tips</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Keep paragraphs short and focused
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Use headings to structure your content
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Include relevant code examples
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  End with a clear conclusion
                </li>
              </ul>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-6 
            border border-gray-800/50">
              <h3 className="font-bold text-white mb-4">Keyboard Shortcuts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Bold</span>
                  <kbd className="px-2 py-1 bg-gray-800 text-gray-100 rounded">⌘B</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Italic</span>
                  <kbd className="px-2 py-1 bg-gray-800 text-gray-100 rounded">⌘I</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Add Link</span>
                  <kbd className="px-2 py-1 bg-gray-800 text-gray-100 rounded">⌘K</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Save Draft</span>
                  <kbd className="px-2 py-1 bg-gray-800 text-gray-100 rounded">⌘S</kbd>
                </div>
              </div>
            </div>

            {/* Markdown Guide */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-6 
            border border-gray-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Markdown Guide</h3>
                <button 
                  onClick={() => setShowMarkdownGuide(!showMarkdownGuide)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  {showMarkdownGuide ? 'Hide' : 'Show'} Guide
                </button>
              </div>
              {showMarkdownGuide && (
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-gray-400">
                    <code className="bg-gray-800 px-2 py-1 rounded"># Heading 1</code>
                    <span>Main heading</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <code className="bg-gray-800 px-2 py-1 rounded">## Heading 2</code>
                    <span>Sub heading</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <code className="bg-gray-800 px-2 py-1 rounded">**bold**</code>
                    <span>Bold text</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <code className="bg-gray-800 px-2 py-1 rounded">*italic*</code>
                    <span>Italic text</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <code className="bg-gray-800 px-2 py-1 rounded">[link](url)</code>
                    <span>Hyperlink</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <code className="bg-gray-800 px-2 py-1 rounded">```code```</code>
                    <span>Code block</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content Stats */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-6 
            border border-gray-800/50">
              <h3 className="font-bold text-white mb-4">Content Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">{wordCount}</div>
                  <div className="text-sm text-gray-400">Words</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">{charCount}</div>
                  <div className="text-sm text-gray-400">Characters</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">{formData.readTime}</div>
                  <div className="text-sm text-gray-400">Read Time</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">{selectedTags.length}/4</div>
                  <div className="text-sm text-gray-400">Tags Used</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-6 
            border border-gray-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Publishing Options</h3>
                {autoSaveStatus && (
                  <span className="text-sm text-gray-400">{autoSaveStatus}</span>
                )}
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-lg 
                  hover:bg-blue-600 transition-colors disabled:opacity-50 
                  disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Publishing...
                    </>
                  ) : 'Publish Post'}
                </button>
                <button 
                  onClick={() => handleSubmit(true)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-gray-800 text-gray-100 rounded-lg 
                  hover:bg-gray-700 transition-colors disabled:opacity-50 
                  disabled:cursor-not-allowed"
                >
                  Save as Draft
                </button>
                <button 
                  onClick={clearDraft}
                  className="w-full px-4 py-2.5 bg-red-500/10 text-red-400 rounded-lg 
                  hover:bg-red-500/20 transition-colors"
                >
                  Clear Draft
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-6 
            border border-gray-800/50">
              <h3 className="font-bold text-white mb-4">Tags</h3>
              <p className="text-sm text-gray-400 mb-4">Select up to 4 tags</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.filter(tag => tag !== 'all').map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-gray-800 text-gray-400 border border-transparent hover:text-white'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {/* Custom Tag Input */}
              {showCustomTagInput ? (
                <form onSubmit={handleCustomTagSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value.replace(/\s+/g, '-'))}
                    placeholder="Enter custom tag"
                    className="flex-1 bg-gray-900/50 text-gray-100 rounded-lg px-3 py-1.5 
                    border border-gray-800/50 focus:border-blue-500/50 focus:ring-0 text-sm"
                    maxLength={20}
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm 
                    hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomTagInput(false)}
                    className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg text-sm 
                    hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowCustomTagInput(true)}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  + Add custom tag
                </button>
              )}
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-6 
            border border-gray-800/50">
              <h3 className="font-bold text-white mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Meta Title</label>
                  <input 
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 text-gray-100 rounded-lg p-2.5 border 
                    border-gray-800/50 focus:border-blue-500/50 focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Meta Description</label>
                  <textarea 
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    className="w-full h-24 bg-gray-900/50 text-gray-100 rounded-lg p-2.5 border 
                    border-gray-800/50 focus:border-blue-500/50 focus:ring-0 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">URL Slug</label>
                  <input 
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 text-gray-100 rounded-lg p-2.5 border 
                    border-gray-800/50 focus:border-blue-500/50 focus:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Icon Components
const ImageIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
    />
  </svg>
);

const BoldIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
    />
  </svg>
);

const ItalicIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M19 4h-9M14 20H5M15 4L9 20"
    />
  </svg>
);

const LinkIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const CodeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const LoadingIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

const H1Icon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

const H2Icon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M4 6h16M4 12h8M4 18h7" />
  </svg>
);

const QuoteIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>
);

const ListIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default NewBlog; 