import { TrendingUp, Award, Star, Calendar } from 'lucide-react';

export function ProgressPage() {
  const students = [
    { id: 1, name: 'Fuad Muhada', grade: 1, progress: 15, weeklyGoal: 80, achievements: 5 },
    { id: 2, name: 'A/aziz Hadi', grade: 2, progress: 70, weeklyGoal: 100, achievements: 12 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pb-24">
      <h1 className="text-2xl text-gray-800 mb-6">Progress Tracking</h1>

      {/* Students Progress */}
      {students.map((student) => (
        <div key={student.id} className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl">
              {student.name[0]}
            </div>
            <div>
              <h2 className="text-lg text-gray-800">{student.name}</h2>
              <p className="text-sm text-gray-600">Grade {student.grade}</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700">Overall Progress</span>
              <span className="text-sm text-emerald-600">{student.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all"
                style={{ width: `${student.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <Calendar className="text-emerald-600 mx-auto mb-1" size={20} />
              <p className="text-xs text-gray-600">This Week</p>
              <p className="text-lg text-emerald-700">{student.weeklyGoal}%</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 text-center">
              <Award className="text-amber-600 mx-auto mb-1" size={20} />
              <p className="text-xs text-gray-600">Achievements</p>
              <p className="text-lg text-amber-700">{student.achievements}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <Star className="text-blue-600 mx-auto mb-1" size={20} />
              <p className="text-xs text-gray-600">Rank</p>
              <p className="text-lg text-blue-700">A+</p>
            </div>
          </div>
        </div>
      ))}

      {/* Weekly Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-emerald-600" size={20} />
          <h3 className="text-lg text-gray-800">Weekly Activity</h3>
        </div>
        <div className="h-48 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Activity chart coming soon</p>
        </div>
      </div>
    </div>
  );
}
