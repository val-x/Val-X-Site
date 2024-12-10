import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

// Language display names and icons mapping
const LANGUAGES = {
  javascript: { name: 'JavaScript', icon: '⚡️' },
  typescript: { name: 'TypeScript', icon: '💪' },
  python: { name: 'Python', icon: '🐍' },
  java: { name: 'Java', icon: '☕️' },
  cpp: { name: 'C++', icon: '⚙️' },
  csharp: { name: 'C#', icon: '🎯' },
  go: { name: 'Go', icon: '🏃' },
  rust: { name: 'Rust', icon: '🦀' },
  ruby: { name: 'Ruby', icon: '💎' },
  php: { name: 'PHP', icon: '🐘' },
  swift: { name: 'Swift', icon: '🦅' },
  kotlin: { name: 'Kotlin', icon: '🎯' },
  scala: { name: 'Scala', icon: '🌟' },
  html: { name: 'HTML', icon: '🌐' },
  css: { name: 'CSS', icon: '🎨' },
  sql: { name: 'SQL', icon: '🗄️' },
  shell: { name: 'Shell', icon: '🐚' },
  dockerfile: { name: 'Dockerfile', icon: '🐋' },
  yaml: { name: 'YAML', icon: '📝' },
  json: { name: 'JSON', icon: '📦' },
  markdown: { name: 'Markdown', icon: '📝' }
};

const CodeBlock = ({ language, code, langInfo, copiedCode, onCopy }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative group">
      {/* Gradient Background */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 
        to-fuchsia-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
      
      <div className="relative">
        {/* Code Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 
          bg-gray-900/80 border-b border-white/10 rounded-t-lg">
          {/* Left Side */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 flex items-center gap-1.5 min-w-[100px]">
              {langInfo.icon}
              <span className="hidden sm:inline">{langInfo.name}</span>
            </span>
            <div className="hidden sm:flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
              <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Language Badge */}
            <span className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-400 
              border border-slate-700/50 hidden sm:inline-block">
              {language}
            </span>

            {/* Expand/Collapse Button - Only show if code is long */}
            {code.split('\n').length > 15 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm px-3 py-1 rounded-lg text-gray-400 
                  hover:text-white hover:bg-white/5 transition-colors hidden sm:flex items-center gap-1"
              >
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
            )}

            {/* Copy Button */}
            <button
              onClick={() => onCopy(code, language)}
              className={`text-sm px-3 py-1 rounded-lg transition-all duration-300 ${
                copiedCode === code
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="hidden sm:inline">{copiedCode === code ? 'Copied!' : 'Copy'}</span>
              <span className="sm:hidden">📋</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="relative overflow-hidden" style={{
          maxHeight: isExpanded ? 'none' : '400px'
        }}>
          {/* Line Numbers */}
          <div className="absolute left-0 top-0 pl-2 sm:pl-4 pt-4 text-gray-600 
            select-none font-mono text-xs sm:text-sm">
            {code.split('\n').map((_, i) => (
              <div key={i} className="px-2">{i + 1}</div>
            ))}
          </div>

          {/* Syntax Highlighted Code */}
          <div className="overflow-x-auto">
            <SyntaxHighlighter
              language={language}
              style={tomorrow}
              className={`!bg-gray-900/50 !pl-12 sm:!pl-16 !py-4 !pr-4 !m-0 
                rounded-b-lg border border-white/10 ${
                  !isExpanded && 'max-h-[400px]'
                }`}
              showLineNumbers={false}
              customStyle={{
                fontSize: '13px',
                lineHeight: '1.5',
                minWidth: '100%'
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>

          {/* Fade Out Effect for Long Code */}
          {!isExpanded && code.split('\n').length > 15 && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t 
              from-gray-900/50 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Mobile Expand Button */}
        {code.split('\n').length > 15 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2 text-sm text-gray-400 hover:text-white 
              bg-gray-900/50 border-t border-white/10 sm:hidden"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

const MarkdownRenderer = ({ content }) => {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code, language) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    const langInfo = LANGUAGES[language] || { name: language, icon: '📝' };
    toast.success(`${langInfo.icon} ${langInfo.name} code copied!`, {
      icon: '📋',
      style: {
        background: '#1f2937',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)'
      }
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1].toLowerCase() : 'text';
          const code = String(children).replace(/\n$/, '');
          const langInfo = LANGUAGES[language] || { name: language, icon: '📝' };
          
          return !inline ? (
            <CodeBlock
              language={language}
              code={code}
              langInfo={langInfo}
              copiedCode={copiedCode}
              onCopy={handleCopyCode}
            />
          ) : (
            <code className="bg-fuchsia-500/10 text-fuchsia-300 px-1.5 py-0.5 
              rounded-md font-mono text-sm" {...props}>
              {children}
            </code>
          );
        },
        h1({ children }) {
          const id = children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <h1 
              id={id}
              className="text-5xl font-black tracking-tight mt-16 mb-8
              text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400"
            >
              {children}
            </h1>
          );
        },
        h2({ children }) {
          const id = children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <h2 
              id={id}
              className="text-4xl font-black tracking-tight mt-16 mb-8
              text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400"
            >
              {children}
            </h2>
          );
        },
        h3({ children }) {
          const id = children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <h3 
              id={id}
              className="text-2xl font-black tracking-tight mt-8 mb-4
              text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"
            >
              {children}
            </h3>
          );
        },
        p({ children }) {
          return (
            <p className="text-gray-100 text-lg leading-relaxed mb-6">
              {children}
            </p>
          );
        },
        a({ href, children }) {
          return (
            <a 
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              {children}
            </a>
          );
        },
        ul({ children }) {
          return (
            <ul className="list-disc list-inside space-y-2 text-gray-100 mb-6">
              {children}
            </ul>
          );
        },
        ol({ children }) {
          return (
            <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-6">
              {children}
            </ol>
          );
        },
        li({ children }) {
          return (
            <li className="text-lg">
              {children}
            </li>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-violet-500 bg-gradient-to-br 
            from-violet-500/10 to-fuchsia-500/10 pl-6 py-4 pr-6 rounded-r-xl italic mb-6">
              {children}
            </blockquote>
          );
        },
        img({ src, alt }) {
          return (
            <div className="relative group mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 
              to-fuchsia-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <img 
                src={src} 
                alt={alt} 
                className="relative rounded-xl shadow-lg border border-white/10 w-full"
              />
            </div>
          );
        },
        table({ children }) {
          return (
            <div className="relative overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="bg-gray-900/50 text-white p-4 text-left border border-white/10">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="p-4 border border-white/10 text-gray-300">
              {children}
            </td>
          );
        },
        hr() {
          return (
            <hr className="border-white/10 my-8" />
          );
        },
        strong({ children }) {
          return (
            <strong className="font-bold text-white">
              {children}
            </strong>
          );
        },
        em({ children }) {
          return (
            <em className="italic text-fuchsia-300">
              {children}
            </em>
          );
        },
        del({ children }) {
          return (
            <del className="line-through text-gray-500">
              {children}
            </del>
          );
        },
        pre({ children }) {
          return (
            <pre className="relative">
              {children}
            </pre>
          );
        },
        input({ type, checked }) {
          if (type === 'checkbox') {
            return (
              <input
                type="checkbox"
                checked={checked}
                readOnly
                className="mr-2 rounded border-white/10 bg-gray-900/50 
                checked:bg-violet-500 checked:border-violet-500 focus:ring-0 
                focus:ring-offset-0"
              />
            );
          }
          return null;
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer; 