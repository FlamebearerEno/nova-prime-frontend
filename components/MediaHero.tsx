type Props = {
  src?: string;
  alt: string;
  poster?: string;
  ratio?: "16/9" | "4/3" | "1/1" | "3/4" | "9/16";
  fit?: "cover" | "contain";
};

function isVideo(src?: string) {
  return !!src && (src.endsWith(".mp4") || src.endsWith(".webm"));
}

// Tailwind aspect helpers for the allowed ratios
const ratioClass: Record<NonNullable<Props["ratio"]>, string> = {
  "16/9":  "aspect-video",
  "4/3":   "aspect-[4/3]",
  "1/1":   "aspect-square",
  "3/4":   "aspect-[3/4]",
  "9/16":  "aspect-[9/16]",
};

export function MediaHero({
  src,
  alt,
  poster,
  ratio = "16/9",
  fit = "cover",
}: Props) {
  const fitClass = fit === "contain" ? "object-contain bg-black/50" : "object-cover";
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-white/10 ${ratioClass[ratio]} max-h-[82vh]`}>
      {isVideo(src) ? (
        <video
          src={src}
          className={`h-full w-full ${fitClass}`}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster={poster}
        />
      ) : (
        <img
          src={src || "/avatars/placeholder.png"}
          alt={alt}
          className={`h-full w-full ${fitClass}`}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
    </div>
  );
}