import { Plus, RefreshCw } from 'lucide-react';
import { Student } from '../LessonPage';

interface ChildSelectorProps {
  students: Student[];
  onSelectChild: (student: Student) => void;
}

export function ChildSelector({ students, onSelectChild }: ChildSelectorProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-6">
        <h1 className="text-2xl">Select Student</h1>
        <p className="text-sm opacity-90 mt-1">Choose a child to view their lessons</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
            <RefreshCw size={18} />
            <span className="text-sm">Refresh</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-700">
            <Plus size={20} />
            <span>Add New Student</span>
          </button>
        </div>

        {/* Student Cards */}
        <div className="space-y-3">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => onSelectChild(student)}
              className="w-full bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex items-center gap-4">
                {/* Photo */}
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                  {student.photo}
                </div>

                {/* Info */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg text-gray-800">{student.name}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-600">
                    <span>Age: {student.age}</span>
                    <span>Grade {student.grade}</span>
                  </div>
                  
                  {/* Progress */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Grade {student.grade} Progress</span>
                      <span className="text-xs text-emerald-600">{student.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
