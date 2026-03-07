import { useState, useEffect } from 'react';
import { Sun, Moon, Cloud, Heart } from 'lucide-react';

const greetings = [
  { time: 'morning', text: 'Good Morning! ☀️', icon: Sun },
  { time: 'afternoon', text: 'Good Afternoon! 🌤️', icon: Cloud },
  { time: 'evening', text: 'Good Evening! 🌙', icon: Moon },
  { time: 'night', text: 'Sweet Dreams! ✨', icon: Moon },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return greetings[0];
  if (hour >= 12 && hour < 17) return greetings[1];
  if (hour >= 17 && hour < 21) return greetings[2];
  return greetings[3];
};

const DesktopWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setGreeting(getGreeting());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const IconComponent = greeting.icon;

  return (
    <div className="fixed top-14 right-4 z-30 hidden md:block animate-fade-in">
      <div className="glass rounded-2xl p-4 w-64">
        {/* Greeting */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-full bg-primary/20">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          <span className="font-pixel text-sm text-primary">{greeting.text}</span>
        </div>

        {/* Time */}
        <div className="text-3xl font-pixel text-foreground mb-1 tracking-wide">
          {formatTime(currentTime)}
        </div>

        {/* Date */}
        <div className="text-sm text-muted-foreground mb-3">
          {formatDate(currentTime)}
        </div>

        {/* Cute divider */}
        <div className="flex items-center justify-center gap-1 py-2 border-t border-border/50">
          <Heart className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-xs text-muted-foreground font-pixel">Kawaii OS</span>
          <Heart className="w-3 h-3 text-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default DesktopWidget;
