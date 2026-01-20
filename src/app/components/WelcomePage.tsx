import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface WelcomePageProps {
  onNext: () => void;
}

export function WelcomePage({ onNext }: WelcomePageProps) {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-800 flex flex-col items-center justify-between p-6 text-white">
      {/* Language Selector - Top Left */}
      <div className="w-full flex justify-start mb-4">
        <LanguageSelector />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
            <span className="text-5xl">🕌</span>
          </div>
          <h1 className="text-4xl mb-2">KHENDEQ</h1>
          <h1 className="text-lg mb-6 opacity-70">
            E-LEARNING MEDRESEH
          </h1>
        </div>

        <div className="space-y-4 max-w-md mt-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <p className="text-xl" dir="rtl">
            {t('greeting.arabic')}
          </p>
          <p className="text-lg opacity-90">
            {t('greeting.meaning')}
          </p>
          <p className="text-xl mt-6">{t('greeting.welcome')}</p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full max-w-md bg-white text-emerald-700 py-4 px-6 rounded-lg shadow-lg hover:bg-emerald-50 transition-colors"
      >
        {t('common.next').toUpperCase()}
      </button>
    </div>
  );
}
