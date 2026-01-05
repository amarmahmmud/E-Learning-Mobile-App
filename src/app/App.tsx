import { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { InfoPage } from './components/InfoPage';
import { RegistrationFlow } from './components/RegistrationFlow';
import { LoginPage } from './components/LoginPage';
import { MainApp } from './components/MainApp';
import { LanguageProvider } from './contexts/LanguageContext';

export type PageType = 'welcome' | 'info' | 'register' | 'login' | 'main';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('main');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('welcome');
  };

  return (
    <LanguageProvider>
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
        {currentPage === 'main' && isLoggedIn && (
          <MainApp onLogout={handleLogout} />
        )}
      </div>
    </LanguageProvider>
  );
}