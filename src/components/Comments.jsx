import { useState } from 'react';
import { CommentIcon, ReplyIcon, ShareIcon } from './Icons';
import { toast } from 'react-hot-toast';

const Comments = ({ comments: initialComments = [], onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(initialComments);
  const [replyTo, setReplyTo] = useState(null);

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      text: comment,
      author: {
        name: "Current User",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      replyTo: replyTo
    };

    setComments(prev => [newComment, ...prev]);
    setComment('');
    setReplyTo(null);
    onAddComment?.(newComment);
    toast.success('Comment added successfully!');
  };

  const handleShare = async (commentId) => {
    await navigator.clipboard.writeText(window.location.href + `#comment-${commentId}`);
    toast.success('Comment link copied to clipboard!');
  };

  return (
    <div className="relative">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 
      to-fuchsia-500/5 rounded-xl blur-xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
          from-cyan-400 via-violet-400 to-fuchsia-400">
            Discussion ({comments.length})
          </h2>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r 
            from-gray-900/50 to-black/50 border border-white/10 hover:border-violet-500/50 
            text-gray-400 hover:text-violet-400 transition-all duration-300 group"
          >
            <CommentIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="relative">
              {showComments ? 'Hide Comments' : 'Show Comments'}
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r 
              from-transparent via-violet-400 to-transparent opacity-0 group-hover:opacity-100 
              transition-opacity" />
            </span>
          </button>
        </div>

        {showComments && (
          <div className="space-y-8">
            {/* Comment Form */}
            <form onSubmit={handleComment} className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 
              to-fuchsia-500/10 rounded-xl blur-lg opacity-75 transition-opacity 
              group-hover:opacity-100" />
              
              <div className="relative">
                {replyTo && (
                  <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
                    <span>
                      Replying to <span className="text-violet-400">{replyTo.author.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setReplyTo(null)}
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="relative group/avatar">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 
                    via-violet-500 to-fuchsia-500 opacity-75 blur group-hover/avatar:opacity-100 
                    transition-opacity" />
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                      alt="Current User"
                      className="relative w-10 h-10 rounded-full border border-white/10"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={replyTo ? `Reply to ${replyTo.author.name}...` : "Add to the discussion..."}
                      className="w-full bg-gradient-to-br from-gray-900/90 to-black/90 text-gray-100 
                      rounded-xl p-4 border border-white/10 focus:border-violet-500/50 focus:ring-0 
                      resize-none h-24 placeholder-gray-500"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="relative px-6 py-2 rounded-lg overflow-hidden group/button"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 
                        opacity-75 group-hover/button:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 
                        opacity-0 group-hover/button:opacity-50 blur-lg transition-opacity" />
                        <span className="relative text-white font-medium">
                          {replyTo ? 'Reply' : 'Comment'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map(comment => (
                <div key={comment.id} id={`comment-${comment.id}`} className="group">
                  <div className="flex gap-4">
                    <div className="relative group/avatar">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/50 
                      via-violet-500/50 to-fuchsia-500/50 opacity-0 blur group-hover/avatar:opacity-75 
                      transition-opacity" />
                      <img 
                        src={comment.author.image}
                        alt={comment.author.name}
                        className="relative w-10 h-10 rounded-full border border-white/10"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="relative group/comment">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 
                        via-violet-500/10 to-fuchsia-500/10 rounded-xl blur opacity-0 
                        group-hover/comment:opacity-50 transition-opacity" />
                        
                        <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 
                        rounded-xl p-4 border border-white/10">
                          {comment.replyTo && (
                            <div className="text-sm text-gray-500 mb-2">
                              Replying to <span className="text-violet-400">{comment.replyTo.author.name}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r 
                            from-cyan-400 to-violet-400">
                              {comment.author.name}
                            </span>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          
                          <p className="text-gray-200">{comment.text}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2 ml-4">
                        <button 
                          onClick={() => setReplyTo(comment)}
                          className="text-sm text-gray-400 hover:text-violet-400 transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <ReplyIcon className="w-4 h-4" />
                            Reply
                          </div>
                        </button>
                        <button 
                          onClick={() => handleShare(comment.id)}
                          className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <ShareIcon className="w-4 h-4" />
                            Share
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments; 