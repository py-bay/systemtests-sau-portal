// spec: specs/student-login-logout-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Successful Login Flow', () => {
  test('2.1 Login with Valid Credentials', async ({ page }) => {
    // 1. Navigate to base URL (redirected to login)
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // 2. Locate username input field
    const emailField = page.getByRole('textbox', { name: 'Email' });
    await expect(emailField).toBeVisible();
    
    // 3. Enter valid username 'test-stud'
    await emailField.fill('test-stud');
    
    // 4. Locate password input field
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    await expect(passwordField).toBeVisible();
    
    // 5. Enter valid password 'test-stud'
    await passwordField.fill('test-stud');
    
    // 6. Click submit button
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verification: User is redirected away from login page to authenticated area
    await page.waitForURL('https://sau-portal.de/', { timeout: 10000 });
    
    // Verification: Dashboard or main portal page loads successfully
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).toBeVisible();
    
    // Verification: User interface elements for authenticated users appear (navigation menu)
    await expect(page.getByRole('button', { name: 'Prüfungen und Noten' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dokumentenmanagement' })).toBeVisible();
  });

  test('2.2 Login Persists Across Page Refresh', async ({ page }) => {
    // 1. Log in first
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    await page.getByRole('textbox', { name: 'Email' }).fill('test-stud');
    await page.getByRole('textbox', { name: 'Password' }).fill('test-stud');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('https://sau-portal.de/', { timeout: 10000 });
    
    // 2. Note current URL
    const currentURL = page.url();
    expect(currentURL).toBe('https://sau-portal.de/');
    
    // 3. Refresh the page (F5 or browser refresh)
    await page.reload();
    
    // 4. Wait for page to reload
    await page.waitForLoadState('domcontentloaded');
    
    // Verification: Page reloads successfully
    // Verification: User remains logged in (no redirect to login page)
    expect(page.url()).toBe('https://sau-portal.de/');
    
    // Verification: Same authenticated page is displayed
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).toBeVisible();
    
    // Verification: Profile icon and other authenticated UI elements remain visible
    await expect(page.getByRole('button', { name: 'Prüfungen und Noten' })).toBeVisible();
  });

  test('2.3 Login with Enter Key Submission', async ({ page }) => {
    // 1. Navigate to base URL (redirected to login)
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // 2. Enter valid username in username field
    await page.getByRole('textbox', { name: 'Email' }).fill('test-stud');
    
    // 3. Enter valid password in password field
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    await passwordField.fill('test-stud');
    
    // 4. Press Enter key (instead of clicking submit button)
    await passwordField.press('Enter');
    
    // Verification: Form is submitted via Enter key
    // Verification: Login succeeds
    await page.waitForURL('https://sau-portal.de/', { timeout: 10000 });
    
    // Verification: User is redirected to authenticated area
    // Verification: Dashboard/main page loads successfully
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).toBeVisible();
  });
});
