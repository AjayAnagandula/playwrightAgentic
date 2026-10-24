# Exploratory Testing: SCRUM-101

Date: 2026-10-24
Application: `https://www.saucedemo.com`

## Session results

| Area | Result | Evidence / observation |
|---|---|---|
| Login | Pass | `standard_user` successfully reached `/inventory.html` |
| Cart review | Pass | Backpack and Bike Light showed quantity, descriptions, prices, Continue Shopping, and Checkout |
| Empty checkout form | Pass | Continue showed `Error: First Name is required` and remained on checkout information |
| Valid checkout data | Pass | Valid data reached checkout overview |
| Overview totals | Pass | Item total, tax, total, payment, and shipping were displayed |
| Order completion | Pass | Confirmation page displayed success message and Back Home |
| Cart cleanup | Pass | Confirmation page showed `Cart, empty` |
| Cancel from overview | Pass | Cancel returned to the products page without completing the order |
| Invalid special characters | Fail | `@@@`, `###`, and `abc` were accepted and reached overview |
| Cart total on cart page | Fail | Cart showed item prices but no total calculation |

## Defects

### DEF-SCRUM-101-001 — Invalid checkout data is accepted

- Severity: Medium
- Related requirement: AC5
- Steps: Login, add a product, open Checkout, enter `@@@` as first name, `###` as last name, and `abc` as ZIP, then select Continue.
- Expected: Validation errors are displayed and the user cannot proceed.
- Actual: The application proceeds to checkout overview.

### DEF-SCRUM-101-002 — Cart page does not display a total calculation

- Severity: Medium
- Related requirement: AC1
- Steps: Login, add one or more products, open the cart.
- Expected: A total price calculation is displayed.
- Actual: Product quantities, descriptions, and individual prices are displayed, but no cart total is present.

## Exploratory limitations

- Mobile viewport and unauthenticated direct-navigation checks still require a dedicated automated or browser session.
- Browser console reported intermittent 401 resource errors during navigation; the tested user journey still completed.
