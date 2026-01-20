import { useState, useEffect } from 'react';
import { ChevronLeft, Play, CheckCircle, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '../ui/alert-dialog';

interface RegistrationStep2Props {
  onComplete: (data: { videoWatched: boolean }) => void;
  onBack: () => void;
}

export function RegistrationStep2({ onComplete, onBack }: RegistrationStep2Props) {
  const [showVideoDialog, setShowVideoDialog] = useState(true);
  const [videoWatched, setVideoWatched] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulate video watching (in real app, this would track actual video playback)
  useEffect(() => {
    if (isPlaying && videoProgress < 100) {
      const timer = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setVideoWatched(true);
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 200); // Simulates a 20-second video (200ms * 100)
      
      return () => clearInterval(timer);
    }
  }, [isPlaying, videoProgress]);

  const handleStartVideo = () => {
    setShowVideoDialog(false);
    setIsPlaying(true);
  };

  const handleSubmit = () => {
    if (videoWatched) {
      onComplete({ videoWatched: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity"
        >
          <ChevronLeft size={20} />
          <span className="text-sm">Back to Step 1</span>
        </button>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🕌</span>
            </div>
            <div>
              <h1 className="text-xl">Registration Request</h1>
              <p className="text-xs opacity-90">Step 2 of 2: Training Video</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6 pb-24">
        {/* Requirement Info */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6 border-l-4 border-amber-500">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-amber-800 mb-2">Training Required</h3>
              <p className="text-gray-700 text-sm">
                To complete your registration request, you must watch the introductory and 
                explanatory training video. This video will help you understand how to effectively 
                use Khendeq to guide your children's Islamic education.
              </p>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="relative bg-gradient-to-br from-emerald-800 to-teal-800 aspect-video flex items-center justify-center">
            {!isPlaying && videoProgress === 0 && (
              <button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <Play className="text-emerald-600 ml-1" size={32} />
              </button>
            )}
            {(isPlaying || videoProgress > 0) && (
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {videoWatched ? (
                    <CheckCircle className="text-white" size={32} />
                  ) : (
                    <Play className="text-white" size={32} />
                  )}
                </div>
                <p className="text-xl mb-2">
                  {videoWatched ? 'Video Completed!' : 'Training Video Playing...'}
                </p>
                <p className="text-sm opacity-90">{videoProgress}% Complete</p>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="bg-gray-200 h-2">
            <div 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 h-2 transition-all duration-300"
              style={{ width: `${videoProgress}%` }}
            />
          </div>

          <div className="p-4 bg-gray-50">
            <h3 className="text-gray-800 mb-1">Introduction to Khendeq</h3>
            <p className="text-sm text-gray-600">
              Learn how to guide your children through their Islamic education journey
            </p>
          </div>
        </div>

        {/* Video Topics */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h3 className="text-gray-800 mb-4">What You'll Learn:</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                videoProgress > 0 ? 'bg-emerald-100' : 'bg-gray-100'
              }`}>
                <span className="text-xs">{videoProgress > 0 ? '✓' : '1'}</span>
              </div>
              <div>
                <p className="text-gray-700">Platform Overview</p>
                <p className="text-xs text-gray-500">Understanding the Khendeq interface</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                videoProgress > 25 ? 'bg-emerald-100' : 'bg-gray-100'
              }`}>
                <span className="text-xs">{videoProgress > 25 ? '✓' : '2'}</span>
              </div>
              <div>
                <p className="text-gray-700">Daily Lesson Structure</p>
                <p className="text-xs text-gray-500">How to conduct daily Islamic lessons</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                videoProgress > 50 ? 'bg-emerald-100' : 'bg-gray-100'
              }`}>
                <span className="text-xs">{videoProgress > 50 ? '✓' : '3'}</span>
              </div>
              <div>
                <p className="text-gray-700">Progress Tracking</p>
                <p className="text-xs text-gray-500">Monitoring your child's achievements</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                videoProgress > 75 ? 'bg-emerald-100' : 'bg-gray-100'
              }`}>
                <span className="text-xs">{videoProgress > 75 ? '✓' : '4'}</span>
              </div>
              <div>
                <p className="text-gray-700">Best Practices</p>
                <p className="text-xs text-gray-500">Tips for effective home teaching</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Status */}
        {videoWatched && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-6 shadow-lg text-center">
            <CheckCircle className="mx-auto mb-3" size={48} />
            <h3 className="text-xl mb-2">Training Completed!</h3>
            <p className="text-sm opacity-90">
              You're now ready to submit your registration request
            </p>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!videoWatched}
            className={`w-full py-4 rounded-xl shadow-lg transition-all transform ${
              videoWatched
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="text-lg">
              {videoWatched ? 'Register' : 'Watch Video to Continue'}
            </span>
          </button>
        </div>
      </div>

      {/* Initial Dialog */}
      <AlertDialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Play className="text-emerald-600" size={20} />
              </div>
              Training Video Required
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4 text-left">
                <p>
                  Before finalizing your registration request, you must watch our introductory 
                  training video. This video covers:
                </p>
                <ul className="text-sm space-y-2 ml-4">
                  <li>• How to use the Khendeq platform effectively</li>
                  <li>• Daily lesson structure and scheduling</li>
                  <li>• Progress tracking and assessment</li>
                  <li>• Best practices for home-based Islamic education</li>
                </ul>
                <p className="text-sm text-gray-600">
                  Duration: Approximately 20 seconds (demo)
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <AlertDialogAction 
              onClick={handleStartVideo}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              Start Training Video
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
