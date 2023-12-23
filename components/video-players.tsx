/** @format */

import { useRef, useState, CSSProperties } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  resolutions: Record<string, string>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, resolutions }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedResolution, setSelectedResolution] =
    useState<string>("default");
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const changeResolution = (resolution: string) => {
    if (resolution === "default") {
      videoRef.current!.style.width = "100%";
      videoRef.current!.style.height = "auto";
    } else if (resolution === "hd") {
      videoRef.current!.style.width = "720px";
      videoRef.current!.style.height = "480px";
    } else if (resolution === "sd") {
      videoRef.current!.style.width = "360px";
      videoRef.current!.style.height = "240px";
    }

    setSelectedResolution(resolution);
  };

  const changeSpeed = (speed: number) => {
    videoRef.current!.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const seek = (seconds: number) => {
    const currentTime = videoRef.current!.currentTime + seconds;
    videoRef.current!.currentTime = Math.max(0, currentTime);
  };

  const videoStyle: CSSProperties = {
    width: "100%", // Ensure the video takes the full width
  };

  return (
    <div className="relative">
      <video ref={videoRef} style={videoStyle} controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex justify-between">
        <div className="flex space-x-2">
          <button onClick={() => changeResolution("default")}>Default</button>
          <button onClick={() => changeResolution("hd")}>HD</button>
          <button onClick={() => changeResolution("sd")}>SD</button>
        </div>
        <div className="flex space-x-2">
          <span className="text-white">Speed: {playbackSpeed}x</span>
          <button onClick={() => changeSpeed(1)}>1x</button>
          <button onClick={() => changeSpeed(1.5)}>1.5x</button>
          <button onClick={() => changeSpeed(2)}>2x</button>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => seek(-10)}>Back 10s</button>
          <button onClick={() => seek(10)}>Forward 10s</button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
