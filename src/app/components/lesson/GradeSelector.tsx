import { ChevronLeft, Lock, CreditCard } from 'lucide-react';
import { Student } from '../LessonPage';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../ui/alert-dialog';

interface GradeSelectorProps {
  student: Student;
  onSelectGrade: (grade: number) => void;
  onBack: () => void;
}

export function GradeSelector({ student, onSelectGrade, onBack }: GradeSelectorProps) {
  const grades = Array.from({ length: 10 }, (_, i) => i + 1);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedLockedGrade, setSelectedLockedGrade] = useState<number | null>(null);

  const handleGradeClick = (grade: number) => {
    const isLocked = grade > student.grade;
    if (isLocked) {
      setSelectedLockedGrade(grade);
      setShowPaymentDialog(true);
    } else {
      onSelectGrade(grade);
    }
  };

  const handlePayment = () => {
    // Here you would implement actual payment processing
    alert('Payment processing feature will be implemented. Thank you!');
    setShowPaymentDialog(false);
    setSelectedLockedGrade(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-6">
        <button onClick={onBack} className="flex items-center gap-2 mb-3 hover:opacity-80">
          <ChevronLeft size={20} />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-2xl">{student.name}</h1>
        <p className="text-sm opacity-90 mt-1">Select Grade Level</p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {grades.map((grade) => {
            const isLocked = grade > student.grade;
            return (
              <button
                key={grade}
                onClick={() => handleGradeClick(grade)}
                className={`relative p-6 rounded-xl shadow-md transition-all ${
                  isLocked
                    ? 'bg-gray-200 text-gray-400 cursor-pointer hover:shadow-lg'
                    : 'bg-white text-gray-800 hover:shadow-lg hover:scale-105'
                }`}
              >
                {isLocked && (
                  <div className="absolute top-2 right-2">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                )}
                <div className="text-center">
                  <div className={`text-4xl mb-2 ${isLocked ? 'opacity-50' : ''}`}>
                    📚
                  </div>
                  <p className={`text-lg ${isLocked ? 'text-gray-400' : 'text-emerald-600'}`}>
                    Grade {grade}
                  </p>
                  {grade === student.grade && (
                    <p className="text-xs text-emerald-600 mt-2">Current Grade</p>
                  )}
                  {isLocked && (
                    <p className="text-xs text-amber-600 mt-2">💳 Unlock $100</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            ℹ️ Complete all lessons in Grade {student.grade} to unlock the next grade level, or pay $100 to unlock any grade.
          </p>
        </div>
      </div>

      {/* Payment Dialog */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CreditCard className="text-emerald-600" size={24} />
              Unlock Grade {selectedLockedGrade}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4 text-left">
                <p>To unlock Grade {selectedLockedGrade}, you need to purchase access.</p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Grade {selectedLockedGrade} Access</span>
                    <span className="text-emerald-700">$100.00</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    • Full access to all 3 semesters
                    <br />
                    • 39 weeks of lessons
                    <br />
                    • Videos, textbooks & games
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-800">Total:</span>
                  <span className="text-2xl text-emerald-600">$100.00</span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handlePayment}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Pay Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}