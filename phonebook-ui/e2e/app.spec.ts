import { test, expect } from '@playwright/test';

test('loads the phonebook page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Phonebook' })).toBeVisible();
  await expect(page.getByPlaceholder('Name')).toBeVisible();
  await expect(page.getByPlaceholder('Primary number (10 digits)')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add Contact' })).toBeVisible();
  
});

test('adds a new contact', async ({ page}) => {
  await page.goto('/');
  await page.getByPlaceholder('Name').fill("Pratibha");
  await page.getByPlaceholder('Primary number (10 digits)').fill("1234556789");
  await page.getByRole('button', { name: 'Add Contact' }).click();
  //await expect (page.getByText('Pratibha')).toBeVisible();
  await expect (page.getByText('1234556789')).toBeVisible();
  await expect (page.locator('button.delete-btn')  ).toBeVisible();
  await expect (page.locator('//*[@id="root"]/div/p')).toBeVisible();



})