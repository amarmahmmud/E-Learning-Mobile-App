import { useState } from 'react';
import { ChevronLeft, Clock, Lock } from 'lucide-react';
import { Student } from '../LessonPage';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '../ui/alert-dialog';

interface WeekScheduleProps {
  student: Student;
  grade: number;
  semester: number;
  week: number;
  onSelectSubject: (day: string, subject: string) => void;
  onBack: () => void;
}

const grade1Subjects = ['Hadis', 'Fiqh', 'Sira', 'Arabic', 'Zikr', 'Akhlaq'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function WeekSchedule({ student, grade, semester, week, onSelectSubject, onBack }: WeekScheduleProps) {
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [lockedDayName, setLockedDayName] = useState('');

  const getDaySubject = (dayIndex: number) => {
    return grade1Subjects[dayIndex];
  };

  // Only Monday of Week 1 is unlocked
  const isDayUnlocked = (dayIndex: number) => {
    return week === 1 && dayIndex === 0; // Only Monday (index 0) of Week 1
  };

  const handleDayClick = (day: string, subject: string, dayIndex: number) => {
    if (isDayUnlocked(dayIndex)) {
      onSelectSubject(day, subject);
    } else {
      setLockedDayName(day);
      setShowLockDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 shadow-lg">
        <button onClick={onBack} className="flex items-center gap-2 mb-3 hover:opacity-80">
          <ChevronLeft size={20} />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-xl">{student.name} - Week {week}</h1>
        <p className="text-sm opacity-90 mt-1">Grade {grade} - Semester {semester}</p>
      </div>

      <div className="p-4 space-y-4">
        <h2 className="text-lg text-gray-800">Weekly Class Schedule</h2>
        
        {/* Time Info */}
        <div className="bg-white border-l-4 border-emerald-500 rounded-lg p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-emerald-600" />
            <span className="text-sm text-emerald-800">Daily Class Times:</span>
          </div>
          <div className="text-sm text-gray-700 space-y-1 ml-6">
            <p>• First Period: 10:30 - 11:20 (Quran)</p>
            <p>• Second Period: 11:30 - 12:20 (Daily Subject)</p>
          </div>
        </div>

        {/* Days Schedule */}
        <div className="space-y-3">
          {days.map((day, index) => {
            const subject = getDaySubject(index);
            const isUnlocked = isDayUnlocked(index);
            
            return (
              <div 
                key={day} 
                className={`bg-white rounded-xl shadow-md overflow-hidden ${
                  !isUnlocked ? 'opacity-70' : ''
                }`}
              >
                <div className={`px-4 py-3 flex items-center justify-between ${
                  isUnlocked 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                    : 'bg-gray-400'
                } text-white`}>
                  <h3 className="text-lg">{day}</h3>
                  {!isUnlocked && (
                    <Lock size={18} />
                  )}
                  {isUnlocked && (
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Active</span>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  {/* First Period - Quran */}
                  <button
                    onClick={() => handleDayClick(day, 'Quran', index)}
                    disabled={!isUnlocked}
                    className={`w-full rounded-lg p-3 transition-all relative ${
                      isUnlocked
                        ? 'bg-emerald-50 hover:bg-emerald-100 hover:shadow-md'
                        : 'bg-gray-100 cursor-not-allowed'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute top-2 right-2">
                        <Lock size={16} className="text-gray-400" />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm text-gray-600">10:30 - 11:20</p>
                        <p className="text-base text-gray-800">📖 Quran</p>
                      </div>
                      {isUnlocked && <div className="text-emerald-600 text-xl">→</div>}
                    </div>
                  </button>

                  {/* Second Period - Subject */}
                  <button
                    onClick={() => handleDayClick(day, subject, index)}
                    disabled={!isUnlocked}
                    className={`w-full rounded-lg p-3 transition-all relative ${
                      isUnlocked
                        ? 'bg-blue-50 hover:bg-blue-100 hover:shadow-md'
                        : 'bg-gray-100 cursor-not-allowed'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute top-2 right-2">
                        <Lock size={16} className="text-gray-400" />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm text-gray-600">11:30 - 12:20</p>
                        <p className="text-base text-gray-800">📚 {subject}</p>
                      </div>
                      {isUnlocked && <div className="text-blue-600 text-xl">→</div>}
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Notice */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 shadow-md">
          <div className="flex items-start gap-3">
            <Lock className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-amber-800 mb-1">Sequential Learning</h3>
              <p className="text-sm text-amber-700">
                Complete today's lesson to unlock tomorrow's classes. Only one day is available at a time 
                to ensure consistent learning progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lock Dialog */}
      <AlertDialog open={showLockDialog} onOpenChange={setShowLockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Lock className="text-amber-600" size={24} />
              </div>
              Lesson Locked
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4 text-left">
                <p className="text-gray-700">
                  {lockedDayName}'s lesson is currently locked.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm text-emerald-800 mb-2">
                    To unlock this lesson:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Complete the previous day's lessons</li>
                    <li>• Finish both Quran and subject periods</li>
                    <li>• Watch all videos and complete activities</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  This ensures your child masters each lesson before moving forward, 
                  building a strong foundation in Islamic knowledge.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end mt-4">
            <AlertDialogAction 
              onClick={() => setShowLockDialog(false)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              Understood
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
