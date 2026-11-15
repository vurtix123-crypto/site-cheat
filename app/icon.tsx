type IconName = "download" | "key" | "lock" | "external" | "up" | "swords" | "move" | "eye" | "bag" | "plus" | "grid" | "search" | "box" | "wand";

const paths: Record<IconName, React.ReactNode> = {
  download: <><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M4 16v4h16v-4"/></>,
  key: <path d="M16 4a4 4 0 0 0-3.4 6.1L5 17.7V20h2.4l1.4-1.4V17h1.7l1.5-1.5V14l2.1-2.1A4 4 0 1 0 16 4Zm1 3h.01"/>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2"/></>,
  external: <><path d="M8 16 19 5M9 5h10v10"/><path d="M19 13v6H5V5h6"/></>,
  up: <path d="M12 20V4m-6 6 6-6 6 6"/>,
  swords: <><path d="m3 3 5 .8 12 12-4.2 4.2-12-12L3 3Zm14 14 4 4m-7 0 7-7M21 3l-5 .8-3.4 3.4M7 17l-4 4m0-7 7 7m.5-7.5-2.2 2.2"/></>,
  move: <path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>,
  eye: <><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
  bag: <><rect x="4" y="8" width="16" height="13" rx="2"/><path d="M9 8V5a3 3 0 0 1 6 0v3m-11 5h16m-8 0v3"/></>,
  grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
  search: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5"/></>,
  box: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></>,
  wand: <><path d="m4 20 13-13 3 3L7 23M6 4v4M4 6h4m9-4v4m-2-2h4"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
