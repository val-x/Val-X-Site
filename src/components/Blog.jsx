import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    title: "The Future of AI in Software Development",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we build software...",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 15, 2024",
    category: "Technology"
  },
  {
    title: "Building Scalable Cloud Architecture",
    excerpt: "Learn the best practices for designing cloud infrastructure that grows with your business...",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 10, 2024",
    category: "Cloud Computing"
  },
  {
    title: "Mobile App Development Trends 2024",
    excerpt: "Stay ahead of the curve with these emerging trends in mobile application development...",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 5, 2024",
    category: "Mobile"
  }
];

const Blog = () => {
  useGSAP(() => {
    gsap.from(".blog-card", {
      scrollTrigger: {
        trigger: ".blog-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <section className="py-20 bg-black" id="blog">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay updated with our latest thoughts on technology and innovation
          </p>
        </div>

        <div className="blog-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={index}
              className="blog-card group bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-blue-400">{post.category}</span>
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {post.excerpt}
                </p>
                
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog; 