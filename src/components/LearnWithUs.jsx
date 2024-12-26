import React from 'react';

const LearnWithUs = () => {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Learn With Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expand your knowledge and skills with our comprehensive learning resources and programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Learning Resources Cards */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Video Tutorials</h3>
            <p className="text-gray-400">Access our library of detailed video tutorials covering various topics.</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Interactive Workshops</h3>
            <p className="text-gray-400">Join live workshops led by industry experts and gain hands-on experience.</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Documentation</h3>
            <p className="text-gray-400">Comprehensive guides and documentation to support your learning journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnWithUs; 