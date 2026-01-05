import { Bell, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react';

export function NotificationPage() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Lesson Completed',
      message: 'Fuad Muhada completed Monday Quran lesson',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'New Week Unlocked',
      message: 'Week 2 is now available for A/aziz Hadi',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Daily Reminder',
      message: "It's time for today's Quran lesson",
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'success',
      title: 'Achievement Unlocked',
      message: 'A/aziz Hadi earned the "Week Champion" badge',
      time: '2 days ago',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-emerald-600" size={24} />;
      case 'info':
        return <Info className="text-blue-600" size={24} />;
      case 'reminder':
        return <Bell className="text-amber-600" size={24} />;
      default:
        return <AlertCircle className="text-gray-600" size={24} />;
    }
  };

  const getBgColor = (type: string, read: boolean) => {
    if (read) return 'bg-gray-50';
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-l-4 border-emerald-500';
      case 'info':
        return 'bg-blue-50 border-l-4 border-blue-500';
      case 'reminder':
        return 'bg-amber-50 border-l-4 border-amber-500';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-gray-800">Notifications</h1>
        <button className="text-sm text-emerald-600 hover:text-emerald-700">
          Mark all as read
        </button>
      </div>

      {/* Unread Count */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-4 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Unread Notifications</p>
            <p className="text-3xl">
              {notifications.filter(n => !n.read).length}
            </p>
          </div>
          <Bell size={48} className="opacity-50" />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-xl p-4 shadow-md transition-all ${getBgColor(
              notification.type,
              notification.read
            )}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h3 className={`mb-1 ${!notification.read ? 'font-semibold' : ''}`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no notifications) */}
      {notifications.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-md">
          <Bell className="text-gray-300 mx-auto mb-4" size={64} />
          <h3 className="text-gray-600 mb-2">No notifications</h3>
          <p className="text-sm text-gray-500">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
