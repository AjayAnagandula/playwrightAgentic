# Test Plan: SCRUM-101 Checkout Process

## Scope

Validate the SauceDemo checkout journey from an authenticated customer adding products to the cart through order confirmation.

- Application: `https://www.saucedemo.com`
- Role: authenticated customer
- Browsers: Chromium, Firefox, WebKit
- Primary data: `standard_user` / `secret_sauce`
- Automation location: `e2e/scrum-101-checkout.spec.ts`

## Traceability

| ID | Scenario | Type | Expected result |
|---|---|---|---|
| AC1-01 | Add products and open cart | Automated | Items, descriptions, prices, quantities, and navigation controls are visible |
| AC1-02 | Verify cart total calculation | Automated expected failure | Cart should display a total calculation |
| AC2-01 | Open checkout information | Automated | First name, last name, and ZIP fields are visible |
| AC2-02 | Submit empty checkout form | Automated | Required-field error is displayed and user remains on the form |
| AC2-03 | Submit valid checkout information | Automated | User reaches checkout overview |
| AC3-01 | Verify overview details and totals | Automated | Items, payment, shipping, subtotal, tax, and total are correct |
| AC3-02 | Cancel checkout | Exploratory + automated flow | User returns to products/cart without completing the order |
| AC4-01 | Finish a valid order | Automated | Confirmation message and Back Home control are visible |
| AC4-02 | Verify cart is cleared after order | Automated | Cart is empty after completion |
| AC5-01 | Submit invalid checkout data | Automated expected failure | Invalid data should be rejected with validation feedback |
| BR-01 | Checkout requires authentication | Exploratory | Unauthenticated access does not permit checkout |
| BR-02 | Empty cart cannot proceed to checkout | Exploratory | Checkout cannot be completed with no products |
| TECH-01 | Responsive checkout layout | Exploratory | Key controls remain usable on mobile viewport |

## Entry criteria

- Application is reachable.
- Test credentials are available.
- Playwright dependencies and browsers are installed.

## Exit criteria

- All non-defect scenarios pass in the configured browser matrix.
- Expected failures are linked to reproducible product defects.
- A final QA report records results, risks, and blockers.
