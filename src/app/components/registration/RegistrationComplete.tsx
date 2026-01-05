import { CheckCircle, Mail, MessageSquare, ChevronLeft } from 'lucide-react';

interface RegistrationCompleteProps {
  onFinish: () => void;
}

export function RegistrationComplete({ onFinish }: RegistrationCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🕌</span>
            </div>
            <div>
              <h1 className="text-xl">KHENDEQ</h1>
              <p className="text-xs opacity-90">Registration Request Submitted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        {/* Success Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle className="text-white" size={64} strokeWidth={2.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-2xl">🎉</span>
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center mb-8">
          <h2 className="text-3xl text-emerald-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Congratulations!
          </h2>
          <p className="text-xl text-gray-700 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Thank you for sending your registration request
          </p>
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 leading-relaxed">
              Your request is now under review by the Khendeq admin team. We carefully review 
              each application to ensure the best learning experience for all our students.
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="w-full max-w-md space-y-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-emerald-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="text-emerald-600" size={24} />
              </div>
              <div>
                <h3 className="text-emerald-800 mb-1">Email Notification</h3>
                <p className="text-sm text-gray-600">
                  We will send your login credentials to your registered email address
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-teal-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="text-teal-600" size={24} />
              </div>
              <div>
                <h3 className="text-teal-800 mb-1">SMS Notification</h3>
                <p className="text-sm text-gray-600">
                  You may also receive a text message confirmation (if phone number provided)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-6 shadow-lg w-full max-w-md mb-8">
          <h3 className="text-center mb-4 text-lg">What Happens Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-sm opacity-90">Admin team reviews your application</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-sm opacity-90">Account approval (within 3 days)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-sm opacity-90">Login credentials sent via email or SMS</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <p className="text-sm opacity-90">Begin your child's Islamic learning journey!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stay Tuned Message */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 w-full max-w-md text-center">
          <p className="text-amber-800">
            <span className="text-2xl mr-2">⏰</span>
            <strong>Stay tuned!</strong>
          </p>
          <p className="text-sm text-amber-700 mt-2">
            We will contact you in the upcoming 3 days
          </p>
        </div>

        {/* Quote */}
        <div className="mt-8 max-w-md">
          <p className="text-center text-gray-600 italic text-sm" style={{ fontFamily: 'Georgia, serif' }}>
            "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect."
          </p>
          <p className="text-center text-xs text-gray-500 mt-2">- Quran 65:2-3</p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onFinish}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-[1.02]"
          >
            <span className="text-lg">Finish</span>
          </button>
        </div>
      </div>
    </div>
  );
}
