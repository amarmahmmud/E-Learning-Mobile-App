import { useState } from 'react';
import { ChevronLeft, Lock } from 'lucide-react';
import { Student } from '../LessonPage';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '../ui/alert-dialog';

interface WeekSelectorProps {
  student: Student;
  grade: number;
  semester: number;
  onSelectWeek: (week: number) => void;
  onBack: () => void;
}

export function WeekSelector({ student, grade, semester, onSelectWeek, onBack }: WeekSelectorProps) {
  const weeks = Array.from({ length: 13 }, (_, i) => i + 1);
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [lockedWeekNumber, setLockedWeekNumber] = useState(0);

  const getWeekType = (week: number) => {
    if (week <= 11) return 'regular';
    if (week === 12) return 'revision';
    return 'test';
  };

  const getWeekIcon = (week: number) => {
    const type = getWeekType(week);
    if (type === 'regular') return '📚';
    if (type === 'revision') return '📝';
    return '✍️';
  };

  const getWeekLabel = (week: number) => {
    const type = getWeekType(week);
    if (type === 'regular') return `Week ${week}`;
    if (type === 'revision') return 'Revision Week';
    return 'Test Week';
  };

  // Only week 1 is unlocked
  const isUnlocked = (week: number) => {
    return week === 1;
  };

  const handleWeekClick = (week: number) => {
    if (isUnlocked(week)) {
      onSelectWeek(week);
    } else {
      setLockedWeekNumber(week);
      setShowLockDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 shadow-lg">
        <button onClick={onBack} className="flex items-center gap-2 mb-3 hover:opacity-80">
          <ChevronLeft size={20} />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-2xl">{student.name}</h1>
        <p className="text-sm opacity-90 mt-1">Grade {grade} - Semester {semester}</p>
      </div>

      <div className="p-4 pb-6">
        <h2 className="text-lg text-gray-800 mb-4">Select Week</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {weeks.map((week) => {
            const type = getWeekType(week);
            const unlocked = isUnlocked(week);
            return (
              <button
                key={week}
                onClick={() => handleWeekClick(week)}
                className={`p-4 rounded-xl shadow-md transition-all relative ${
                  unlocked 
                    ? `hover:shadow-lg ${
                        type === 'regular'
                          ? 'bg-white hover:bg-emerald-50'
                          : type === 'revision'
                          ? 'bg-blue-50 hover:bg-blue-100'
                          : 'bg-orange-50 hover:bg-orange-100'
                      }`
                    : 'bg-gray-100 opacity-60 cursor-pointer hover:shadow-md'
                }`}
              >
                {!unlocked && (
                  <div className="absolute top-2 right-2 bg-gray-600 text-white rounded-full p-1.5">
                    <Lock size={16} />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl mb-2">{unlocked ? getWeekIcon(week) : '🔒'}</div>
                  <p className="text-sm text-gray-800">{getWeekLabel(week)}</p>
                  {type === 'regular' && unlocked && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full"
                        style={{ width: `${week === 1 ? 15 : 0}%` }}
                      ></div>
                    </div>
                  )}
                  {!unlocked && (
                    <p className="text-xs text-amber-600 mt-2">Locked</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
          <h3 className="text-sm text-gray-700 mb-3">Week Types:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded flex items-center justify-center">📚</div>
              <span className="text-gray-700">Regular Learning Week</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 border-2 border-blue-200 rounded flex items-center justify-center">📝</div>
              <span className="text-gray-700">Revision & Preparation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-50 border-2 border-orange-200 rounded flex items-center justify-center">✍️</div>
              <span className="text-gray-700">Test Week</span>
            </div>
          </div>
        </div>
        
        {/* Lock Notice */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 shadow-md">
          <div className="flex items-start gap-3">
            <Lock className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-amber-800 mb-1">Progress Sequentially</h3>
              <p className="text-sm text-amber-700">
                Complete all lessons in the current week to unlock the next one. 
                This ensures thorough understanding and mastery of each topic.
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
              Week {lockedWeekNumber} Locked
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4 text-left">
                <p className="text-gray-700">
                  This week's lessons are currently locked. To access Week {lockedWeekNumber}, 
                  you must first complete all previous weeks.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm text-emerald-800 mb-2">
                    To unlock Week {lockedWeekNumber}:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Complete all 6 days of Week {lockedWeekNumber - 1}</li>
                    <li>• Finish all Quran and subject lessons</li>
                    <li>• Watch all videos and complete games</li>
                    <li>• Achieve minimum passing scores</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  Sequential learning ensures your child builds a strong foundation in Islamic 
                  knowledge before advancing to new topics.
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
