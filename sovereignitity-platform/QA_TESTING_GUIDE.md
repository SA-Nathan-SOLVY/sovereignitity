# QA Testing Guide for SOVEREIGNITITY™ Platform
**For: Sean Marlon McDaniel II - QA Lead & SCRUM Specialist**

---

## 🎯 Purpose
This guide provides structured testing protocols for the SOVEREIGNITITY™ platform. As a SCRUM-certified QA professional, you'll use this to understand what to test, how to test it, and what to look for when validating platform functionality.

---

## 📋 Testing Checklist Overview

### 1. **Navigation & Routing Tests**
### 2. **UI/UX Component Tests**
### 3. **Form & Input Validation Tests**
### 4. **Integration Tests**
### 5. **Performance Tests**
### 6. **Security & Data Protection Tests**
### 7. **Mobile Responsiveness Tests**

---

## 1. Navigation & Routing Tests

### User Story
> **As a user**, I want to navigate seamlessly between all pages without broken links or errors, so that I can access all platform features easily.

### Test Cases

#### TC-NAV-001: Main Navigation Bar
**Objective:** Verify all navigation links work correctly

**Steps:**
1. Load homepage (https://solvy.chain)
2. Click each navigation item:
   - Home
   - AI Tax Assistant
   - Financial (dropdown)
   - Evergreen Beauty Lounge
   - Reign Products
   - SOLVY Debit Card
   - About
   - Marketing
3. Verify each page loads without errors
4. Check "Back to Home" button on subpages

**Expected Results:**
- ✅ All links navigate to correct pages
- ✅ No 404 errors
- ✅ Back button returns to homepage
- ✅ Active page highlighted in navigation

**What to Look For:**
- Broken links (404 errors)
- Slow page loads (>3 seconds)
- Navigation highlighting not updating
- Back button not working

---

#### TC-NAV-002: Financial Dropdown Menu
**Objective:** Verify dropdown menu functionality

**Steps:**
1. Click "Financial" in navigation
2. Verify dropdown appears with all items:
   - SOLVY Debit Card
   - DECIDEY NGO
   - IBC/BYOB Banking
   - LIFE/MOLI Program
   - Global Remittance
3. Click each item
4. Verify correct page loads

**Expected Results:**
- ✅ Dropdown opens on click
- ✅ All menu items visible
- ✅ Each item navigates correctly
- ✅ Dropdown closes after selection

---

#### TC-NAV-003: Internal Page Routing
**Objective:** Verify internal routing between pages

**Steps:**
1. Navigate to EBL page
2. Click "Back to Home"
3. Navigate to SOLVY Card page
4. Click "Back to Home"
5. Repeat for all internal pages

**Expected Results:**
- ✅ Green "Back to Home" button visible on all pages
- ✅ Button returns to homepage
- ✅ No page refresh (smooth navigation)

---

## 2. UI/UX Component Tests

### User Story
> **As a user**, I want all buttons and interactive elements to be clearly visible and functional, so that I can interact with the platform confidently.

### Test Cases

#### TC-UI-001: Button Styling & States
**Objective:** Verify all buttons have correct styling

**Steps:**
1. Identify all buttons on homepage:
   - Sign In (green)
   - Get Started (purple)
   - Join the Parallel Economy (purple)
   - Learn More (green)
   - Previous/Next in presentation slider (green)
2. Check each button for:
   - Correct color (green for active/live, purple for primary actions)
   - Hover effect
   - Disabled state (if applicable)
   - Click response

**Expected Results:**
- ✅ All buttons have consistent styling
- ✅ Green buttons: `bg-green-600 hover:bg-green-700`
- ✅ Purple buttons: `bg-purple-600 hover:bg-purple-700`
- ✅ Disabled buttons are grayed out and non-clickable
- ✅ Hover effects work smoothly

**What to Look For:**
- White or unstyled buttons (should be green or purple)
- Buttons that don't respond to clicks
- Missing hover effects
- Inconsistent sizing

---

#### TC-UI-002: Logo Display
**Objective:** Verify logos display correctly

**Steps:**
1. Check SOLVY logo in navigation (top-left)
2. Navigate to EBL page
3. Verify EBL logo displays at top
4. Check logo sizing and clarity

**Expected Results:**
- ✅ SOLVY logo: 40px height, clear and visible
- ✅ EBL logo: 160px (40x40 container), no white spacing, edge-to-edge
- ✅ Both logos load quickly (<1 second)
- ✅ No broken image icons

**What to Look For:**
- Broken images (alt text showing)
- Blurry or pixelated logos
- White spacing around EBL logo
- Logo not centered

---

#### TC-UI-003: Video Player (SOLVY Card Page)
**Objective:** Verify video displays and plays correctly

**Steps:**
1. Navigate to SOLVY Card page
2. Locate video section with headline: "See Your SOLVY Card in Action"
3. Verify video player loads
4. Click play button
5. Test video controls (pause, volume, fullscreen)

**Expected Results:**
- ✅ Video player visible with controls
- ✅ Headline and description display above video
- ✅ Video plays when clicked
- ✅ All controls functional
- ✅ Video quality is clear

**What to Look For:**
- Video not loading (blank player)
- Missing controls
- Audio/video sync issues
- Poor video quality

---

## 3. Form & Input Validation Tests

### User Story
> **As a user**, I want to enroll in SOLVY with clear guidance and validation, so that I can complete the process without errors.

### Test Cases

#### TC-FORM-001: Enrollment Form - Step 1 (Personal Info)
**Objective:** Verify personal information validation

**Steps:**
1. Click "Get Started" button
2. Enrollment form modal opens
3. Test Step 1 fields:
   - Full Name (required)
   - Email (required, valid format)
   - Referral Source (required)
4. Try to proceed without filling fields
5. Fill fields correctly and proceed

**Expected Results:**
- ✅ Required fields marked with asterisk or label
- ✅ Cannot proceed with empty fields
- ✅ Email validation (must contain @)
- ✅ Error messages display for invalid inputs
- ✅ "Next" button disabled until all fields valid

**What to Look For:**
- Form accepts invalid emails (test@test, test.com)
- No error messages for empty fields
- Can proceed without required fields
- Error messages unclear or missing

---

#### TC-FORM-002: Enrollment Form - Navigation
**Objective:** Verify form navigation between steps

**Steps:**
1. Complete Step 1, click "Next"
2. Verify Step 2 displays
3. Click "Previous" button
4. Verify return to Step 1
5. Complete all steps to Step 4

**Expected Results:**
- ✅ "Next" button advances to next step
- ✅ "Previous" button (green) returns to previous step
- ✅ Step indicator shows current step
- ✅ Form data persists when navigating back
- ✅ Final step shows "Submit" instead of "Next"

---

#### TC-FORM-003: EBL Payment Form
**Objective:** Verify payment form validation

**Steps:**
1. Navigate to EBL page
2. Scroll to payment section
3. Test form fields:
   - Location selection (radio buttons)
   - Amount input (numeric only)
   - Payment method (SOLVY Card vs Mobile Wallet)
4. Try to submit with empty fields
5. Fill correctly and verify button enables

**Expected Results:**
- ✅ Radio buttons work correctly
- ✅ Amount field accepts numbers only
- ✅ Dollar sign ($) displays in amount field
- ✅ Payment button disabled until all fields filled
- ✅ Button text updates based on payment method selection

---

## 4. Integration Tests

### User Story
> **As a user**, I want the platform to integrate seamlessly with external services, so that I can access all features without interruption.

### Test Cases

#### TC-INT-001: External Links
**Objective:** Verify external links open correctly

**Steps:**
1. Click "Reign Products" link
2. Verify opens https://ebl.jewelpads.com in new tab
3. Check IBC/BYOB Banking link in Financial dropdown
4. Check LIFE/MOLI Program link

**Expected Results:**
- ✅ Links open in new tab/window
- ✅ External sites load correctly
- ✅ No broken links
- ✅ User can return to SOVEREIGNITITY™ platform

---

#### TC-INT-002: AI Tax Assistant
**Objective:** Verify AI Tax Assistant functionality

**Steps:**
1. Click "AI Tax Assistant" in navigation
2. Verify tax assistant interface loads
3. Test scenario selection
4. Enter sample financial data
5. Submit for analysis

**Expected Results:**
- ✅ Tax assistant interface displays
- ✅ Scenario dropdown populated
- ✅ Can enter financial data
- ✅ Analysis returns results (or error message if API unavailable)

**What to Look For:**
- API connection errors
- Slow response times (>10 seconds)
- Unclear error messages
- Results not displaying

---

## 5. Performance Tests

### User Story
> **As a user**, I want the platform to load quickly and respond smoothly, so that I have a positive experience.

### Test Cases

#### TC-PERF-001: Page Load Times
**Objective:** Measure page load performance

**Steps:**
1. Use browser DevTools (F12 → Network tab)
2. Clear cache
3. Load homepage
4. Record load time
5. Repeat for all major pages

**Expected Results:**
- ✅ Homepage loads in <3 seconds
- ✅ Subpages load in <2 seconds
- ✅ Images load progressively
- ✅ No blocking resources

**Acceptable Thresholds:**
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.5s

---

#### TC-PERF-002: Video Loading
**Objective:** Verify video loads efficiently

**Steps:**
1. Navigate to SOLVY Card page
2. Monitor video load time
3. Check video file size
4. Test on different connection speeds (if possible)

**Expected Results:**
- ✅ Video starts loading immediately
- ✅ Poster image displays while loading
- ✅ Video playable within 5 seconds

---

## 6. Security & Data Protection Tests

### User Story
> **As a user**, I want my personal information protected, so that I can trust the platform with my data.

### Test Cases

#### TC-SEC-001: Form Data Handling
**Objective:** Verify sensitive data is handled securely

**Steps:**
1. Open enrollment form
2. Enter personal information
3. Open browser DevTools → Network tab
4. Submit form
5. Check if data is transmitted securely (HTTPS)

**Expected Results:**
- ✅ All requests use HTTPS (not HTTP)
- ✅ No sensitive data in URL parameters
- ✅ Form data encrypted in transit

**What to Look For:**
- HTTP warnings in browser
- Passwords or emails visible in URLs
- Mixed content warnings

---

#### TC-SEC-002: TDUI Protection Information
**Objective:** Verify TDUI protection information is accurate

**Steps:**
1. Navigate to About page
2. Scroll to "Ownership & Leadership" section
3. Verify TDUI protection notice displays
4. Check all three protected parties listed:
   - Sean Maurice Mayo
   - Evergreen P. Mayo
   - Sean Marlon McDaniel II

**Expected Results:**
- ✅ TDUI protection section visible
- ✅ All three names listed correctly
- ✅ Protection badges display (green, pink, blue)
- ✅ Description is clear and accurate

---

## 7. Mobile Responsiveness Tests

### User Story
> **As a mobile user**, I want the platform to work seamlessly on my device, so that I can access it anywhere.

### Test Cases

#### TC-MOB-001: Mobile Navigation
**Objective:** Verify navigation works on mobile devices

**Steps:**
1. Open site on mobile device (or use browser DevTools → Device Mode)
2. Test screen sizes: 375px (iPhone), 768px (tablet), 1024px (desktop)
3. Verify navigation menu
4. Test all navigation links

**Expected Results:**
- ✅ Navigation adapts to screen size
- ✅ Hamburger menu appears on mobile (<768px)
- ✅ All links accessible on mobile
- ✅ No horizontal scrolling

---

#### TC-MOB-002: Form Usability on Mobile
**Objective:** Verify forms are usable on mobile

**Steps:**
1. Open enrollment form on mobile
2. Test all input fields
3. Verify keyboard appears correctly
4. Check button sizes

**Expected Results:**
- ✅ Input fields large enough to tap (min 44x44px)
- ✅ Correct keyboard type (email keyboard for email field)
- ✅ Buttons easy to tap
- ✅ Form fits screen without zooming

---

## 📊 Test Reporting Template

### Bug Report Format
```markdown
**Bug ID:** BUG-[DATE]-[NUMBER]
**Severity:** Critical / High / Medium / Low
**Test Case:** TC-XXX-XXX
**Environment:** Browser, OS, Device

**Description:**
[Clear description of the issue]

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Screenshots/Videos:**
[Attach evidence]

**Additional Notes:**
[Any other relevant information]
```

### Severity Levels
- **Critical:** Platform unusable, data loss, security breach
- **High:** Major feature broken, significant user impact
- **Medium:** Feature partially broken, workaround available
- **Low:** Minor visual issue, typo, minimal impact

---

## 🔄 Testing Workflow (SCRUM)

### Sprint Testing Cycle
1. **Sprint Planning:** Review user stories and acceptance criteria
2. **Test Case Creation:** Write test cases for new features
3. **Execution:** Run tests on staging environment
4. **Bug Reporting:** Document and report issues
5. **Regression Testing:** Verify bug fixes don't break existing features
6. **Sprint Review:** Present testing results to team

### Daily Testing Routine
- **Morning:** Review new commits, check for breaking changes
- **Midday:** Execute test cases on updated features
- **Afternoon:** Document bugs, update test cases
- **End of Day:** Report status to team

---

## 🎓 Key Testing Principles

1. **Test Early, Test Often:** Don't wait until the end to test
2. **User-Centric:** Always think from the user's perspective
3. **Document Everything:** Clear documentation helps the team
4. **Communicate Clearly:** Report bugs with enough detail to reproduce
5. **Regression is Key:** Always verify old features still work after changes

---

## 📞 Escalation Path

**For Critical Bugs:**
1. Document immediately
2. Notify Sean Maurice Mayo (SA Nathan) directly
3. Create detailed bug report
4. Suggest workaround if possible

**For Questions:**
- Technical: Review this guide first
- Process: Refer to SCRUM framework
- Clarification: Ask SA Nathan

---

## ✅ Testing Checklist Summary

Before each release, verify:
- [ ] All navigation links work
- [ ] All buttons styled correctly (green/purple)
- [ ] Forms validate properly
- [ ] External links open correctly
- [ ] Mobile responsive on all devices
- [ ] Page load times acceptable
- [ ] No console errors
- [ ] TDUI information accurate
- [ ] Video plays correctly
- [ ] Logos display properly

---

**Document Version:** 1.0  
**Last Updated:** October 25, 2025  
**Maintained By:** Sean Maurice Mayo (SA Nathan)  
**For:** Sean Marlon McDaniel II - QA Lead & SCRUM Specialist

