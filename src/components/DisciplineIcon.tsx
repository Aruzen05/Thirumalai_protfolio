// Line icons for the discipline cards, keyed by Discipline.key.
const PATHS: Record<string, string> = {
  eng: "M8 7 3 12l5 5M16 7l5 5-5 5M13.5 4l-3 16",
  sec: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Zm-3 9 2 2 4-4",
  ai: "M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3M6 6h12v12H6zM10 10h4v4h-4z",
  gov: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5",
  ops: "M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8",
  lead: "M14 5a2 2 0 1 0-4 0a2 2 0 1 0 4 0M7 19a2 2 0 1 0-4 0a2 2 0 1 0 4 0M21 19a2 2 0 1 0-4 0a2 2 0 1 0 4 0M12 7v4M12 11l-5.6 6.4M12 11l5.6 6.4",
};

export function DisciplineIcon({ k }: { k: string }) {
  return (
    <svg className="d-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={PATHS[k]} />
    </svg>
  );
}
