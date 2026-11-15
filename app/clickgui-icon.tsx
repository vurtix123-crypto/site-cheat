import type { ReactNode } from "react";

const shapes = {
  combat: <g fill="none" strokeWidth="2.2"><path d="M10 3a9 9 0 1 0 11 11M10 7a5.4 5.4 0 1 0 7 7m-5-2 6-6m-1-3v4h4"/><path d="M12 11a1.4 1.4 0 1 0 1.4 1.4"/></g>,
  movement: <g fill="none"><path d="M9 15c1.4-5.2 4.3-9.8 11.8-11.8.8-.2 1.2.2 1 1-1.7 7.5-6.4 11-11.2 12.5zM9.6 9H6.3L2 13.3l5.2 1.2m8.1-.2v3.4L11 22l-1.2-5.2M7.2 17.2l-3 3"/><circle cx="16.2" cy="8.6" r="1.6"/></g>,
  render: <path fillRule="evenodd" d="M1.5 12S5 4 12 4s10.5 8 10.5 8S19 20 12 20 1.5 12 1.5 12Zm6.8 0a3.7 3.7 0 1 0 7.4 0 3.7 3.7 0 0 0-7.4 0Zm2 0a1.7 1.7 0 1 0 3.4 0 1.7 1.7 0 0 0-3.4 0Z" stroke="none"/>,
  player: <g stroke="none"><circle cx="12" cy="6" r="4.1"/><path d="M3.5 18.4c0-3.6 3.6-6.4 8.5-6.4s8.5 2.8 8.5 6.4c0 2.7-2.7 3.4-8.5 3.4s-8.5-.7-8.5-3.4Z"/></g>,
  misc: <g stroke="none"><rect x="2" y="2" width="8.5" height="8.5" rx="1.7"/><rect x="13.5" y="2" width="8.5" height="8.5" rx="1.7"/><rect x="2" y="13.5" width="8.5" height="8.5" rx="1.7"/><rect x="13.5" y="13.5" width="8.5" height="8.5" rx="1.7"/></g>,
  cosmetics: <path fillRule="evenodd" d="M12 1.8c-6 0-10.3 4.7-10.3 10.4 0 5.5 5.2 10 9.2 10 2.6 0 3.2-2 2-3.7-1-1.4-.3-2.8 1.4-2.8h3.1c3.2 0 5.1-1.9 4.7-5.1C21.4 5.7 17.1 1.8 12 1.8ZM6.2 14.3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5.2-1.1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4 4.3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" stroke="none"/>,
  folder: <path d="M2 8V5a3 3 0 0 1 3-3h3.2L11 5h7a4 4 0 0 1 4 3H2Zm0 2h20v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-8Z" stroke="none"/>,
  friends: <g stroke="none"><circle cx="9.4" cy="6.8" r="4"/><path d="M15 4a3.5 3.5 0 0 1 .2 6.9 6 6 0 0 0-.2-6.9ZM9.4 13.8c4.3 0 7.8 1.9 7.8 4.1s-3.5 3.5-7.8 3.5-7.8-1.2-7.8-3.5 3.5-4.1 7.8-4.1Zm7 .2c3.3.2 6 1.5 6 3.2 0 1.4-2.2 2.4-4.7 2.6.6-.5.8-1 .8-1.9 0-1.5-.8-2.8-2.1-3.9Z"/></g>,
  pin: <path fillRule="evenodd" d="M12 1.5a9 9 0 0 0-9 9c0 5.1 6 9.9 8.3 11.8.4.3 1 .3 1.4 0 2.3-1.9 8.3-6.7 8.3-11.8a9 9 0 0 0-9-9Zm0 12.4a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Z" stroke="none"/>,
  keyboard: <path fillRule="evenodd" d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm1 3h2v2H5V8Zm4 0h2v2H9V8Zm4 0h2v2h-2V8Zm4 0h2v2h-2V8ZM5 12h2v2H5v-2Zm4 0h2v2H9v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2ZM7 15.6h10v1.3H7v-1.3Z" stroke="none"/>,
  layers: <><path d="m12 3 9.6 4a1.2 1.2 0 0 1 0 2.2l-8.4 3.5a3 3 0 0 1-2.4 0L2.4 9.2a1.2 1.2 0 0 1 0-2.2L12 3Z" stroke="none"/><path d="m2.3 12 8.5 3.6a3 3 0 0 0 2.4 0l8.5-3.6m-19.4 4 8.5 3.6a3 3 0 0 0 2.4 0l8.5-3.6" fill="none"/></>,
  chevron: <path d="m9 5 6 7-6 7" fill="none"/>,
  search: <g fill="none" strokeWidth="2"><circle cx="10.4" cy="10.4" r="6.5"/><path d="m15.3 15.3 4.2 4.2"/></g>,
  settings: <path fillRule="evenodd" d="m10 2-1 2.7-1.8 1-2.8-.4-2 3.4 1.8 2.2v2.2L2.4 15.3l2 3.4 2.8-.4 1.8 1L10 22h4l1-2.7 1.8-1 2.8.4 2-3.4-1.8-2.2v-2.2l1.8-2.2-2-3.4-2.8.4-1.8-1L14 2h-4Zm2 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="none"/>,
  close: <path d="m6 6 12 12M18 6 6 18" fill="none"/>,
} satisfies Record<string, ReactNode>;

export type ClickGuiIconName = keyof typeof shapes;

export function ClickGuiIcon({ name, size = 22 }: { name: ClickGuiIconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[name]}
    </svg>
  );
}
