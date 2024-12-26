import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ModelView from '../components/ModelView';

const ModelViewPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="hero-content text-center max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6">
                Our Projects
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                Explore our portfolio of innovative digital solutions
              </p>
              <div className="relative h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10">
                <ModelView />
                {/* Decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/20 blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-purple-500/20 blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ModelViewPage; 