function isVideo(src?: string) {
  return !!src && (src.endsWith(".mp4") || src.endsWith(".webm"));
}

export function Thumb({ src, alt, poster }: { src?: string; alt: string; poster?: string }) {
  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      {isVideo(src) ? (
        <video
          src={src}
          className="h-full w-full object-cover"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster={poster}
        />
      ) : (
        <img src={src || "/avatars/placeholder.png"} alt={alt} className="h-full w-full object-cover" />
      )}
    </div>
  );
}
