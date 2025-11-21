import { Carousel } from "antd";
import { useRef, useEffect, useState } from "react";
import CleanVideoPlayer from "./CleanVideoPlayer";

function VideoCarousel({ content, isMobile }) {
  const carouselRef = useRef(null);
  const videoRefs = useRef([]);
  // eslint-disable-next-line no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (current) => {
    setCurrentSlide(current);

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === current) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  useEffect(() => {
    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(() => {});
    }
  }, []);

  return (
    <Carousel
      ref={carouselRef}
      autoplay={false}
      arrows={!isMobile}
      dotPosition="top"
      beforeChange={(from, to) => handleSlideChange(to)}
    >
      {content.map((src, index) => (
        <div key={index}>
          <CleanVideoPlayer
            src={src}
            style={{
              objectFit: isMobile ? "cover" : "cover",
              width: "100%",
              height: "100vh",
              background: "#000",
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default VideoCarousel;
