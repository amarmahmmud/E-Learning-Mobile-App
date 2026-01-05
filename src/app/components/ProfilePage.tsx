import { User, Mail, MapPin, Globe, BookOpen, Settings, HelpCircle, LogOut } from 'lucide-react';

export function ProfilePage() {
  const caretakerInfo = {
    name: 'Umu Muhammed',
    email: 'umumuhammed@email.com',
    role: 'Mother',
    location: 'Ethiopia, Africa',
    languages: ['Amharic', 'English', 'Arabic'],
    quranLevel: '15 Juz',
    joinDate: 'December 2024',
  };

  const children = [
    { id: 1, name: 'Fuad Muhada', age: 7, grade: 1 },
    { id: 2, name: 'A/aziz Hadi', age: 8, grade: 2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pb-24">
      <h1 className="text-2xl text-gray-800 mb-6">Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
            {caretakerInfo.name[0]}
          </div>
          <div>
            <h2 className="text-xl text-gray-800">{caretakerInfo.name}</h2>
            <p className="text-sm text-gray-600">{caretakerInfo.role}</p>
            <p className="text-xs text-gray-500 mt-1">Member since {caretakerInfo.joinDate}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs text-gray-600">Email</p>
              <p className="text-sm text-gray-800">{caretakerInfo.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs text-gray-600">Location</p>
              <p className="text-sm text-gray-800">{caretakerInfo.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Globe className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs text-gray-600">Languages</p>
              <p className="text-sm text-gray-800">{caretakerInfo.languages.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <BookOpen className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs text-gray-600">Quran Level</p>
              <p className="text-sm text-gray-800">{caretakerInfo.quranLevel} Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Children List */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg text-gray-800 mb-4">My Children</h3>
        <div className="space-y-3">
          {children.map((child) => (
            <div key={child.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white">
                  {child.name[0]}
                </div>
                <div>
                  <p className="text-sm text-gray-800">{child.name}</p>
                  <p className="text-xs text-gray-600">Age {child.age} • Grade {child.grade}</p>
                </div>
              </div>
              <button className="text-emerald-600 hover:text-emerald-700">
                <Settings size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Menu */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
          <Settings className="text-gray-600" size={20} />
          <span className="text-gray-800">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
          <HelpCircle className="text-gray-600" size={20} />
          <span className="text-gray-800">Help & Support</span>
        </button>
        <button className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors text-red-600">
          <LogOut className="text-red-600" size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Quote */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-6 text-center shadow-lg">
        <p className="italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          "The best of you are those who learn the Quran and teach it."
        </p>
        <p className="text-xs opacity-90">- Prophet Muhammad ﷺ</p>
      </div>
    </div>
  );
}
