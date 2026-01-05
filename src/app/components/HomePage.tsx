import { Award, Clock, CheckCircle } from 'lucide-react';

export function HomePage() {
  const overallProgress = 42; // percentage

  const recentActivities = [
    { id: 1, child: 'Fuad Muhada', subject: 'Quran', lesson: 'Surah Al-Fatiha', time: '2 hours ago' },
    { id: 2, child: 'A/aziz Hadi', subject: 'Hadith', lesson: 'Importance of Prayer', time: '5 hours ago' },
    { id: 3, child: 'Fuad Muhada', subject: 'Fiqh', lesson: 'Wudu Steps', time: '1 day ago' },
  ];

  const upcomingActivities = [
    { id: 1, child: 'Fuad Muhada', subject: 'Arabic', lesson: 'Arabic Alphabets - Part 3', date: 'Tomorrow, 10:30 AM' },
    { id: 2, child: 'A/aziz Hadi', subject: 'Quran', lesson: 'Surah Al-Ikhlas', date: 'Tomorrow, 10:30 AM' },
  ];

  const recentAchievements = [
    { id: 1, child: 'A/aziz Hadi', achievement: 'Completed Week 9 of Semester 2', date: 'Yesterday' },
    { id: 2, child: 'Fuad Muhada', achievement: 'Perfect Score in Akhlaq Quiz', date: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-6 pb-8">
        <h1 className="text-2xl mb-2">Assalamu'alaikum</h1>
        <p className="opacity-90">Umu Muhammed</p>
      </div>

      <div className="px-4 -mt-4 pb-6 space-y-4">
        {/* Overall Progress Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg mb-4 text-gray-800">Overall Progress</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-emerald-500 h-3 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{overallProgress}% Complete</p>
            </div>
            <div className="text-3xl text-emerald-600">{overallProgress}%</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="bg-emerald-50 rounded-lg p-3">
              <p className="text-2xl text-emerald-600">2</p>
              <p className="text-xs text-gray-600">Active Students</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-2xl text-blue-600">15</p>
              <p className="text-xs text-gray-600">Lessons This Week</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-emerald-600" size={20} />
            <h2 className="text-lg text-gray-800">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm">{activity.child}</p>
                  <p className="text-xs text-gray-600">
                    {activity.subject}: {activity.lesson}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg mb-4 text-gray-800">Upcoming Activities</h2>
          <div className="space-y-3">
            {upcomingActivities.map((activity) => (
              <div key={activity.id} className="border-l-4 border-emerald-500 pl-4 py-2">
                <p className="text-sm">{activity.child}</p>
                <p className="text-xs text-gray-800">
                  {activity.subject}: {activity.lesson}
                </p>
                <p className="text-xs text-emerald-600 mt-1">{activity.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-500" size={20} />
            <h2 className="text-lg text-gray-800">Recent Achievements</h2>
          </div>
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <Award className="text-yellow-500 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm">{achievement.child}</p>
                  <p className="text-xs text-gray-700">{achievement.achievement}</p>
                  <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
