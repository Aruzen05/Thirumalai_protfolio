import { existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/content/profile";

type Photo = { src: string; width: number; height: number };

// Renders a photo from public/ when the file exists (checked at build time);
// otherwise a monogram placeholder keeps the layout intact.
export function Portrait({
  photo = site.photo,
  className,
  priority = false,
}: {
  photo?: Photo;
  className?: string;
  priority?: boolean;
}) {
  const hasPhoto = existsSync(join(process.cwd(), "public", photo.src));

  if (hasPhoto) {
    return (
      <img
        className={`portrait-img ${className ?? ""}`}
        src={photo.src}
        alt={`Portrait of ${site.name}`}
        width={photo.width}
        height={photo.height}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <div className={`portrait-ph ${className ?? ""}`} role="img" aria-label={site.name}>
      <span className="portrait-ring portrait-ring-1" aria-hidden="true" />
      <span className="portrait-ring portrait-ring-2" aria-hidden="true" />
      <span className="portrait-mono" aria-hidden="true">
        {site.initials}
      </span>
    </div>
  );
}
