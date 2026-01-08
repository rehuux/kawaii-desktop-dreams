import { useState } from 'react';

const VideoBackground = () => {
  const [videoError, setVideoError] = useState(false);

  // Placeholder gradient background if video fails or isn't provided
  if (videoError) {
    return (
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `
            linear-gradient(135deg, 
              hsl(330 70% 85%) 0%, 
              hsl(280 60% 80%) 25%, 
              hsl(330 70% 75%) 50%, 
              hsl(260 50% 85%) 75%, 
              hsl(330 60% 90%) 100%
            )
          `,
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite',
        }}
      >
        {/* Cute floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-30"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(${330 + Math.random() * 60} 70% 80%)`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <video
      className="fixed inset-0 w-full h-full object-cover -z-10"
      autoPlay
      loop
      muted
      playsInline
      onError={() => setVideoError(true)}
    >
      <source src="/background-video.mp4" type="video/mp4" />
      {/* Fallback triggers error handler */}
    </video>
  );
};

export default VideoBackground;