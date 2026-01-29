import { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Student } from '../LessonPage';
import { supabase } from '../../../supabase';
import { useAuth } from '../../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ChildSelectorProps {
  students: Student[];
  onSelectChild: (student: Student) => void;
  onRefresh: () => void;
  onStudentAdded: () => void;
}

export function ChildSelector({ students, onSelectChild, onRefresh, onStudentAdded }: ChildSelectorProps) {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [error, setError] = useState('');

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !studentName.trim()) {
      setError('Please enter a student name');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('students')
        .insert({
          profile_id: user.id,
          name: studentName.trim(),
          age: studentAge ? parseInt(studentAge) : null,
          photo: '👦',
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Close dialog and refresh
      setIsDialogOpen(false);
      setStudentName('');
      setStudentAge('');
      onStudentAdded();
      
    } catch (err: any) {
      console.error('Error adding student:', err);
      setError(err.message || 'Failed to add student');
    } finally {
      setIsLoading(false);
    }
  };

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
          <button 
            onClick={onRefresh}
            className="flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw size={18} />
            <span className="text-sm">Refresh</span>
          </button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-700">
                <Plus size={20} />
                <span>Add New Student</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleAddStudent} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name *
                  </label>
                  <Input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student's name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age (optional)
                  </label>
                  <Input
                    type="number"
                    value={studentAge}
                    onChange={(e) => setStudentAge(e.target.value)}
                    placeholder="Enter student's age"
                    min="1"
                    max="18"
                  />
                </div>
                
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !studentName.trim()}
                  >
                    {isLoading ? 'Adding...' : 'Add Student'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Student Cards */}
        {students.length > 0 ? (
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
                      <span>{student.grade_name}</span>
                    </div>
                    
                    {/* Progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">{student.grade_name} Progress</span>
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
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No students found</p>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              Add Your First Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
