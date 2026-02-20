"use client"
import React, { useRef, useEffect } from "react";
import styles from "./HeroMontage.module.css";

type Props = {
  images: string[];
  mainVideo: string;
  duration?: number; // seconds, total
  preset?: "default" | "reflective";
};

export default function HeroMontage({ images, mainVideo, duration = 15, preset = "default" }: Props) {
  const totalSlides = images.length + 1;
  const segment = duration / totalSlides;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.play().catch(() => {});
  }, []);

  const midIndex = Math.floor(totalSlides / 2);
  const slides: Array<{ type: "image" | "video"; src: string; key: string }> = [];

  for (let i = 0; i < images.length + 1; i++) {
    if (i === midIndex) {
      slides.push({ type: "video", src: mainVideo, key: `video-${i}` });
    } else {
      const imgIndex = i < midIndex ? i : i - 1;
      slides.push({ type: "image", src: images[imgIndex], key: `img-${imgIndex}` });
    }
  }

  return (
    <div
      className={styles.montage}
      data-preset={preset}
      style={{ ["--duration" as any]: `${duration}s` }}
    >
      <div className={styles.baseFade} />

      {slides.map((s, i) => {
        const delay = -(i * segment);
        const style: React.CSSProperties = {
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        };

        if (s.type === "image") {
          return (
            <div
              key={s.key}
              className={`${styles.slide} ${styles.image}`}
              style={{ ...style, backgroundImage: `url(${s.src})` }}
            />
          );
        }

        return (
          <div key={s.key} className={`${styles.slide} ${styles.videoWrap}`} style={style}>
            <video
              ref={videoRef}
              className={styles.video}
              src={s.src}
              muted
              playsInline
            />
          </div>
        );
      })}

      <div className={styles.warmGrade} />
      <div className={styles.lightLeaks} />
      <div className={styles.filmGrain} />
      {preset === "reflective" && <div className={styles.vignette} />}
    </div>
  );
}
