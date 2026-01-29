import React, { useState, useEffect } from 'react';
import { Award, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '../../supabase';
import { useAuth } from '../contexts/AuthContext';

interface Activity {
  id: number;
  child: string;
  subject: string;
  lesson: string;
  time: string;
}

interface UpcomingActivity {
  id: number;
  child: string;
  subject: string;
  lesson: string;
  date: string;
}

interface Achievement {
  id: number;
  child: string;
  achievement: string;
  date: string;
}

export function HomePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [parentName, setParentName] = useState('');
  const [overallProgress, setOverallProgress] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [lessonsThisWeek, setLessonsThisWeek] = useState(0);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [upcomingActivities, setUpcomingActivities] = useState<UpcomingActivity[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetchHomePageData();
  }, [user]);

  const fetchHomePageData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch parent profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.warn('Profile not found, using default name');
      } else if (profile) {
        setParentName(profile.name || '');
      }

      // Fetch children (students)
      const { data: students, error: studentsError } = await supabase
        .from('students')
        .select('id, name')
        .eq('profile_id', user.id);

      if (studentsError) {
        console.warn('Error fetching students:', studentsError);
      }

      const studentIds = students?.map(s => s.id) || [];
      setActiveStudents(students?.length || 0);

      // Fetch completed lessons for all students (recent activities)
      const { data: completedProgress, error: progressError } = await supabase
        .from('progress')
        .select(`
          id,
          completed_at,
          score,
          lesson:lessons(
            id,
            subject:subjects(name),
            day,
            week:weeks(number),
            semester:semesters(number)
          ),
          student:students(name)
        `)
        .eq('completed', true)
        .in('student_id', studentIds)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (progressError) {
        console.warn('Error fetching progress:', progressError);
      }

      // Transform progress data into activities
      const activities: Activity[] = (completedProgress || []).map((p: any) => ({
        id: p.id,
        child: p.student?.name || 'Student',
        subject: p.lesson?.subject?.name || 'Subject',
        lesson: `${p.lesson?.day || 'Lesson'} (Week ${p.lesson?.week || 1})`,
        time: formatTimeAgo(p.completed_at)
      }));
      setRecentActivities(activities);

      // Fetch upcoming lessons (not completed yet) for all students
      const { data: allLessons, error: lessonsError } = await supabase
        .from('lessons')
        .select(`
          id,
          day,
          subject:subjects(name),
          week:weeks(number),
          semester:semesters(number)
        `)
        .order('created_at', { ascending: true })
        .limit(10);

      if (lessonsError) {
        console.warn('Error fetching lessons:', lessonsError);
      }

      // Get completed lesson IDs to filter out
      const completedLessonIds = new Set(
        (completedProgress || []).map((p: any) => p.lesson?.id)
      );

      // Filter and transform upcoming lessons
      const upcoming: UpcomingActivity[] = (allLessons || [])
        .filter((l: any) => !completedLessonIds.has(l.id))
        .slice(0, 3)
        .map((l: any, index: number) => ({
          id: index,
          child: students?.[0]?.name || 'Student',
          subject: l.subject?.name || 'Subject',
          lesson: `${l.day || 'Lesson'} - Week ${l.week || 1}`,
          date: l.day ? `This ${l.day}` : 'Upcoming'
        }));
      setUpcomingActivities(upcoming);

      // Fetch achievements for all students
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('achievements')
        .select(`
          id,
          name,
          description,
          earned_at,
          student:students(name)
        `)
        .in('student_id', studentIds)
        .order('earned_at', { ascending: false })
        .limit(5);

      if (achievementsError) {
        console.warn('Error fetching achievements:', achievementsError);
      }

      const achievements: Achievement[] = (achievementsData || []).map((a: any) => ({
        id: a.id,
        child: a.student?.name || 'Student',
        achievement: a.name || a.description || 'Achievement',
        date: formatTimeAgo(a.earned_at)
      }));
      setRecentAchievements(achievements);

      // Calculate overall progress
      if (students?.length && allLessons?.length) {
        const totalLessons = allLessons.length * students.length;
        const completedLessons = completedProgress?.length || 0;
        const progress = Math.round((completedLessons / totalLessons) * 100);
        setOverallProgress(Math.min(progress, 100));
      }

      // Set lessons this week (lessons in weeks 1-4)
      const { count: lessonsCount } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .in('week_id', [1, 2, 3, 4]);
      setLessonsThisWeek(lessonsCount || 0);

    } catch (error) {
      console.error('Error fetching home page data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-6 pb-8">
        <h1 className="text-2xl mb-2">Assalamu'alaikum</h1>
        <p className="opacity-90">{parentName || 'Parent'}</p>
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
              <p className="text-2xl text-emerald-600">{activeStudents}</p>
              <p className="text-xs text-gray-600">Active Students</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-2xl text-blue-600">{lessonsThisWeek}</p>
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
          {recentActivities.length > 0 ? (
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
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>

        {/* Upcoming Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg mb-4 text-gray-800">Upcoming Activities</h2>
          {upcomingActivities.length > 0 ? (
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
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No upcoming activities</p>
          )}
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-500" size={20} />
            <h2 className="text-lg text-gray-800">Recent Achievements</h2>
          </div>
          {recentAchievements.length > 0 ? (
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
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No recent achievements</p>
          )}
        </div>
      </div>
    </div>
  );
}
