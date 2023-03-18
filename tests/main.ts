import { expect, test } from '@playwright/test';

test('index page has 3 top plays', async ({ page }) => {
  await page.goto('/');

  const recentLevels = await page.$$('.top-play-wrapper > .top-play');

  expect(recentLevels.length).toBe(3);
});

test('index page has 10 recent levels', async ({ page }) => {
  await page.goto('/');

  const recentLevels = await page.$$('a.level-list-item');

  expect(recentLevels.length).toBe(10);
});
