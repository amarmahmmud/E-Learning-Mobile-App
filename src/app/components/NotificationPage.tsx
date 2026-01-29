import { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react';
import { supabase } from '../../supabase';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: number;
  type: 'success' | 'info' | 'reminder' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
  created_at: string;
}

export function NotificationPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('profile_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching notifications:', error);
        // Use sample data if table doesn't exist
        setNotifications(getSampleNotifications());
      } else if (data) {
        // Transform data to include formatted time
        const transformedNotifications = data.map(notification => ({
          ...notification,
          time: formatTimeAgo(new Date(notification.created_at)),
        }));
        setNotifications(transformedNotifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications(getSampleNotifications());
    } finally {
      setLoading(false);
    }
  };

  const getSampleNotifications = (): Notification[] => [
    {
      id: 1,
      type: 'success',
      title: 'Lesson Completed',
      message: 'Fuad Muhada completed Monday Quran lesson',
      time: '2 hours ago',
      read: false,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      type: 'info',
      title: 'New Week Unlocked',
      message: 'Week 2 is now available for A/aziz Hadi',
      time: '5 hours ago',
      read: false,
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Daily Reminder',
      message: "It's time for today's Quran lesson",
      time: '1 day ago',
      read: true,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      type: 'success',
      title: 'Achievement Unlocked',
      message: 'A/aziz Hadi earned the "Week Champion" badge',
      time: '2 days ago',
      read: true,
      created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = async (id: number) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('profile_id', user?.id)
        .eq('read', false);

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await supabase.from('notifications').delete().eq('id', id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-emerald-600" size={24} />;
      case 'info':
        return <Info className="text-blue-600" size={24} />;
      case 'reminder':
        return <Bell className="text-amber-600" size={24} />;
      case 'warning':
        return <AlertCircle className="text-orange-600" size={24} />;
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
      case 'warning':
        return 'bg-orange-50 border-l-4 border-orange-500';
      default:
        return 'bg-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pb-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-gray-800">Notifications</h1>
        {notifications.some(n => !n.read) && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Mark all as read
          </button>
        )}
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
              <div
                className="flex-1 cursor-pointer"
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <h3 className={`mb-1 ${!notification.read ? 'font-semibold' : ''}`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              <button
                onClick={() => deleteNotification(notification.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
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
