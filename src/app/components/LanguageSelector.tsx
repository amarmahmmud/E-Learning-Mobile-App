import { useState } from "react";
import { Languages, Check } from "lucide-react";
import {
  useLanguage,
  languages,
  Language,
} from "../contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all">
          <Languages color="green" size={20} />
          <span className="text-sm text-green-500">
            {languages[language]}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Languages size={24} className="text-emerald-600" />
            {t("common.language")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() =>
                handleLanguageChange(code as Language)
              }
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                language === code
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              <span
                className={`text-lg ${code === "ar" ? "font-arabic" : ""}`}
              >
                {name}
              </span>
              {language === code && <Check size={20} />}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}