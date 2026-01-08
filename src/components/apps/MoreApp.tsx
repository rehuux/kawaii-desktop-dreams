import { Twitter, Instagram, Github, Youtube, Globe, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, label: 'Twitter', url: '#', color: 'bg-[#1DA1F2]' },
  { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/rehusticx?', color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]' },
  { icon: Github, label: 'GitHub', url: 'https://github.com/rehuux/', color: 'bg-[#333]' },
  { icon: Youtube, label: 'YouTube', url: 'https://youtube.com/@rehuu7?', color: 'bg-[#FF0000]' },
  { icon: Globe, label: 'Website', url: 'https://syed.infy.uk/', color: 'bg-gradient-to-br from-kawaii-pink to-kawaii-purple' },
];

const MoreApp = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-pixel text-xl text-primary mb-4">➕ More About Me</h2>
      
      {/* Social links */}
      <div className="mb-6">
        <h3 className="font-pixel text-sm text-muted-foreground mb-3">Find me online ✨</h3>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                kawaii-btn flex items-center gap-2
                px-4 py-2 rounded-full
                text-white text-sm font-medium
                ${link.color}
              `}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* About section */}
      <div className="glass-strong rounded-2xl p-4 mb-4">
        <h3 className="font-pixel text-lg text-primary mb-2">About This Project</h3>
        <p className="text-sm text-foreground leading-relaxed">
          This Kawaii OS is a personal website designed to look like a cute 
          mini operating system. It features glassmorphism effects, pastel 
          colors, and lots of interactive elements! 🌸
        </p>
      </div>

      {/* Stats or fun facts */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass text-center p-3 rounded-xl">
          <span className="text-2xl block mb-1">☕</span>
          <span className="text-xs text-muted-foreground">Cups of coffee</span>
          <span className="font-pixel text-primary block">∞</span>
        </div>
        <div className="glass text-center p-3 rounded-xl">
          <span className="text-2xl block mb-1">💻</span>
          <span className="text-xs text-muted-foreground">Lines of code</span>
          <span className="font-pixel text-primary block">1000+</span>
        </div>
        <div className="glass text-center p-3 rounded-xl">
          <span className="text-2xl block mb-1">🎨</span>
          <span className="text-xs text-muted-foreground">Favorite color</span>
          <span className="font-pixel text-primary block">Pink!</span>
        </div>
        <div className="glass text-center p-3 rounded-xl">
          <span className="text-2xl block mb-1">🐱</span>
          <span className="text-xs text-muted-foreground">Cat lover</span>
          <span className="font-pixel text-primary block">Yes!</span>
        </div>
      </div>

      {/* Credits */}
      <div className="mt-auto text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-primary fill-primary" /> and lots of sparkles
        </p>
        <p className="text-xs mt-1">© 2024 Kawaii OS</p>
      </div>
    </div>
  );
};

export default MoreApp;
