import {
  ChevronLeft,
  BookOpen,
  Users,
  Trophy,
  Heart,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface InfoPageProps {
  onRegister: () => void;
  onGetStarted: () => void;
  onBack: () => void;
}

export function InfoPage({
  onRegister,
  onGetStarted,
  onBack,
}: InfoPageProps) {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header with Back Button and Language Selector */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ChevronLeft
              size={20}
              className={isRTL ? "rotate-180" : ""}
            />
            <span className="text-sm">{t("common.back")}</span>
          </button>
          <LanguageSelector />
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-4xl">🕌</span>
          </div>
          <h1 className="text-3xl tracking-wide">KHENDEQ</h1>
          <p className="text-sm opacity-90 mt-1">
            E-Learning Medresa
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-32 max-w-2xl mx-auto">
        {/* Arabic Greeting */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border-t-4 border-emerald-500">
          <p
            className="text-2xl text-center text-emerald-700 mb-2"
            style={{ fontFamily: "Amiri, serif" }}
            dir="rtl"
          >
            {t("info.bismillah")}
          </p>
          <p className="text-center text-gray-600 text-sm">
            {t("info.bismillahMeaning")}
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-8">
          <h2
            className="text-2xl text-emerald-800 mb-4 text-center"
            style={{
              fontFamily: isRTL ? "Amiri" : "Georgia, serif",
            }}
          >
            {t("info.missionTitle")}
          </h2>
          <p
            className="text-gray-700 leading-relaxed text-center mb-4"
            style={{
              fontFamily: isRTL ? "Amiri" : "Georgia, serif",
            }}
          >
            {t("info.missionText")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            className={`bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow ${isRTL ? "border-r-4" : "border-l-4"} border-emerald-500`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen
                  className="text-emerald-600"
                  size={24}
                />
              </div>
              <div>
                <h3 className="text-emerald-800 mb-1">
                  {t("info.feature1Title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("info.feature1Text")}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow ${isRTL ? "border-r-4" : "border-l-4"} border-teal-500`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="text-teal-600" size={24} />
              </div>
              <div>
                <h3 className="text-teal-800 mb-1">
                  {t("info.feature2Title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("info.feature2Text")}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow ${isRTL ? "border-r-4" : "border-l-4"} border-cyan-500`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Trophy className="text-cyan-600" size={24} />
              </div>
              <div>
                <h3 className="text-cyan-800 mb-1">
                  {t("info.feature3Title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("info.feature3Text")}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow ${isRTL ? "border-r-4" : "border-l-4"} border-pink-500`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="text-pink-600" size={24} />
              </div>
              <div>
                <h3 className="text-pink-800 mb-1">
                  {t("info.feature4Title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("info.feature4Text")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-xl mb-4 text-center">
            {t("info.whatsIncluded")}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">📖</span>
              <span>{t("info.include1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📚</span>
              <span>{t("info.include2")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎮</span>
              <span>{t("info.include3")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <span>{t("info.include4")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔔</span>
              <span>{t("info.include5")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">👤</span>
              <span>{t("info.include6")}</span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-amber-500 mb-6">
          <p
            className="text-center text-gray-700 italic mb-2"
            style={{
              fontFamily: isRTL ? "Amiri" : "Georgia, serif",
            }}
          >
            {t("info.quoteText")}
          </p>
          <p className="text-center text-sm text-gray-500">
            {t("info.quoteAuthor")}
          </p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-2xl mx-auto space-y-3">
          <button
            onClick={onRegister}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-[1.02]"
          >
            <span className="text-lg">
              {t("info.registerButton")}
            </span>
          </button>
          <button
            onClick={onGetStarted}
            className="w-full bg-white text-emerald-700 py-4 rounded-xl shadow-md border-2 border-emerald-600 hover:bg-emerald-50 transition-all transform hover:scale-[1.02]"
          >
            <span className="text-lg">
              {t("info.getStartedButton")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}