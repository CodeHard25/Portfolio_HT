import {
  DESKTOP_MIN_WIDTH,
  isDesktopWidth,
  shouldRenderCharacter,
  scrollToSectionWithOffset,
} from "./responsive";

describe("responsive utils", () => {
  it("detects desktop width from breakpoint", () => {
    expect(isDesktopWidth(DESKTOP_MIN_WIDTH)).toBe(true);
    expect(isDesktopWidth(DESKTOP_MIN_WIDTH - 1)).toBe(false);
  });

  it("renders character only on desktop when visible and not in work focus", () => {
    expect(
      shouldRenderCharacter({
        width: 1440,
        isCharacterVisible: true,
        isWorkFocusMode: false,
      })
    ).toBe(true);

    expect(
      shouldRenderCharacter({
        width: 390,
        isCharacterVisible: true,
        isWorkFocusMode: false,
      })
    ).toBe(false);

    expect(
      shouldRenderCharacter({
        width: 1440,
        isCharacterVisible: false,
        isWorkFocusMode: false,
      })
    ).toBe(false);

    expect(
      shouldRenderCharacter({
        width: 1440,
        isCharacterVisible: true,
        isWorkFocusMode: true,
      })
    ).toBe(false);
  });

  it("scrolls to section with offset", () => {
    const section = document.createElement("div");
    section.id = "whatido-intro";
    document.body.appendChild(section);

    vi.spyOn(section, "getBoundingClientRect").mockReturnValue({
      width: 100,
      height: 100,
      x: 0,
      y: 200,
      top: 200,
      bottom: 300,
      left: 0,
      right: 100,
      toJSON: () => {},
    });

    const scrollSpy = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);

    scrollToSectionWithOffset("#whatido-intro", 80);

    expect(scrollSpy).toHaveBeenCalledWith({
      top: 120,
      behavior: "smooth",
    });

    scrollSpy.mockRestore();
    section.remove();
  });
});
