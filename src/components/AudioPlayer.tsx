import React, { useRef, useState } from "react";

interface AudioPlayerProps {
  title?: string;
  audioUrl: string;
  className?: string;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  className,
  title,
  audioUrl,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
      />

      <button onClick={togglePlay} className={className}>
        {isPlaying ? "⏸" : "▶️"} {title}
      </button>
    </div>
  );
};

export default AudioPlayer;
