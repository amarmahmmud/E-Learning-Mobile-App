import { useState, useEffect } from 'react';
import { TrendingUp, Award, Star, Calendar } from 'lucide-react';
import { supabase } from '../../supabase';
import { useAuth } from '../contexts/AuthContext';

interface StudentProgress {
  id: number;
  name: string;
  grade_id: number;
  grade_name: string;
  progress: number;
  weekly_goal: number;
  achievements: number;
  rank: string;
}

export function ProgressPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentProgress[]>([]);

  useEffect(() => {
    if (user) {
      fetchStudentsProgress();
    }
  }, [user]);

  const fetchStudentsProgress = async () => {
    try {
      setLoading(true);

      // Fetch students with their grades
      const { data: studentsData } = await supabase
        .from('students')
        .select(`
          *,
          grade:grades(*)
        `)
        .eq('profile_id', user?.id);

      if (studentsData) {
        // Calculate progress for each student
        const studentsWithProgress = await Promise.all(
          studentsData.map(async (student) => {
            // Get total lessons for the student's grade
            const { count: totalLessons } = await supabase
              .from('lessons')
              .select('*', { count: 'exact', head: true })
              .eq('grade_id', student.grade_id);

            // Get completed lessons
            const { count: completedLessons } = await supabase
              .from('progress')
              .select('*', { count: 'exact', head: true })
              .eq('student_id', student.id)
              .eq('completed', true);

            // Calculate progress percentage
            const progress = totalLessons && completedLessons
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0;

            // Get weekly goal (this week completed / target)
            const { count: weeklyCompleted } = await supabase
              .from('progress')
              .select('*', { count: 'exact', head: true })
              .eq('student_id', student.id)
              .eq('completed', true);
            
            const weeklyGoal = weeklyCompleted ? Math.min(weeklyCompleted * 10, 100) : 0;

            // Get achievements count
            const { count: achievements } = await supabase
              .from('progress')
              .select('*', { count: 'exact', head: true })
              .eq('student_id', student.id)
              .eq('completed', true);

            // Calculate rank based on progress
            let rank = 'F';
            if (progress >= 90) rank = 'A+';
            else if (progress >= 80) rank = 'A';
            else if (progress >= 70) rank = 'B+';
            else if (progress >= 60) rank = 'B';
            else if (progress >= 50) rank = 'C+';
            else if (progress >= 40) rank = 'C';
            else if (progress >= 30) rank = 'D';

            return {
              id: student.id,
              name: student.name,
              grade_id: student.grade_id,
              grade_name: student.grade?.name || `Grade ${student.grade_id}`,
              progress,
              weekly_goal: weeklyGoal,
              achievements: achievements || 0,
              rank,
            };
          })
        );
        setStudents(studentsWithProgress);
      }

    } catch (error) {
      console.error('Error fetching student progress:', error);
    } finally {
      setLoading(false);
    }
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
              <p className="text-sm text-gray-600">{student.grade_name}</p>
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
              <p className="text-lg text-emerald-700">{student.weekly_goal}%</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 text-center">
              <Award className="text-amber-600 mx-auto mb-1" size={20} />
              <p className="text-xs text-gray-600">Achievements</p>
              <p className="text-lg text-amber-700">{student.achievements}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <Star className="text-blue-600 mx-auto mb-1" size={20} />
              <p className="text-xs text-gray-600">Rank</p>
              <p className="text-lg text-blue-700">{student.rank}</p>
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
