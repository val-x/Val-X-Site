import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import LearnWithUs from './pages/LearnWithUs';
import ProgramMaterials from './pages/ProgramMaterials';
import { Toaster } from 'react-hot-toast';
import * as Sentry from '@sentry/react';
import SEO from './components/SEO';

const App = () => {
  return (
    <HelmetProvider>
      <div className="bg-black text-white">
        <SEO />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<LearnWithUs />} />
          <Route path="/program/:programId/materials" element={<ProgramMaterials />} />
        </Routes>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'bg-gray-900 text-white border border-gray-800',
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
            },
          }}
        />
      </div>
    </HelmetProvider>
  );
};

export default Sentry.withProfiler(App);
