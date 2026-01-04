/**
 * Test signup with real email
 */
const { chromium } = require('playwright');

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000';
const TEST_EMAIL = 'trustiaagency@gmail.com';
const TEST_PASSWORD = 'TestPassword123!';
const TEST_NAME = 'Test User';
const SCREENSHOT_DIR = '/home/antoine/Documents/dev/template_version_two/ai-saas-template/tests/auth/screenshots';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 150 });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const results = { signup: null, login: null };

  try {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 TESTING SIGNUP WITH REAL EMAIL');
    console.log('='.repeat(60));
    console.log(`\n📧 Email: ${TEST_EMAIL}`);

    // =====================================================
    // TEST 1: Signup with real email
    // =====================================================
    console.log('\n📝 TEST 1: Signup with real email...');

    await page.goto(`${TARGET_URL}/signup`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${SCREENSHOT_DIR}/test-real-01-signup-page.png`, fullPage: true });

    // Fill signup form
    const nameInput = await page.locator('input[name="name"]');
    if (await nameInput.isVisible()) {
      await nameInput.fill(TEST_NAME);
    }
    await page.locator('input[name="email"]').fill(TEST_EMAIL);
    await page.locator('input[name="password"]').fill(TEST_PASSWORD);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/test-real-02-signup-filled.png`, fullPage: true });

    // Submit
    await page.locator('button[type="submit"]:has-text("Create account")').click();

    // Wait for response
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/test-real-03-signup-result.png`, fullPage: true });

    const signupUrl = page.url();
    const signupErrors = await page.locator('[role="alert"], .error, .text-red-500, .text-destructive').allTextContents();

    console.log(`   Result URL: ${signupUrl}`);
    console.log(`   Errors: ${JSON.stringify(signupErrors)}`);

    if (!signupUrl.includes('signup') && signupErrors.filter(e => e.trim()).length === 0) {
      console.log('   ✅ Signup successful!');
      results.signup = 'pass';
    } else if (signupErrors.some(e => e.toLowerCase().includes('already') || e.toLowerCase().includes('exists'))) {
      console.log('   ⚠️  User already exists - will try login');
      results.signup = 'exists';
    } else {
      console.log('   ❌ Signup failed');
      results.signup = 'fail';
    }

    // =====================================================
    // TEST 2: Login with the email
    // =====================================================
    console.log('\n📝 TEST 2: Login with the email...');

    await page.goto(`${TARGET_URL}/login`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${SCREENSHOT_DIR}/test-real-04-login-page.png`, fullPage: true });

    await page.locator('input[name="email"]').fill(TEST_EMAIL);
    await page.locator('input[name="password"]').fill(TEST_PASSWORD);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/test-real-05-login-filled.png`, fullPage: true });

    await page.locator('button[type="submit"]:has-text("Sign in")').click();

    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/test-real-06-login-result.png`, fullPage: true });

    const loginUrl = page.url();
    const loginErrors = await page.locator('[role="alert"], .error, .text-red-500, .text-destructive').allTextContents();

    console.log(`   Result URL: ${loginUrl}`);
    console.log(`   Errors: ${JSON.stringify(loginErrors)}`);

    if (!loginUrl.includes('login') && loginErrors.filter(e => e.trim()).length === 0) {
      console.log('   ✅ Login successful!');
      results.login = 'pass';

      // Take screenshot of dashboard/logged in state
      await page.screenshot({ path: `${SCREENSHOT_DIR}/test-real-07-logged-in.png`, fullPage: true });
      console.log(`   📍 Redirected to: ${loginUrl}`);

      // =====================================================
      // TEST 3: Signout
      // =====================================================
      console.log('\n📝 TEST 3: Finding signout button...');

      const signoutSelectors = [
        'button:has-text("Sign out")',
        'button:has-text("Logout")',
        'button:has-text("Log out")',
        'a:has-text("Sign out")',
        'a:has-text("Logout")',
      ];

      let signoutFound = false;
      for (const selector of signoutSelectors) {
        try {
          const btn = await page.locator(selector).first();
          if (await btn.isVisible({ timeout: 1000 })) {
            console.log(`   ✅ Found signout button: ${selector}`);
            signoutFound = true;
            break;
          }
        } catch (e) {}
      }

      if (!signoutFound) {
        console.log('   ℹ️  Signout button not immediately visible (may be in menu)');
      }

    } else {
      console.log('   ❌ Login failed');
      results.login = 'fail';
    }

    // =====================================================
    // SUMMARY
    // =====================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`\n   Signup: ${results.signup === 'pass' ? '✅ PASS' : results.signup === 'exists' ? '⚠️ USER EXISTS' : '❌ FAIL'}`);
    console.log(`   Login:  ${results.login === 'pass' ? '✅ PASS' : '❌ FAIL'}`);
    console.log('\n📸 Screenshots saved to tests/auth/screenshots/test-real-*.png');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/test-real-error.png`, fullPage: true });
  } finally {
    await context.close();
    await browser.close();
  }
})();
