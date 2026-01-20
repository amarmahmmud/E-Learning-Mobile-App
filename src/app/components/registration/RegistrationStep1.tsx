import React, { useState, useEffect } from "react";
import {
  Upload,
  User,
  Mail,
  MapPin,
  Globe,
  BookOpen,
  Phone,
  Lock,
  Calendar,
  Home,
  ChevronDown,
  Check
} from "lucide-react";
import { RegistrationData } from "../RegistrationFlow";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Country, State } from "country-state-city";
import { parsePhoneNumberFromString } from "libphonenumber-js";

interface RegistrationStep1Props {
  initialData: RegistrationData;
  onComplete: (data: Partial<RegistrationData>) => void;
}

const LANGUAGES = ["AMHARIC", "ENGLISH", "ARABIC", "OROMO"];
const GENDERS = ["Female", "Male"];
const RELATIONSHIPS = [
  "Mother",
  "Father",
  "Grandmother",
  "Grandfather",
  "Aunt",
  "Uncle",
  "Sister",
  "Brother",
  "Guardian",
  "Teacher",
  "Other"
];

export function RegistrationStep1({
  initialData,
  onComplete,
}: RegistrationStep1Props) {
  const [formData, setFormData] = useState({
    photo: initialData.photo,
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    birthYear: initialData.birthYear,
    gender: initialData.gender,
    relationship: initialData.relationship,
    country: initialData.country,
    state: initialData.state,
    city: initialData.city,
    address: initialData.address,
    email: initialData.email,
    phoneNumber: initialData.phoneNumber,
    languages: initialData.languages,
    quranLevel: initialData.quranLevel,
    expectations: initialData.expectations,
    username: initialData.username,
    password: initialData.password,
    confirmPassword: initialData.confirmPassword,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Location Data
  const countries = Country.getAllCountries();
  const [states, setStates] = useState<any[]>([]);

  // Searchable dropdown states
  const [countrySearch, setCountrySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  useEffect(() => {
    if (formData.country) {
      setStates(State.getStatesOfCountry(formData.country));
      setCountrySearch(Country.getCountryByCode(formData.country)?.name || '');
      // Reset state when country changes
      setFormData(prev => ({ ...prev, state: '' }));
      setStateSearch('');
    }
  }, [formData.country]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.searchable-dropdown')) {
        setShowCountryDropdown(false);
        setShowStateDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
      case "relationship":
      case "address":
      case "city":
      case "state":
      case "country":
      case "username":
        if (!value.trim()) error = "This field is required";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = "Invalid email address";
        break;
      case "phoneNumber":
        if (!value) {
          error = "Phone number is required";
        } else if (formData.country) {
          // Try to validate with selected country
          const phoneNumber = parsePhoneNumberFromString(value, formData.country as any);
          if (!phoneNumber || !phoneNumber.isValid()) {
            error = "Invalid phone number for selected country";
          }
        }
        break;
      case "password":
        if (value.length < 8) error = "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Passwords do not match";
        break;
      case "birthYear":
        if (!value) error = "Birth date is required";
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleCountrySelect = (country: any) => {
    setFormData(prev => ({ ...prev, country: country.isoCode, state: "", city: "" }));
    setCountrySearch(country.name);
    setShowCountryDropdown(false);
    setStateSearch('');
    validateField("country", country.isoCode);
  };

  const handleStateSelect = (state: any) => {
    setFormData(prev => ({ ...prev, state: state.isoCode }));
    setStateSearch(state.name);
    setShowStateDropdown(false);
    validateField("state", state.isoCode);
  };

  const isFormValid = () => {
    const requiredFields = [
      "firstName", "lastName", "birthYear", "gender", "country",
      "state", "city", "address", "email", "phoneNumber",
      "username", "password", "confirmPassword"
    ];

    const hasEmptyFields = requiredFields.some(field => !formData[field as keyof typeof formData]);
    const hasErrors = Object.values(errors).some(error => error !== "");
    const hasLanguages = formData.languages.length > 0;

    console.log('Form validation:', { hasEmptyFields, hasErrors, hasLanguages, errors, formData });

    return !hasEmptyFields && !hasErrors && hasLanguages;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onComplete(formData);
    }
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
              <span className="text-gray-700">Profile Photo</span>
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

        {/* Personal Information */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="text-emerald-600" size={20} />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="text-gray-700 block mb-2">First Name *</span>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                placeholder="First Name"
                required
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </label>

            <label className="block">
              <span className="text-gray-700 block mb-2">Last Name *</span>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                placeholder="Last Name"
                required
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700 block mb-2">Date of Birth *</span>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={formData.birthYear}
                  onChange={(e) => handleChange("birthYear", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.birthYear ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  required
                />
              </div>
              {errors.birthYear && <p className="text-red-500 text-xs mt-1">{errors.birthYear}</p>}
            </label>

            <label className="block">
              <span className="text-gray-700 block mb-2">Gender *</span>
              <select
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              >
                <option value="">Select Gender</option>
                {GENDERS.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-emerald-600" size={20} />
            Address Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="text-gray-700 block mb-2">Country *</span>
              <div className="relative searchable-dropdown">
                <div className="relative">
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => {
                      setCountrySearch(e.target.value);
                      setShowCountryDropdown(true);
                    }}
                    onFocus={() => setShowCountryDropdown(true)}
                    className={`w-full px-4 py-3 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    placeholder="Search countries..."
                    required
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {showCountryDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {countries
                      .filter(country => country.name.toLowerCase().includes(countrySearch.toLowerCase()))
                      .slice(0, 10)
                      .map((country) => (
                        <div
                          key={country.isoCode}
                          onClick={() => handleCountrySelect(country)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                        >
                          <span>{country.name}</span>
                          {formData.country === country.isoCode && <Check size={16} className="text-emerald-600" />}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </label>

            <label className="block">
              <span className="text-gray-700 block mb-2">State/Province *</span>
              <div className="relative searchable-dropdown">
                <div className="relative">
                  <input
                    type="text"
                    value={stateSearch}
                    onChange={(e) => {
                      setStateSearch(e.target.value);
                      setShowStateDropdown(true);
                    }}
                    onFocus={() => formData.country && setShowStateDropdown(true)}
                    disabled={!formData.country}
                    className={`w-full px-4 py-3 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100`}
                    placeholder={formData.country ? "Search states..." : "Select country first"}
                    required
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {showStateDropdown && formData.country && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {states
                      .filter(state => state.name.toLowerCase().includes(stateSearch.toLowerCase()))
                      .slice(0, 10)
                      .map((state) => (
                        <div
                          key={state.isoCode}
                          onClick={() => handleStateSelect(state)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                        >
                          <span>{state.name}</span>
                          {formData.state === state.isoCode && <Check size={16} className="text-emerald-600" />}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </label>
          </div>

          <label className="block mb-4">
            <span className="text-gray-700 block mb-2">City / Sub-city *</span>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              placeholder="Enter city name"
              required
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </label>

          <label className="block">
            <span className="text-gray-700 block mb-2">Home Address *</span>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                placeholder="Home Address"
                required
              />
            </div>
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </label>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Mail className="text-emerald-600" size={20} />
            Contact Information
          </h3>

          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 block mb-2">Email Address *</span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="email@example.com"
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </label>

            <label className="block">
              <span className="text-gray-700 block mb-2">Phone Number *</span>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Enter without counntry code"
                  required
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </label>
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
                  checked={formData.languages.includes(language)}
                  onCheckedChange={() => handleLanguageToggle(language)}
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
            onChange={(e) => handleChange("quranLevel", e.target.value)}
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

        {/* Expectations */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <label className="block">
            <span className="text-gray-700 block mb-2">
              Your Expectations from Khendeq
            </span>
            <textarea
              value={formData.expectations}
              onChange={(e) => handleChange("expectations", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Share your expectations and goals..."
            />
          </label>
        </div>

        {/* Login Credentials */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Lock className="text-emerald-600" size={20} />
            Account Security
          </h3>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 block mb-2">Username *</span>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Choose a username"
                  required
                />
              </div>
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </label>

            <label className="block">
              <span className="text-gray-700 block mb-2">Password *</span>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Min. 8 characters"
                  required
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </label>

            <label className="block">
              <span className="text-gray-700 block mb-2">Confirm Password *</span>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Re-enter password"
                  required
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </label>
          </div>
        </div>
      </form>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-20">
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
            <span className="text-lg">
              Continue to Step 2 {isFormValid() ? '' : '(Form incomplete)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
