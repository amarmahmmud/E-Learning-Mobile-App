import { useState } from 'react';
import { ChevronLeft, Lock, CreditCard } from 'lucide-react';
import { Student } from '../LessonPage';
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

interface SemesterSelectorProps {
  student: Student;
  grade: number;
  onSelectSemester: (semester: number) => void;
  onBack: () => void;
}

export function SemesterSelector({ student, grade, onSelectSemester, onBack }: SemesterSelectorProps) {
  const semesters = [1, 2, 3];
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedLockedSemester, setSelectedLockedSemester] = useState<number | null>(null);
  
  // Determine which semester is unlocked based on completion
  const isUnlocked = (semester: number) => {
    return semester === 1;
  };

  const handleSemesterClick = (semester: number) => {
    const unlocked = isUnlocked(semester);
    if (!unlocked) {
      setSelectedLockedSemester(semester);
      setShowPaymentDialog(true);
    } else {
      onSelectSemester(semester);
    }
  };

  const handlePayment = () => {
    alert('Payment processing feature will be implemented. Thank you!');
    setShowPaymentDialog(false);
    setSelectedLockedSemester(null);
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
        <p className="text-sm opacity-90 mt-1">Grade {grade} - Select Semester</p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {semesters.map((semester) => {
            const unlocked = isUnlocked(semester);
            return (
              <button
                key={semester}
                onClick={() => handleSemesterClick(semester)}
                className={`relative p-6 rounded-xl shadow-md transition-all ${
                  unlocked
                    ? 'bg-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {!unlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className={`text-4xl ${!unlocked ? 'opacity-50' : ''}`}>📅</div>
                  <div>
                    <p className={`text-lg ${unlocked ? 'text-emerald-600' : 'text-gray-400'}`}>
                      Semester {semester}
                    </p>
                    <p className="text-sm text-gray-500">
                      {semester === 1 ? 'Fall Semester' : semester === 2 ? 'Spring Semester' : 'Summer Semester'}
                    </p>
                    {!unlocked && (
                      <p className="text-xs text-amber-600 mt-2">💳 Unlock $50</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            ℹ️ Complete all lessons in a semester to unlock the next one, or pay $50 to unlock any semester.
          </p>
        </div>
      </div>

      {/* Payment Dialog */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CreditCard className="text-emerald-600" size={24} />
              Unlock Semester {selectedLockedSemester}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4 text-left">
                <p>To unlock Semester {selectedLockedSemester}, you need to purchase access.</p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Semester {selectedLockedSemester} Access</span>
                    <span className="text-emerald-700">$50.00</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    • Full access to 13 weeks
                    <br />
                    • All subjects included
                    <br />
                    • Videos, textbooks & games
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-800">Total:</span>
                  <span className="text-2xl text-emerald-600">$50.00</span>
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
