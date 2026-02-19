import { useLoadingAnimation } from '@/hooks/useLoadingAnimation';

interface LoadingScreenProps {
  onComplete: () => void;
  onStartFadeOut?: () => void;
}

const LoadingScreen = ({ onComplete, onStartFadeOut }: LoadingScreenProps) => {
  const { containerRef, progressBarRef, textRef, progressTextRef } = useLoadingAnimation(onComplete, onStartFadeOut);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center space-y-8">
        <div ref={textRef} className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
            Juan
          </h1>
          <p className="text-muted-foreground text-lg">
            Desenvolvedor Web Premium
          </p>
        </div>

        <div className="w-80 mx-auto space-y-4">
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-violet-600 rounded-full"
              style={{ width: '0%' }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Carregando... <span ref={progressTextRef}>0%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;