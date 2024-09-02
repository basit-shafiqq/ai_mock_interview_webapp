import React from 'react';
import { Button } from '@/components/ui/button';

function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <header className="w-full py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg animate-fadeIn">
            Welcome to InterVuAi
          </h1>
          <p className="text-white text-lg mt-2 opacity-80 animate-slideIn">
            Your AI-powered mock interview platform
          </p>
        </div>
      </header>

      <main className="container mx-auto flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-10 shadow-2xl max-w-3xl transform transition-transform duration-300  text-center">
          <h2 className="text-3xl font-semibold text-white mb-4 animate-pulse">
            Prepare for your dream job with AI-driven mock interviews
          </h2>
          <p className="text-white text-lg mb-8 opacity-90">
            InterVuAi offers tailored mock interviews using the latest AI technology, helping you sharpen your interview skills and boost your confidence.
          </p>
          <div className="flex justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
              Get Started
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full py-4">
        <div className="container mx-auto text-center">
          <p className="text-white text-sm opacity-75">
            © 2024 InterVuAi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
