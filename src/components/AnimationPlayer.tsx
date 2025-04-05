
import React, { useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import LoadingScreen from '@/components/LoadingScreen';

declare global {
  interface Window {
    createjs: any;
  }
}

const AnimationPlayer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  useEffect(() => {
    // Load EaselJS library from CDN
    const script = document.createElement('script');
    script.src = 'https://code.createjs.com/1.0.0/easeljs.min.js';
    script.async = true;
    
    script.onload = () => {
      setScriptLoaded(true);
      toast({
        title: "Animation Ready",
        description: "CreateJS loaded successfully",
      });
    };
    
    script.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load CreateJS library",
        variant: "destructive",
      });
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !canvasRef.current) return;
    
    const stage = new window.createjs.Stage(canvasRef.current);
    let tickCount = 0;
    
    // Set canvas dimensions
    canvasRef.current.width = 800;
    canvasRef.current.height = 600;
    
    // Start the animation sequence
    initAnimation(stage);
    
    // Create ticker for animation
    window.createjs.Ticker.timingMode = window.createjs.Ticker.RAF;
    window.createjs.Ticker.addEventListener("tick", () => {
      tickCount++;
      stage.update();
    });
    
    setIsLoading(false);
    
    return () => {
      window.createjs.Ticker.removeAllEventListeners();
      stage.removeAllChildren();
      stage.clear();
    };
  }, [scriptLoaded]);

  // Initialize our animation sequence
  const initAnimation = (stage: any) => {
    // Background
    const background = new window.createjs.Shape();
    background.graphics.beginFill("#111").drawRect(0, 0, 800, 600);
    stage.addChild(background);
    
    // Create title text
    const title = new window.createjs.Text("RISE OF THE SHADOW", "bold 32px Arial", "#ff3333");
    title.x = 400;
    title.y = 50;
    title.textAlign = "center";
    stage.addChild(title);
    
    // Add a simple stick figure to start
    const stickFigure = createStickFigure(400, 300, "#3333ff");
    stage.addChild(stickFigure);
    
    // Add villain stick figure
    const villain = createStickFigure(600, 300, "#ff3333");
    stage.addChild(villain);
    
    // Add animation logic for the stick figures
    animateIntro(stickFigure, villain, stage);
  };

  // Create a basic stick figure
  const createStickFigure = (x: number, y: number, color: string) => {
    const figure = new window.createjs.Container();
    figure.x = x;
    figure.y = y;
    
    // Head
    const head = new window.createjs.Shape();
    head.graphics.beginFill(color).drawCircle(0, -50, 15);
    
    // Body
    const body = new window.createjs.Shape();
    body.graphics.beginStroke(color).setStrokeStyle(3)
      .moveTo(0, -35)
      .lineTo(0, 10);
    
    // Arms
    const arms = new window.createjs.Shape();
    arms.graphics.beginStroke(color).setStrokeStyle(3)
      .moveTo(-30, -15)
      .lineTo(30, -15);
    
    // Legs
    const legs = new window.createjs.Shape();
    legs.graphics.beginStroke(color).setStrokeStyle(3)
      .moveTo(0, 10)
      .lineTo(-20, 50)
      .moveTo(0, 10)
      .lineTo(20, 50);
    
    figure.addChild(head, body, arms, legs);
    return figure;
  };

  // Animate the introduction sequence
  const animateIntro = (hero: any, villain: any, stage: any) => {
    // Example animation: Hero moves forward
    window.createjs.Tween.get(hero)
      .to({ x: 300 }, 1000, window.createjs.Ease.backOut);
    
    // Villain moves closer
    window.createjs.Tween.get(villain)
      .wait(500)
      .to({ x: 500 }, 800, window.createjs.Ease.backOut);
    
    // Add text effect
    const introText = new window.createjs.Text("When light falls... the shadow awakens.", "20px Arial", "#ffffff");
    introText.x = 400;
    introText.y = 150;
    introText.alpha = 0;
    introText.textAlign = "center";
    stage.addChild(introText);
    
    window.createjs.Tween.get(introText)
      .wait(1200)
      .to({ alpha: 1 }, 1000);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col items-center">
      <canvas 
        ref={canvasRef} 
        className="border-2 border-gray-300 rounded-md shadow-lg bg-black"
        width="800"
        height="600"
      />
      <div className="mt-4 text-center text-gray-600">
        <p>Click anywhere to continue the animation</p>
      </div>
    </div>
  );
};

export default AnimationPlayer;
