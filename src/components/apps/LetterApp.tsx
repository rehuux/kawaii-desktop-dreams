const LetterApp = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-pixel text-xl text-primary mb-4">A Letter For You</h2>
      
      <div className="flex-1 paper-note rounded-lg p-6 overflow-auto kawaii-scrollbar shadow-inner">
        <div className="max-w-md mx-auto space-y-4 text-foreground leading-relaxed">
          <p className="text-lg">Dear iram,</p>
          
          <p>
            I don’t know if you’ll ever read this,
            but I wanted these words to exist somewhere — honestly, quietly.
          </p>
          
          <p>
            You were never just a chapter of my life.
            You were a whole feeling, a season that changed me 
            in ways I still can’t fully explain.
          </p>
          
          <p>
            I know our paths are different now.
            I know your heart belongs to another journey, 
            and I respect that more than you’ll ever know.
            Loving someone also means knowing when to step back 
            and let them be happy — even if that happiness isn’t with you.
          </p>
          
          <p>
            I won’t pretend that I stopped caring. Some feelings don’t leave,
            they only learn how to stay silent And mine will always wish you peace,
            love, and a life that feels gentle to you.
          </p>
          
          <p>
            Wherever life takes you, I hope it treats you kindly.
            And if you ever think of me, I hope it’s with a small 
            smile not sadness.
          </p>
          
          <p className="text-right mt-8">
            Always wishing you the best,
            — Rehan,<br />
            <span className="font-pixel text-primary">~ Rehan 🎀</span>
          </p>
        </div>
      </div>
      
      <p className="text-center text-muted-foreground text-xs mt-4">
        Written with love, just for you iram
      </p>
    </div>
  );
};

export default LetterApp;
