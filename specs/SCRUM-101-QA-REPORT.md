# QA Report: SCRUM-101 Checkout Process

## Decision

**FAIL —** The main checkout journey passes in all configured browsers, but two acceptance-criteria gaps remain open:

1. The cart page does not display a total calculation.
2. Invalid checkout values are accepted instead of being rejected.

## Scope

- Application: `https://www.saucedemo.com`
- User story: `user-stories/SCRUM-101.md`
- Test plan: `specs/SCRUM-101-TEST-PLAN.md`
- Exploratory notes: `specs/SCRUM-101-EXPLORATORY-TESTING.md`
- Automation: `e2e/scrum-101-checkout.spec.ts`
- Browsers: Chromium, Firefox, WebKit
- Credentials: SauceDemo `standard_user` test account; secret values were not included in this report.

## Work completed

- Read and analyzed the user story and acceptance criteria.
- Created a traceable test plan.
- Performed exploratory testing of login, cart, checkout, validation, cancellation, order completion, and cart cleanup.
- Created Playwright automation for the checkout flow.
- Fixed an automation locator issue caused by SauceDemo using `data-test` instead of Playwright's default `data-testid` attribute.
- Executed the focused suite across Chromium, Firefox, and WebKit.

## Test execution

Command:

```text
npx.cmd playwright test e2e/scrum-101-checkout.spec.ts --workers=1 --reporter=line
```

Result:

```text
18 passed (59.9s)
```

The six story scenarios ran once per browser. The two tests for known product gaps use Playwright expected-failure handling; they passed because the application currently demonstrates the documented defects.

## Coverage summary

| Area | Result |
|---|---|
| Login and authenticated access | Pass |
| Cart items, descriptions, prices, and navigation | Pass |
| Cart total calculation | Fail — DEF-SCRUM-101-002 |
| Required checkout fields | Pass |
| Valid checkout information | Pass |
| Order overview and totals | Pass |
| Cancel checkout | Pass during exploratory testing |
| Order confirmation | Pass |
| Cart cleared after order | Pass |
| Invalid checkout data | Fail — DEF-SCRUM-101-001 |

## Defects

### DEF-SCRUM-101-001 — Invalid checkout data is accepted

- Severity: Medium
- Requirement: AC5
- Reproduction: Enter `@@@` for first name, `###` for last name, and `abc` for ZIP, then continue.
- Expected: Validation errors are displayed and the user remains on the information page.
- Actual: The application proceeds to checkout overview.

### DEF-SCRUM-101-002 — Cart page has no total calculation

- Severity: Medium
- Requirement: AC1
- Reproduction: Login, add a product, and open the cart.
- Expected: A total price calculation is displayed.
- Actual: Individual product prices are shown, but no cart total is displayed.

## Evidence

- HTML report: `playwright-report/`
- Failure/test artifacts: `test-results/`
- Exploratory evidence and observations: `specs/SCRUM-101-EXPLORATORY-TESTING.md`

## Risks and limitations

- Mobile viewport testing was not automated in this run.
- Direct unauthenticated checkout and empty-cart navigation remain exploratory follow-ups.
- Browser console showed intermittent 401 resource errors during exploratory navigation, although the tested flows completed.
- The project directory is not currently a Git repository, so no commit could be created.

## Commit status

Blocked: `git status` reports that the project folder is not a Git repository. No repository was initialized automatically, and no commit was created.
