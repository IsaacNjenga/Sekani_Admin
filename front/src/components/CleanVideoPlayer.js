import { useRef, useState } from "react";
import { Slider } from "antd";
import { SoundOutlined, SoundFilled } from "@ant-design/icons";

function CleanVideoPlayer({ src, style }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(10);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const changeVolume = (val) => {
    setVolume(val);
    videoRef.current.volume = val / 10;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        muted={volume === 0}
        playsInline
        autoPlay
        loop
        onClick={togglePlay}
        style={style}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: "rgba(0,0,0,0.25)",
          padding: "10px 14px",
          borderRadius: 12,
          backdropFilter: "blur(3px)",
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          {isPlaying ? "❚❚" : "►"}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: 160,
          }}
        >
          {volume === 0 ? (
            <SoundOutlined style={{ color: "white", fontSize: 18 }} />
          ) : (
            <SoundFilled style={{ color: "white", fontSize: 18 }} />
          )}

          <Slider
            min={0}
            max={10}
            step={1}
            value={volume}
            range
            onChange={changeVolume}
            tooltip={{ open: false }}
          />
        </div>

        {/* Fullscreen */}
        <button
          onClick={toggleFullScreen}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            color: "white",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ⛶
        </button>
      </div>
    </div>
  );
}

export default CleanVideoPlayer;
