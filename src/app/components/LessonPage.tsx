import { useState } from 'react';
import { Plus, RefreshCw, ChevronRight, Lock } from 'lucide-react';
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
  grade: number;
  progress: number;
  photo: string;
}

export const mockStudents: Student[] = [
  { id: 1, name: 'Fuad Muhada', age: 7, grade: 1, progress: 15, photo: '👦' },
  { id: 2, name: 'A/aziz Hadi', age: 8, grade: 2, progress: 70, photo: '👦' },
];

export type LessonView = 'child-selector' | 'grade-selector' | 'semester-selector' | 'week-selector' | 'schedule' | 'daily-lesson';

export function LessonPage() {
  const [currentView, setCurrentView] = useState<LessonView>('child-selector');
  const [selectedChild, setSelectedChild] = useState<Student | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'child-selector' && (
        <ChildSelector
          students={mockStudents}
          onSelectChild={handleChildSelect}
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
