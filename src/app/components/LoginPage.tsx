import { useState } from 'react';
import { ChevronLeft, Mail, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isRTL = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header with Back Button and Language Selector */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ChevronLeft size={20} className={isRTL ? 'rotate-180' : ''} />
            <span className="text-sm">{t('common.back')}</span>
          </button>
          <LanguageSelector />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <span className="text-5xl">🕌</span>
          </div>
          <h1 className="text-4xl text-emerald-800 mb-2" style={{ fontFamily: isRTL ? 'Amiri' : 'Georgia, serif' }}>
            KHENDEQ
          </h1>
          <p className="text-gray-600">{t('info.title')}</p>
        </div>

        {/* Arabic Greeting */}
        <div className="bg-white rounded-xl p-5 shadow-lg mb-8 max-w-md w-full border-t-4 border-emerald-500">
          <p className="text-xl text-center text-emerald-700 mb-1" dir="rtl">
            {t('greeting.peace')}
          </p>
          <p className="text-center text-sm text-gray-600">{t('greeting.peace')}</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl text-center text-gray-800 mb-6">{t('login.title')}</h2>
            
            {/* Email Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t('login.email')}
              </label>
              <div className="relative">
                <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2`}>
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all`}
                  placeholder={t('login.emailPlaceholder')}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t('login.password')}
              </label>
              <div className="relative">
                <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2`}>
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all`}
                  placeholder={t('login.passwordPlaceholder')}
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-[1.02] text-lg"
            >
              {t('login.loginButton')}
            </button>

            {/* Info Text */}
            <p className="text-center text-sm text-gray-600 mt-4">
              {t('login.newUserNote')}
            </p>
          </div>
        </form>

        {/* Footer Quote */}
        <div className="mt-8 max-w-md">
          <p className="text-center text-gray-600 italic text-sm" style={{ fontFamily: isRTL ? 'Amiri' : 'Georgia, serif' }}>
            {t('login.seekKnowledge')}
          </p>
          <p className="text-center text-xs text-gray-500 mt-1">- {t('login.islamicTeaching')}</p>
        </div>
      </div>
    </div>
  );
}
