// spec: specs/student-login-logout-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Invalid Login Attempts (Negative Tests)', () => {
  test('4.1 Login with Invalid Username', async ({ page }) => {
    // 1. Navigate to base URL (redirected to login)
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // 2. Enter invalid/non-existent username
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid-user-12345');
    
    // 3. Enter valid password
    await page.getByRole('textbox', { name: 'Password' }).fill('test-stud');
    
    // 4. Click submit button
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verification: Login attempt fails
    // Verification: Error message is displayed indicating invalid credentials
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    
    // Verification: User remains on login page (no redirect)
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    
    // Verification: No session is created - dashboard is not visible
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).not.toBeVisible();
  });

  test('4.2 Login with Invalid Password', async ({ page }) => {
    // 1. Navigate to base URL (redirected to login)
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // 2. Enter valid username
    await page.getByRole('textbox', { name: 'Email' }).fill('test-stud');
    
    // 3. Enter incorrect password
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong-password-xyz');
    
    // 4. Click submit button
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verification: Login attempt fails
    // Verification: Error message is displayed indicating invalid credentials
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    
    // Verification: User remains on login page
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    
    // Verification: No session is created
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).not.toBeVisible();
  });

  test('4.3 Login with Both Invalid Credentials', async ({ page }) => {
    // 1. Navigate to base URL (redirected to login)
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // 2. Enter invalid username
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid-user-12345');
    
    // 3. Enter invalid password
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong-password-xyz');
    
    // 4. Click submit button
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verification: Login attempt fails
    // Verification: Error message is displayed
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    
    // Verification: User remains on login page
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    
    // Verification: No session is created
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).not.toBeVisible();
  });

  test('4.4 Login with Empty Username', async ({ page }) => {
    // 1. Navigate to base URL (redirected to login)
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // 2. Leave username field empty
    await page.getByRole('textbox', { name: 'Email' }).fill('');
    
    // 3. Enter valid password
    await page.getByRole('textbox', { name: 'Password' }).fill('test-stud');
    
    // 4. Click submit button
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verification: Error message displayed
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    
    // Verification: User remains on login page
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    
    // Verification: No login occurs
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).not.toBeVisible();
  });

  test('4.5 Login with Empty Password', async ({ page }) => {
    // 1. Navigate to base URL (redirected to login)
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // 2. Enter valid username
    await page.getByRole('textbox', { name: 'Email' }).fill('test-stud');
    
    // 3. Leave password field empty
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    
    // 4. Click submit button
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verification: Error message displayed
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    
    // Verification: User remains on login page
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    
    // Verification: No login occurs
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).not.toBeVisible();
  });

  test('4.6 Login with Both Fields Empty', async ({ page }) => {
    // 1. Navigate to base URL (redirected to login)
    await page.goto('https://sau-portal.de');
    await page.waitForURL(/keycloak.*\/auth/, { timeout: 10000 });
    
    // 2. Leave both username and password fields empty
    await page.getByRole('textbox', { name: 'Email' }).fill('');
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    
    // 3. Click submit button
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verification: Error message displayed
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    
    // Verification: User remains on login page
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    
    // Verification: No login occurs
    await expect(page.getByRole('heading', { name: 'Willkommen im neuen Hochschulportal' })).not.toBeVisible();
  });
});
