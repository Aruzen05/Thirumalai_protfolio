import * as simpleIcons from "simple-icons";

type SimpleIcon = { title: string; path: string; hex: string };

// WCAG relative luminance of a hex colour.
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Locally drawn stand-ins where no brand logo is available.
export const LOCAL_ICONS: Record<string, { d: string; outline?: boolean }> = {
  // Generic cloud (used for Microsoft Azure — Microsoft logos aren't in simple-icons).
  cloud: { d: "M7 19a5 5 0 0 1-.9-9.92A7 7 0 0 1 19.6 8.6 5.2 5.2 0 0 1 18 19H7Z" },
  // Database cylinder (generic SQL), drawn as an outline.
  database: {
    d: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
    outline: true,
  },
};

const LOCAL_COLOURS: Record<string, string> = { cloud: "0078D4", database: "336791" };

// Brand logos from simple-icons (CC0), rendered on the server.
// `colored` paints the logo in its brand colour. Logos too light to see on a
// light background, or too dark on a dark one, fall back to the text colour
// in that theme (see .brand-ic in globals.css).
// `sprite` references the logo in /icons.svg (see app/icons.svg/route.ts)
// instead of inlining its path — used for the long skills list.
export function BrandIcon({
  name,
  className,
  colored,
  sprite,
}: {
  name: string;
  className?: string;
  colored?: boolean;
  sprite?: boolean;
}) {
  const icon = (simpleIcons as unknown as Record<string, SimpleIcon | undefined>)[name];
  const local = LOCAL_ICONS[name];
  const path = icon?.path ?? local?.d;
  if (!path) return null;

  const hex = icon?.hex ?? LOCAL_COLOURS[name];
  let classes = className ?? "";
  let style: React.CSSProperties | undefined;
  if (colored && hex) {
    const l = luminance(hex);
    classes += ` brand-ic${l > 0.45 ? " is-light" : ""}${l < 0.06 ? " is-dark" : ""}`;
    style = { "--brand": `#${hex}` } as React.CSSProperties;
  }

  return (
    <svg className={classes} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {sprite ? (
        <use href={`/icons.svg#${name}`} />
      ) : local?.outline ? (
        <path d={path} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d={path} fill="currentColor" />
      )}
    </svg>
  );
}

// LinkedIn isn't in simple-icons (removed at LinkedIn's request).
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    </svg>
  );
}

function Line({ d, className }: { d: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

export const MailIcon = ({ className }: { className?: string }) => (
  <Line className={className} d="M3 6.5h18v11H3zM3.5 7l8.5 6.5L20.5 7" />
);

export const PaperIcon = ({ className }: { className?: string }) => (
  <Line className={className} d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />
);

export const ArrowIcon = ({ className }: { className?: string }) => (
  <Line className={className} d="M5 12h14M13 6l6 6-6 6" />
);

export const ShieldIcon = ({ className }: { className?: string }) => (
  <Line className={className} d="M12 3 4.5 6v6c0 4.6 3.2 7.8 7.5 9 4.3-1.2 7.5-4.4 7.5-9V6L12 3Zm-3 9 2 2 4-4" />
);

export const PhoneIcon = ({ className }: { className?: string }) => (
  <Line
    className={className}
    d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"
  />
);

export const PinIcon =({ className }: { className?: string }) => (
  <Line className={className} d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
);
