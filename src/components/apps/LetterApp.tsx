const LetterApp = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-pixel text-xl text-primary mb-4">💌 A Letter For You</h2>
      
      <div className="flex-1 paper-note rounded-lg p-6 overflow-auto kawaii-scrollbar shadow-inner">
        <div className="max-w-md mx-auto space-y-4 text-foreground leading-relaxed">
          <p className="text-lg">Dear iram,</p>
          
          <p>
            Welcome to my little corner of the internet! ✨
          </p>
          
          <p>
            I created this space to share a piece of my world with you. 
            Whether you stumbled upon this page by accident or came here 
            intentionally, I'm so happy you're here! 💖
          </p>
          
          <p>
            This kawaii OS is a reflection of my love for cute aesthetics, 
            pastel colors, and nostalgic computer vibes. I hope it brings 
            a smile to your face and maybe even a bit of joy to your day! 🌸
          </p>
          
          <p>
            Feel free to explore all the little apps I've created. Each one 
            holds something special - from my favorite photos to fun games 
            and music that makes me happy.
          </p>
          
          <p>
            Thank you for taking the time to visit. You're amazing! ⭐
          </p>
          
          <p className="text-right mt-8">
            With love and sparkles,<br />
            <span className="font-pixel text-primary">~ Rehan 🎀</span>
          </p>
        </div>
      </div>
      
      <p className="text-center text-muted-foreground text-xs mt-4">
        Written with 💝 just for you
      </p>
    </div>
  );
};

export default LetterApp;
