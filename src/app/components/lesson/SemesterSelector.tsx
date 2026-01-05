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
  // For now, only semester 1 is unlocked. You can extend this logic based on actual progress
  const isUnlocked = (semester: number) => {
    // Only the first semester is unlocked initially
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
    // Here you would implement actual payment processing
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
        <h1 className="text-2xl">{student.name} - Grade {grade}</h1>
        <p className="text-sm opacity-90 mt-1">Select Semester</p>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {semesters.map((semester) => {
            const unlocked = isUnlocked(semester);
            return (
              <button
                key={semester}
                onClick={() => handleSemesterClick(semester)}
                className={`w-full bg-white rounded-xl shadow-md p-6 transition-all relative ${
                  unlocked 
                    ? 'hover:shadow-lg hover:scale-102' 
                    : 'opacity-60 cursor-pointer hover:shadow-lg'
                }`}
              >
                {!unlocked && (
                  <div className="absolute top-4 right-4 bg-gray-600 text-white rounded-full p-2">
                    <Lock size={20} />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
                    unlocked ? 'bg-emerald-100' : 'bg-gray-200'
                  }`}>
                    📖
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl text-gray-800">Semester {semester}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {unlocked ? '13 weeks of lessons' : 'Complete previous semester to unlock'}
                    </p>
                    {!unlocked && (
                      <p className="text-sm text-amber-600 mt-1">💳 Unlock for $100</p>
                    )}
                    {unlocked && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${semester === 1 ? 60 : semester === 2 ? 30 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">
                          {semester === 1 ? '60%' : semester === 2 ? '30%' : '0%'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h4 className="text-sm text-emerald-800 mb-2">Semester Structure:</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• 11 weeks of regular lessons</li>
            <li>• 1 week for revision and test preparation</li>
            <li>• 1 week for tests</li>
          </ul>
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
                    <span className="text-emerald-700">$100.00</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    • Full access to 13 weeks
                    <br />
                    • Daily lessons with video & textbooks
                    <br />
                    • Interactive games & activities
                    <br />
                    • Revision & test weeks included
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