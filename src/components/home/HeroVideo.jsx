import "../../styles/herovideo.css";

export default function BannerVideo() {
  return (
    <section className="bv-root">
      <video
        className="bv-video"
        src="/videos/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </section>
  );
}