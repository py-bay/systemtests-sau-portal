# Student Login and Logout - Comprehensive Test Plan

## Application Overview

The SAU Portal (https://sau-portal.de) is a student portal application that requires authentication. When accessing the base URL, users are redirected to a login page where they must authenticate before accessing portal features. The application provides:

- **Authentication**: Username/password login system
- **Session Management**: Maintains authenticated user sessions
- **Logout**: Profile icon in header provides logout functionality
- **Redirect Behavior**: Automatic redirect to login when unauthenticated

## Test Objectives

1. Verify successful login with valid credentials
2. Verify logout functionality via profile icon
3. Validate error handling for invalid credentials
4. Test edge cases and boundary conditions
5. Ensure proper redirect behavior throughout authentication flows

## Prerequisites

- Base URL: https://sau-portal.de
- Test credentials stored in environment variables:
  - `TEST_STUD_USERNAME` (example: test-stud)
  - `TEST_STUD_PASSWORD` (example: test-stud)
- Browser with cookies/session storage enabled

## Test Scenarios

### 1. Initial Access and Redirect Behavior

**Seed:** `tests/seed.spec.ts`

#### 1.1 Unauthenticated User Redirected to Login
**Starting State:** No active session, browser cleared

**Steps:**
1. Navigate to base URL `https://sau-portal.de`
2. Observe redirect behavior

**Expected Results:**
- User is automatically redirected to login page
- Login form is displayed with username and password fields
- URL contains `/login` or similar authentication path
- Page title indicates login/authentication page

#### 1.2 Login Page Loads Correctly
**Starting State:** Redirected to login page from base URL

**Steps:**
1. Navigate to base URL (which redirects to login)
2. Inspect login form elements

**Expected Results:**
- Username input field is visible and enabled
- Password input field is visible and enabled (type="password")
- Submit button is visible and enabled
- No error messages are displayed initially
- Form is ready for user input

---

### 2. Successful Login Flow (Positive Tests)

**Seed:** `tests/seed.spec.ts`

#### 2.1 Login with Valid Credentials
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Locate username input field
3. Enter valid username from `TEST_STUD_USERNAME` environment variable
4. Locate password input field
5. Enter valid password from `TEST_STUD_PASSWORD` environment variable
6. Click submit button or press Enter

**Expected Results:**
- Form submission is processed
- No error messages appear
- User is redirected away from login page
- Dashboard or main portal page loads successfully
- URL changes to reflect authenticated state (e.g., `/dashboard`, `/home`)
- User interface elements for authenticated users appear (e.g., profile icon, navigation menu)
- Session is established (can be verified by checking cookies/localStorage)

#### 2.2 Login Persists Across Page Refresh
**Starting State:** Successfully logged in from test 2.1

**Steps:**
1. Ensure user is logged in and on dashboard/main page
2. Note current URL
3. Refresh the page (F5 or browser refresh)
4. Wait for page to reload

**Expected Results:**
- Page reloads successfully
- User remains logged in (no redirect to login page)
- Same authenticated page is displayed
- User session is maintained
- Profile icon and other authenticated UI elements remain visible

#### 2.3 Login with Enter Key Submission
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter valid username in username field
3. Enter valid password in password field
4. Press Enter key (instead of clicking submit button)

**Expected Results:**
- Form is submitted via Enter key
- Login succeeds as in test 2.1
- User is redirected to authenticated area
- Dashboard/main page loads successfully

---

### 3. Logout Flow (Positive Tests)

**Seed:** `tests/seed.spec.ts`

#### 3.1 Logout via Profile Icon
**Starting State:** User is successfully logged in

**Steps:**
1. Log in using valid credentials (use `loggedInStudent` fixture)
2. Verify user is on authenticated page
3. Locate profile icon in header
4. Click on profile icon
5. Locate logout option/button in dropdown or menu
6. Click logout option

**Expected Results:**
- Profile menu opens when clicking profile icon
- Logout option is visible and clickable
- After clicking logout, user is redirected to login page
- Session is cleared (cookies/localStorage)
- Authenticated UI elements are no longer visible
- Attempting to navigate back to authenticated pages redirects to login

#### 3.2 Cannot Access Authenticated Pages After Logout
**Starting State:** User has just logged out from test 3.1

**Steps:**
1. Complete logout from test 3.1
2. Note a protected URL from the authenticated session (e.g., dashboard URL)
3. Attempt to navigate directly to that protected URL

**Expected Results:**
- User is redirected back to login page
- Protected page is not accessible
- Login form is displayed
- No authenticated content is shown

#### 3.3 Profile Icon Visible When Logged In
**Starting State:** User is logged in

**Steps:**
1. Log in using valid credentials
2. Examine page header

**Expected Results:**
- Profile icon is visible in header
- Profile icon is positioned consistently (e.g., top-right corner)
- Icon is clickable/interactive
- Hovering over icon may show tooltip or highlight

---

### 4. Invalid Login Attempts (Negative Tests)

**Seed:** `tests/seed.spec.ts`

#### 4.1 Login with Invalid Username
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter invalid/non-existent username (e.g., "invalid-user-12345")
3. Enter valid password
4. Click submit button

**Expected Results:**
- Login attempt fails
- Error message is displayed indicating invalid credentials
- User remains on login page (no redirect)
- Username and password fields may be cleared or retain values
- No session is created
- User is NOT logged in

#### 4.2 Login with Invalid Password
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter valid username
3. Enter incorrect password (e.g., "wrong-password-xyz")
4. Click submit button

**Expected Results:**
- Login attempt fails
- Error message is displayed indicating invalid credentials
- User remains on login page
- No session is created
- User is NOT logged in

#### 4.3 Login with Both Invalid Credentials
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter invalid username
3. Enter invalid password
4. Click submit button

**Expected Results:**
- Login attempt fails
- Error message is displayed
- User remains on login page
- No session is created

#### 4.4 Login with Empty Username
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Leave username field empty
3. Enter valid password
4. Click submit button

**Expected Results:**
- Form validation prevents submission OR
- Server returns error indicating username is required
- Error message displayed (e.g., "Username is required")
- User remains on login page
- No login occurs

#### 4.5 Login with Empty Password
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter valid username
3. Leave password field empty
4. Click submit button

**Expected Results:**
- Form validation prevents submission OR
- Server returns error indicating password is required
- Error message displayed (e.g., "Password is required")
- User remains on login page
- No login occurs

#### 4.6 Login with Both Fields Empty
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Leave both username and password fields empty
3. Click submit button

**Expected Results:**
- Form validation prevents submission OR
- Server returns error indicating required fields
- Error message displayed
- User remains on login page
- No login occurs

---

### 5. Edge Cases and Security

**Seed:** `tests/seed.spec.ts`

#### 5.1 SQL Injection Attempt in Username
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter SQL injection string in username field (e.g., `' OR '1'='1`)
3. Enter any password
4. Click submit button

**Expected Results:**
- Login attempt fails (input is sanitized)
- Error message about invalid credentials
- No SQL error or database error exposed
- Application remains stable
- User is NOT logged in

#### 5.2 XSS Attempt in Login Fields
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter XSS payload in username field (e.g., `<script>alert('XSS')</script>`)
3. Enter any password
4. Click submit button

**Expected Results:**
- Script is NOT executed
- Input is properly escaped/sanitized
- Login fails with invalid credentials error
- No JavaScript alert appears
- Application remains secure

#### 5.3 Very Long Input Strings
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter very long string in username field (e.g., 1000+ characters)
3. Enter very long string in password field
4. Click submit button

**Expected Results:**
- Input is handled gracefully (truncated or rejected)
- No application crash or error
- Login fails with appropriate error message
- Form remains functional

#### 5.4 Special Characters in Credentials
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter username with special characters (e.g., `test@user#123!`)
3. Enter password with special characters
4. Click submit button

**Expected Results:**
- Special characters are accepted by form
- Login succeeds if credentials are valid OR
- Login fails gracefully if credentials are invalid
- No encoding/decoding errors
- Application handles special characters properly

#### 5.5 Multiple Rapid Login Attempts
**Starting State:** On login page, no active session

**Steps:**
1. Navigate to base URL (redirected to login)
2. Enter invalid credentials
3. Rapidly submit form multiple times (5-10 attempts)
4. Observe behavior

**Expected Results:**
- Application handles rapid requests gracefully
- Rate limiting may be applied after threshold
- Error messages displayed appropriately
- Account is NOT locked (for test account)
- Application remains responsive

#### 5.6 Browser Back Button After Logout
**Starting State:** User is logged in

**Steps:**
1. Log in successfully
2. Navigate to an authenticated page (e.g., dashboard)
3. Log out via profile icon
4. Verify redirect to login page
5. Click browser back button

**Expected Results:**
- User is NOT returned to authenticated page OR
- If cached page appears, it shows as logged out/redirected
- Session is still cleared
- Attempting to interact redirects to login
- No sensitive data accessible

---

### 6. UI and Accessibility

**Seed:** `tests/seed.spec.ts`

#### 6.1 Login Form Accessibility
**Starting State:** On login page

**Steps:**
1. Navigate to login page
2. Inspect form elements for accessibility attributes
3. Test keyboard navigation (Tab key)
4. Test form labels

**Expected Results:**
- Username field has proper label or aria-label
- Password field has proper label or aria-label
- Tab order is logical (username → password → submit)
- Submit button is keyboard accessible
- Form has proper semantic HTML (form, input, button elements)

#### 6.2 Error Message Visibility
**Starting State:** On login page

**Steps:**
1. Navigate to login page
2. Enter invalid credentials
3. Submit form
4. Observe error message

**Expected Results:**
- Error message is clearly visible
- Error message has sufficient color contrast
- Error message is associated with form (aria-describedby or similar)
- Error is announced to screen readers
- Error message is positioned near form

#### 6.3 Profile Icon Accessibility
**Starting State:** User is logged in

**Steps:**
1. Log in successfully
2. Locate profile icon in header
3. Test keyboard access to profile icon
4. Inspect aria attributes

**Expected Results:**
- Profile icon is keyboard accessible (Tab to focus)
- Icon has proper aria-label or accessible name
- Dropdown/menu can be opened with keyboard (Enter/Space)
- Logout option in menu is keyboard accessible

---

## Success Criteria

All test scenarios must pass with the following conditions:
- Login with valid credentials succeeds consistently
- Logout functionality works and clears session properly
- Invalid credentials are rejected with appropriate error messages
- Empty fields are validated before submission
- Security attacks (SQL injection, XSS) are properly mitigated
- Session persistence works across page refreshes
- Redirects function correctly for authenticated and unauthenticated states
- UI is accessible via keyboard and screen readers

## Notes for Test Implementation

1. Use the `loggedInStudent` fixture from `tests/seed.spec.ts` for tests requiring authenticated state
2. Environment variables `TEST_STUD_USERNAME` and `TEST_STUD_PASSWORD` must be configured before running tests
3. Clear cookies/session storage between test runs to ensure clean state
4. Capture screenshots on test failures for debugging
5. Adjust selectors based on actual application HTML structure discovered during Playwright Planner exploration
6. Consider adding explicit waits for network requests during login/logout operations
7. Verify HTTPS is used for login page (security best practice)

## Test Execution Order

1. Run UI structure tests first (6.x) to understand application layout
2. Run positive login tests (2.x) to establish baseline
3. Run logout tests (3.x) to verify session management
4. Run negative tests (4.x) to validate error handling
5. Run edge cases and security tests (5.x) last

## Follow-up Test Plans

After completing this test plan, consider creating additional test plans for:
- Password reset/recovery flow
- Remember me functionality (if available)
- Session timeout behavior
- Multi-factor authentication (if implemented)
- Account registration (if available)
- Profile management features
