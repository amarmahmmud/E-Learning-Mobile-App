import React, { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { InfoPage } from './components/InfoPage';
import { RegistrationFlow } from './components/RegistrationFlow';
import { LoginPage } from './components/LoginPage';
import { MainApp } from './components/MainApp';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

export type PageType = 'welcome' | 'info' | 'register' | 'login' | 'main';

function AppContent() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('welcome');

  const handleLogin = () => {
    setCurrentPage('main');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('welcome');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'welcome' && (
        <WelcomePage onNext={() => setCurrentPage('info')} />
      )}
      {currentPage === 'info' && (
        <InfoPage
          onRegister={() => setCurrentPage('register')}
          onGetStarted={() => setCurrentPage('login')}
          onBack={() => setCurrentPage('welcome')}
        />
      )}
      {currentPage === 'register' && (
        <RegistrationFlow onComplete={() => setCurrentPage('info')} />
      )}
      {currentPage === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onBack={() => setCurrentPage('info')}
        />
      )}
      {currentPage === 'main' && user && (
        <MainApp onLogout={handleLogout} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}