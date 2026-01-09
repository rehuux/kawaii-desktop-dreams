import { useState, useEffect } from 'react';
import { X, Bell, Heart, Sparkles, Music, Gift } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  icon: string;
  timestamp: Date;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Add a welcome notification on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        title: 'Welcome! 💖',
        message: 'Kawaii OS is ready for you!',
        icon: '🌸',
      });
    }, 2000);

    // Add another notification after a delay
    const timer2 = setTimeout(() => {
      addNotification({
        title: 'Tip ✨',
        message: 'Right-click on desktop for options!',
        icon: '💡',
      });
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const addNotification = (data: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev].slice(0, 5));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-4 right-4 z-50
          p-3 rounded-full glass
          transition-all duration-200
          hover:scale-110
          ${notifications.length > 0 ? 'animate-wiggle' : ''}
        `}
      >
        <Bell className="w-5 h-5 text-primary" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-16 right-4 z-50 w-80 animate-slide-in-right">
            <div className="glass rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="font-pixel text-sm text-primary">Notifications</h3>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto kawaii-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <span className="text-4xl">🌸</span>
                    <p className="text-sm text-muted-foreground mt-2">
                      No notifications yet!
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-border/30 hover:bg-primary/10 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{notification.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-foreground">
                            {notification.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground/70 mt-1 block">
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-destructive/20 transition-all"
                        >
                          <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast Notification (for new notifications) */}
      {notifications.length > 0 && !isOpen && (
        <div className="fixed top-20 right-4 z-40 animate-slide-in-right">
          <div
            className="glass rounded-xl p-3 max-w-xs cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{notifications[0].icon}</span>
              <div>
                <p className="text-sm font-medium text-foreground">{notifications[0].title}</p>
                <p className="text-xs text-muted-foreground truncate">{notifications[0].message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationCenter;
