import { useState } from "react";

export function SafeImage({
  src,
  alt,
  className = "",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`w-full h-full bg-brand-navy-soft flex items-center justify-center ${className}`}>
        <span className="text-xs italic text-brand-slate text-center px-4">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setErrored(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
