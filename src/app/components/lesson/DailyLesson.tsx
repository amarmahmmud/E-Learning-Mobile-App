import { useState } from 'react';
import { ChevronLeft, Play, BookOpen, Gamepad2 } from 'lucide-react';
import { Student } from '../LessonPage';

interface DailyLessonProps {
  student: Student;
  day: string;
  subject: string;
  onBack: () => void;
}

type Tab = 'video' | 'textbook' | 'game';

export function DailyLesson({ student, day, subject, onBack }: DailyLessonProps) {
  const [activeTab, setActiveTab] = useState<Tab>('video');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-6">
        <button onClick={onBack} className="flex items-center gap-2 mb-3 hover:opacity-80">
          <ChevronLeft size={20} />
          <span className="text-sm">Back to Schedule</span>
        </button>
        <h1 className="text-xl">{subject}</h1>
        <p className="text-sm opacity-90 mt-1">{day} - {student.name}</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 transition-colors ${
              activeTab === 'video'
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Play size={20} />
            <span>Video</span>
          </button>
          <button
            onClick={() => setActiveTab('textbook')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 transition-colors ${
              activeTab === 'textbook'
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookOpen size={20} />
            <span>Textbook</span>
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 transition-colors ${
              activeTab === 'game'
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Gamepad2 size={20} />
            <span>Game</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'video' && (
          <div className="space-y-4">
            <div className="bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Play size={64} className="mx-auto mb-4 opacity-50" />
                <p className="opacity-75">Video: {subject} Lesson</p>
                <p className="text-sm opacity-50 mt-2">Click to play</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg text-gray-800 mb-2">Lesson Overview</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This lesson covers the fundamentals of {subject}. Watch the video to learn key concepts 
                and important teachings that will help build a strong Islamic foundation.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700">
                  Play Video
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'textbook' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl text-gray-800">Textbook: {subject}</h3>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg text-gray-800 mb-3">Today's Reading</h4>
                <div className="space-y-4 text-gray-700">
                  <p>
                    In this lesson, we will learn about the important aspects of {subject} 
                    in Islamic teachings. This knowledge is essential for every Muslim to understand 
                    and practice in their daily life.
                  </p>
                  
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded">
                    <h5 className="text-base text-emerald-800 mb-2">Key Points:</h5>
                    <ul className="space-y-2 text-sm text-emerald-700">
                      <li>• Understanding the fundamentals</li>
                      <li>• Practical applications in daily life</li>
                      <li>• Memorizing important duas and verses</li>
                      <li>• Building strong Islamic character</li>
                    </ul>
                  </div>

                  <p>
                    Remember to practice what you learn with sincerity and dedication. 
                    May Allah accept our efforts and guide us to the straight path.
                  </p>
                </div>
              </div>

              <button className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700">
                Mark as Read
              </button>
            </div>
          </div>
        )}

        {activeTab === 'game' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-8 text-white text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl mb-2">Interactive Game</h3>
              <p className="opacity-90 mb-6">
                Test your knowledge of {subject} with this fun interactive game!
              </p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors">
                Start Game
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg text-gray-800 mb-3">Game Features:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Multiple choice questions about {subject}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Interactive challenges to reinforce learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Earn points and badges for correct answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Fun way to review today's lesson</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                💡 Tip: Complete the video and textbook before playing the game for the best learning experience!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
