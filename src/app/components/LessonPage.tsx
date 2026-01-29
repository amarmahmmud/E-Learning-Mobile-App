import { useState, useEffect } from 'react';
import { Plus, RefreshCw, ChevronRight, Lock } from 'lucide-react';
import { supabase } from '../../supabase';
import { useAuth } from '../contexts/AuthContext';
import { ChildSelector } from './lesson/ChildSelector';
import { GradeSelector } from './lesson/GradeSelector';
import { SemesterSelector } from './lesson/SemesterSelector';
import { WeekSelector } from './lesson/WeekSelector';
import { WeekSchedule } from './lesson/WeekSchedule';
import { DailyLesson } from './lesson/DailyLesson';

export interface Student {
  id: number;
  name: string;
  age: number;
  grade_id: number;
  grade_name: string;
  progress: number;
  photo: string;
}

export type LessonView = 'child-selector' | 'grade-selector' | 'semester-selector' | 'week-selector' | 'schedule' | 'daily-lesson';

export function LessonPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  
  const [currentView, setCurrentView] = useState<LessonView>('child-selector');
  const [selectedChild, setSelectedChild] = useState<Student | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchStudents();
    }
  }, [user]);

  const fetchStudents = async () => {
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
            const { count: totalLessons } = await supabase
              .from('lessons')
              .select('*', { count: 'exact', head: true })
              .eq('grade_id', student.grade_id);

            const { count: completedLessons } = await supabase
              .from('progress')
              .select('*', { count: 'exact', head: true })
              .eq('student_id', student.id)
              .eq('completed', true);

            const progress = totalLessons && completedLessons
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0;

            return {
              id: student.id,
              name: student.name,
              age: student.age || 0,
              grade_id: student.grade_id,
              grade_name: student.grade?.name || `Grade ${student.grade_id}`,
              progress,
              photo: student.photo || '👦'
            };
          })
        );
        setStudents(studentsWithProgress);
      }

    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChildSelect = (child: Student) => {
    setSelectedChild(child);
    setCurrentView('grade-selector');
  };

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
    setCurrentView('semester-selector');
  };

  const handleSemesterSelect = (semester: number) => {
    setSelectedSemester(semester);
    setCurrentView('week-selector');
  };

  const handleWeekSelect = (week: number) => {
    setSelectedWeek(week);
    setCurrentView('schedule');
  };

  const handleSubjectSelect = (day: string, subject: string) => {
    setSelectedDay(day);
    setSelectedSubject(subject);
    setCurrentView('daily-lesson');
  };

  const handleBack = () => {
    if (currentView === 'grade-selector') {
      setCurrentView('child-selector');
      setSelectedChild(null);
    } else if (currentView === 'semester-selector') {
      setCurrentView('grade-selector');
      setSelectedGrade(null);
    } else if (currentView === 'week-selector') {
      setCurrentView('semester-selector');
      setSelectedSemester(null);
    } else if (currentView === 'schedule') {
      setCurrentView('week-selector');
      setSelectedWeek(null);
    } else if (currentView === 'daily-lesson') {
      setCurrentView('schedule');
      setSelectedDay(null);
      setSelectedSubject(null);
    }
  };

  const handleRefresh = () => {
    fetchStudents();
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
      {currentView === 'child-selector' && (
        <ChildSelector
          students={students}
          onSelectChild={handleChildSelect}
          onRefresh={handleRefresh}
          onStudentAdded={handleRefresh}
        />
      )}
      {currentView === 'grade-selector' && selectedChild && (
        <GradeSelector
          student={selectedChild}
          onSelectGrade={handleGradeSelect}
          onBack={handleBack}
        />
      )}
      {currentView === 'semester-selector' && selectedChild && selectedGrade && (
        <SemesterSelector
          student={selectedChild}
          grade={selectedGrade}
          onSelectSemester={handleSemesterSelect}
          onBack={handleBack}
        />
      )}
      {currentView === 'week-selector' && selectedChild && selectedGrade && selectedSemester && (
        <WeekSelector
          student={selectedChild}
          grade={selectedGrade}
          semester={selectedSemester}
          onSelectWeek={handleWeekSelect}
          onBack={handleBack}
        />
      )}
      {currentView === 'schedule' && selectedChild && selectedGrade && selectedSemester && selectedWeek && (
        <WeekSchedule
          student={selectedChild}
          grade={selectedGrade}
          semester={selectedSemester}
          week={selectedWeek}
          onSelectSubject={handleSubjectSelect}
          onBack={handleBack}
        />
      )}
      {currentView === 'daily-lesson' && selectedChild && selectedDay && selectedSubject && (
        <DailyLesson
          student={selectedChild}
          day={selectedDay}
          subject={selectedSubject}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
