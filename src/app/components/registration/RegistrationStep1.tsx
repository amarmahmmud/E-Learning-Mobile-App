import { useState } from "react";
import {
  ChevronLeft,
  Upload,
  User,
  Mail,
  MapPin,
  Clock,
  Globe,
  BookOpen,
} from "lucide-react";
import { RegistrationData } from "../RegistrationFlow";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface RegistrationStep1Props {
  initialData: RegistrationData;
  onComplete: (data: Partial<RegistrationData>) => void;
}

const ROLES = [
  "MOTHER",
  "FATHER",
  "CARETAKER",
  "SIBLING",
  "OTHER",
];
const LANGUAGES = ["AMHARIC", "ENGLISH", "ARABIC", "OROMO"];
const CONTINENTS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Australia",
  "Antarctica",
];
const GENDERS = ["Female", "Male", "Other"];

export function RegistrationStep1({
  initialData,
  onComplete,
}: RegistrationStep1Props) {
  const [formData, setFormData] = useState({
    photo: initialData.photo,
    fullName: initialData.fullName,
    age: initialData.age,
    gender: initialData.gender,
    role: initialData.role,
    country: initialData.country,
    city: initialData.city,
    email: initialData.email,
    phoneNumber: initialData.phoneNumber,
    languages: initialData.languages,
    quranLevel: initialData.quranLevel,
    // suitableTime: initialData.suitableTime,
    expectations: initialData.expectations,
    username: initialData.username,
    password: initialData.password,
  });

  const [photoPreview, setPhotoPreview] = useState<
    string | null
  >(null);

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLanguageToggle = (language: string) => {
    const newLanguages = formData.languages.includes(language)
      ? formData.languages.filter((l) => l !== language)
      : [...formData.languages, language];
    setFormData({ ...formData, languages: newLanguages });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.age !== "" &&
      formData.gender !== "" &&
      formData.role !== "" &&
      formData.continent !== "" &&
      formData.country.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.languages.length > 0 &&
      formData.username.trim() !== "" &&
      formData.password.trim() !== ""
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🕌</span>
            </div>
            <div>
              <h1 className="text-xl">Registration Request</h1>
              <p className="text-xs opacity-90">
                Step 1 of 2: Caretaker Information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 pb-24"
      >
        {/* Photo Upload */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <label className="block mb-3">
            <div className="flex items-center gap-2 mb-2">
              <User className="text-emerald-600" size={20} />
              <span className="text-gray-700">
                Profile Photo
              </span>
            </div>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload className="text-gray-400" size={24} />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>
          </label>
        </div>

        {/* Full Name */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <label className="block">
            <div className="flex items-center gap-2 mb-2">
              <User className="text-emerald-600" size={20} />
              <span className="text-gray-700">Full Name *</span>
            </div>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </label>
        </div>

        {/* Age and Gender */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <label className="block">
              <span className="text-gray-700 block mb-2">
                Age *
              </span>
              <input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Age"
                min="18"
                max="100"
                required
              />
            </label>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <label className="block">
              <span className="text-gray-700 block mb-2">
                Gender *
              </span>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              >
                <option value="">Select</option>
                {GENDERS.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Role */}
        {/* <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <label className="block">
            <span className="text-gray-700 block mb-2">Role *</span>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            >
              <option value="">Select your role</option>
              {ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </label>
        </div> */}

        {/* Continent and Country */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="text-emerald-600" size={20} />
            <span className="text-gray-700">Location *</span>
          </div>
          <div className="space-y-3">
            {/* <select
              value={formData.continent}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  continent: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            >
              <option value="">Select Continent</option>
              {CONTINENTS.map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select> */}
            <input
              type="text"
              value={formData.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  country: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Country"
              required
            />
            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="City"
              required
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="text-emerald-600" size={20} />
            <span className="text-gray-700">
              Contact Information *
            </span>
          </div>
          <div className="space-y-3">
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Email address"
              required
            />
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Phone number (optional)"
            />
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="text-emerald-600" size={20} />
            <span className="text-gray-700">
              Languages (Select all that apply) *
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {LANGUAGES.map((language) => (
              <div
                key={language}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={language}
                  checked={formData.languages.includes(
                    language,
                  )}
                  onCheckedChange={() =>
                    handleLanguageToggle(language)
                  }
                />
                <Label
                  htmlFor={language}
                  className="cursor-pointer"
                >
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Quran Level */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="text-emerald-600" size={20} />
            <span className="text-gray-700">
              Quran Level (Juz Completed) *
            </span>
          </div>
          <select
            value={formData.quranLevel}
            onChange={(e) =>
              setFormData({
                ...formData,
                quranLevel: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i} value={i}>
                {i} Juz
              </option>
            ))}
          </select>
        </div>

        {/* Suitable Time */}
        {/* <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="text-emerald-600" size={20} />
            <span className="text-gray-700">
              Suitable Time for Guiding Child
            </span>
          </div>
          <input
            type="text"
            value={formData.suitableTime}
            onChange={(e) =>
              setFormData({
                ...formData,
                suitableTime: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g., Morning 10:00 AM - 12:00 PM"
          />
        </div> */}

        {/* Expectations */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <label className="block">
            <span className="text-gray-700 block mb-2">
              Your Expectations from Khendeq
            </span>
            <textarea
              value={formData.expectations}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expectations: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Share your expectations and goals..."
            />
          </label>
        </div>

        {/* Username and Password */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-6 shadow-md mb-4">
          <h3 className="mb-4 text-center">
            Login Credentials
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-white"
              placeholder="Preferred Username *"
              required
            />
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-white"
              placeholder="Password *"
              required
            />
            <p className="text-xs opacity-90">
              This username and password will be used to login
              after approval
            </p>
          </div>
        </div>
      </form>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`w-full py-4 rounded-xl shadow-lg transition-all transform ${
              isFormValid()
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:scale-[1.02]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span className="text-lg">Continue to Step 2</span>
          </button>
        </div>
      </div>
    </div>
  );
}