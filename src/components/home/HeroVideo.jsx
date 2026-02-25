import { useRef, useEffect } from "react";
import "../../styles/herovideo.css";

export default function BannerVideo({
  videoSrc = "/videos/banner-video.mp4",
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.muted = true; // ensure muted for autoplay policy

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay blocked:", error);
        });
      }
    }
  }, []);

  return (
    <section className="bv-root">
      <video
        ref={videoRef}
        className="bv-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </section>
  );
}