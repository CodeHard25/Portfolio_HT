export const DESKTOP_MIN_WIDTH = 1025;

export const isDesktopWidth = (width: number): boolean =>
  width >= DESKTOP_MIN_WIDTH;

export const getViewportWidth = (): number => {
  if (typeof window === "undefined") return DESKTOP_MIN_WIDTH;
  return window.innerWidth;
};

export const shouldRenderCharacter = ({
  width,
  isCharacterVisible,
  isWorkFocusMode,
}: {
  width: number;
  isCharacterVisible: boolean;
  isWorkFocusMode: boolean;
}): boolean => isDesktopWidth(width) && isCharacterVisible && !isWorkFocusMode;

export const scrollToSectionWithOffset = (
  sectionSelector: string,
  offset = 0
): void => {
  if (typeof window === "undefined") return;
  const section = document.querySelector(sectionSelector) as HTMLElement | null;
  if (!section) return;

  const top =
    section.getBoundingClientRect().top + window.scrollY - Math.max(offset, 0);
  window.scrollTo({ top, behavior: "smooth" });
};
