import { useState, useEffect } from 'react';
import { User, Mail, MapPin, Globe, BookOpen, Settings, HelpCircle, LogOut } from 'lucide-react';
import { supabase } from '../../supabase';
import { useAuth } from '../contexts/AuthContext';

interface CaretakerProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  languages: string[];
  quran_level: string;
  photo_url: string | null;
  created_at: string;
}

interface Child {
  id: number;
  name: string;
  age: number;
  grade_id: number;
  grade_name: string;
}

interface ProfilePageProps {
  onLogout: () => void;
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<CaretakerProfile | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfileAndChildren();
    }
  }, [user]);

  const fetchProfileAndChildren = async () => {
    try {
      setLoading(true);
      setImageError(false);

      // Get user metadata as fallback
      const userMetadata = user?.user_metadata || {};

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else if (profileData) {
        console.log('Profile data fetched:', profileData);
        setProfile({
          id: profileData.id,
          name: profileData.name || userMetadata.full_name || user?.email?.split('@')[0] || 'User',
          email: profileData.email || user?.email || '',
          role: profileData.role || 'Caretaker',
          location: profileData.location || 'Not set',
          languages: profileData.languages || [],
          quran_level: profileData.quran_level || 'Not specified',
          photo_url: profileData.photo_url || userMetadata.avatar_url || null,
          created_at: profileData.created_at,
        });
        console.log('Photo URL set to:', profileData.photo_url);
      } else {
        // Use auth metadata and defaults if profile doesn't exist
        setProfile({
          id: user?.id || '',
          name: userMetadata.full_name || user?.email?.split('@')[0] || 'User',
          email: user?.email || '',
          role: 'Caretaker',
          location: 'Not set',
          languages: [],
          quran_level: 'Not specified',
          photo_url: userMetadata.avatar_url || null,
          created_at: user?.created_at || new Date().toISOString(),
        });
      }

      // Fetch children
      const { data: childrenData } = await supabase
        .from('students')
        .select(`
          *,
          grade:grades(name)
        `)
        .eq('profile_id', user?.id);

      if (childrenData) {
        const transformedChildren = childrenData.map(child => ({
          id: child.id,
          name: child.name,
          age: child.age || 0,
          grade_id: child.grade_id,
          grade_name: child.grade?.name || `Grade ${child.grade_id}`,
        }));
        setChildren(transformedChildren);
      }

    } catch (error) {
      console.error('Error fetching profile data:', error);
      setProfile({
        id: user?.id || '',
        name: 'User',
        email: user?.email || '',
        role: 'Caretaker',
        location: 'Not set',
        languages: [],
        quran_level: 'Not specified',
        photo_url: null,
        created_at: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleLogout = async () => {
    await onLogout();
  };

  const handleImageError = () => {
    console.log('Image failed to load');
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pb-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pb-24">
      <h1 className="text-2xl text-gray-800 mb-6">Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg overflow-hidden">
            {!imageError && profile?.photo_url && profile.photo_url.length > 0 ? (
              <img
                src={profile.photo_url}
                alt={profile.name}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                onError={handleImageError}
              />
            ) : (
              profile?.name[0] || 'U'
            )}
          </div>
          <div>
            <h2 className="text-xl text-gray-800">{profile?.name || 'User'}</h2>
            <p className="text-sm text-gray-600">{profile?.role || 'Caretaker'}</p>
            <p className="text-xs text-gray-500 mt-1">
              Member since {profile?.created_at ? formatJoinDate(profile.created_at) : 'N/A'}
            </p>
          </div>
        </div>

        {/* Debug info - remove in production
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 p-2 rounded text-xs mb-4">
            <p>Photo URL: {profile?.photo_url || 'null'}</p>
            <p>Image Error: {imageError ? 'true' : 'false'}</p>
          </div>
        )} */}

        {/* Info Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs text-gray-600">Email</p>
              <p className="text-sm text-gray-800">{profile?.email || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs text-gray-600">Location</p>
              <p className="text-sm text-gray-800">{profile?.location || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Globe className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs text-gray-600">Languages</p>
              <p className="text-sm text-gray-800">
                {profile?.languages && profile.languages.length > 0
                  ? profile.languages.join(', ')
                  : 'Not set'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <BookOpen className="text-emerald-600" size={20} />
            <div>
              <p className="text-xs text-gray-600">Quran Level</p>
              <p className="text-sm text-gray-800">
                {profile?.quran_level || 'Not specified'} Completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Children List */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg text-gray-800 mb-4">My Children</h3>
        {children.length > 0 ? (
          <div className="space-y-3">
            {children.map((child) => (
              <div key={child.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white">
                    {child.name[0]}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">{child.name}</p>
                    <p className="text-xs text-gray-600">Age {child.age} • {child.grade_name}</p>
                  </div>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700">
                  <Settings size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No children added yet.</p>
        )}
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
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors text-red-600"
        >
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
