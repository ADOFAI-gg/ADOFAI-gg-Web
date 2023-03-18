import { expect, test } from '@playwright/test';

test('click levels at nav and locate to levels page', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Levels' }).click();

  await page.waitForLoadState('networkidle');

  expect(page.url()).toBe('http://localhost:3000/levels');
});

test('levels page renders 7 items', async ({ page }) => {
  await page.goto('/levels');

  await page.waitForSelector('virtual-list-item');

  const items = await page.$$('virtual-list-item');

  expect(items.length).toBe(7);
});

test('levels page fetches more items', async ({ page }) => {
  await page.goto('/levels');

  await page.waitForSelector('virtual-list-item');

  const items = await page.$$('virtual-list-item');

  const scrollY = await page.evaluate(() => document.body.scrollHeight);

  await page.mouse.wheel(0, scrollY);

  await page.waitForTimeout(1000);

  const newItems = await page.$$('virtual-list-item');

  expect(items.length).toBeLessThan(newItems.length);

  expect(newItems.length).toBe(9);
});

test('levels - switch view', async ({ page }) => {
  await page.goto('/levels');

  expect(await page.$('table')).toBeNull();

  await page.getByText('Table').click();

  expect(await page.$('table')).not.toBeNull();

  expect((await page.$$('th')).length).toBe(10);

  await page.getByText('List').click();

  expect(await page.$('table')).toBeNull();
});
