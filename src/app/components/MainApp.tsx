import { useState } from 'react';
import { Home, BookOpen, TrendingUp, Bell, User, LogOut } from 'lucide-react';
import { HomePage } from './HomePage';
import { LessonPage } from './LessonPage';
import { ProgressPage } from './ProgressPage';
import { NotificationPage } from './NotificationPage';
import { ProfilePage } from './ProfilePage';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface MainAppProps {
  onLogout: () => void;
}

export type NavTab = 'home' | 'lesson' | 'progress' | 'notification' | 'profile';

export function MainApp({ onLogout }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header with Language Selector and Logout */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🕌</span>
            </div>
            <div>
              <h1 className="text-xl">KHENDEQ</h1>
              <p className="text-xs opacity-90">{t('info.title')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
            >
              <LogOut size={18} />
              <span className="text-sm">{t('common.logout')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'lesson' && <LessonPage />}
        {activeTab === 'progress' && <ProgressPage />}
        {activeTab === 'notification' && <NotificationPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-5 gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center py-3 transition-colors ${
                activeTab === 'home'
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
              <span className="text-xs mt-1">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('lesson')}
              className={`flex flex-col items-center justify-center py-3 transition-colors ${
                activeTab === 'lesson'
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen size={24} strokeWidth={activeTab === 'lesson' ? 2.5 : 2} />
              <span className="text-xs mt-1">Lesson</span>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className={`flex flex-col items-center justify-center py-3 transition-colors ${
                activeTab === 'progress'
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp size={24} strokeWidth={activeTab === 'progress' ? 2.5 : 2} />
              <span className="text-xs mt-1">Progress</span>
            </button>

            <button
              onClick={() => setActiveTab('notification')}
              className={`flex flex-col items-center justify-center py-3 transition-colors relative ${
                activeTab === 'notification'
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              <Bell size={24} strokeWidth={activeTab === 'notification' ? 2.5 : 2} />
              <span className="text-xs mt-1">Notification</span>
              {/* Notification Badge */}
              <div className={`absolute top-2 ${isRTL ? 'left-1/4' : 'right-1/4'} w-2 h-2 bg-red-500 rounded-full`}></div>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center py-3 transition-colors ${
                activeTab === 'profile'
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}