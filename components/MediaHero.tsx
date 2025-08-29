type Props = {
  src?: string;
  alt: string;
  poster?: string;
};

function isVideo(src?: string) {
  return !!src && (src.endsWith(".mp4") || src.endsWith(".webm"));
}

export function MediaHero({ src, alt, poster }: Props) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
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
        // Use a plain img to avoid Next/Image config in patch
        <img src={src || "/avatars/placeholder.png"} alt={alt} className="h-full w-full object-cover" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
    </div>
  );
}
