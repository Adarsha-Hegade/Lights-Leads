import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import LeadForm from './components/LeadForm';
import SuccessModal from './components/SuccessModal';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { FormData } from './types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();
  const formRef = useRef<HTMLDivElement>(null);
  
  const slugs = location.pathname.split('/').filter(Boolean);
  const redirectUrl = `https://magnific.in${location.pathname}`;
  const catalogueUrl = 'https://drive.google.com/file/d/1u9xgGTVEpBLpfZQA5uAt_JbtNaSXTyWd/view?usp=drive_link';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Scroll to form after loading with a small delay to ensure smooth transition
      setTimeout(() => {
        if (formRef.current) {
          const headerHeight = 80; // Approximate header height
          const offset = formRef.current.offsetTop - headerHeight;
          window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (data: FormData) => {
    try {
      // Skip email sending as requested
      setShowSuccess(true);
    } catch (error) {
      console.error('Error handling submission:', error);
      setShowSuccess(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main 
        className="flex-grow py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=2069")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div 
            ref={formRef}
            className="backdrop-blur-md bg-white/80 rounded-2xl shadow-2xl p-8 md:p-12"
          >
            {isLoading ? (
              <div className="space-y-6">
                <Skeleton height={50} />
                <Skeleton height={24} count={2} />
                <Skeleton height={60} count={3} />
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="text-[#c8a97e] w-8 h-8" />
                  </div>
                  <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Exclusive Designer Lighting Collection
                  </h2>
                  <p className="text-gray-600 text-lg font-light max-w-xl mx-auto">
                    Discover our curated collection of premium lighting designs. Complete the form below to receive exclusive access.
                  </p>
                </div>

                <LeadForm onSubmit={handleSubmit} />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />

      {showSuccess && (
        <SuccessModal
          catalogueUrl={catalogueUrl}
          websiteUrl={redirectUrl}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainContent />} />
    </Routes>
  );
};

export default App;