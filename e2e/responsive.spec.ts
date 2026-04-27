import { expect, test, type Page } from "@playwright/test";

const waitForPortfolioReady = async (page: Page) => {
  await page.goto("/?e2e=1");
  const loader = page.locator(".loading-screen");
  if ((await loader.count()) > 0) {
    await loader.first().waitFor({ state: "hidden", timeout: 90_000 }).catch(() => {});
  }
  await page.waitForSelector(".header", { timeout: 90_000 });
};

test("@smoke no horizontal overflow", async ({ page }) => {
  await waitForPortfolioReady(page);
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  );
  expect(hasOverflow).toBeFalsy();
});

test("@smoke mobile and tablet skip 3D character", async ({ page }, testInfo) => {
  const isDesktopProject = testInfo.project.name.includes("desktop");
  test.skip(isDesktopProject, "Only validates smaller viewports");

  await waitForPortfolioReady(page);
  await expect(page.locator(".character-model")).toHaveCount(0);
});

test("@smoke desktop WORK nav lands near What I Do intro", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("desktop"));

  await waitForPortfolioReady(page);
  await page.click('a[data-href="#whatido-intro"]');
  await page.waitForTimeout(900);

  const y = await page.locator("#whatido-intro").evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return rect.top;
  });

  expect(y).toBeGreaterThanOrEqual(40);
  expect(y).toBeLessThanOrEqual(260);
});
