# Tests

## Audit Engine Tests

File: `app/lib/audit-engine.test.ts`

### How to run

    npx jest app/lib/audit-engine.test.ts

### Test coverage

1. **Returns zero savings for optimal single-seat Pro plan** — verifies that a single user on Cursor Pro gets "No change needed" with zero savings

2. **Recommends downgrade when Team plan used for 2 users** — verifies that Claude Team with only 2 seats triggers a downgrade recommendation with savings > 0

3. **Flags high spend for Credex referral when over $500/mo** — verifies that spending over $500/mo on Claude triggers a Credex referral recommendation

4. **Calculates annual savings as 12x monthly savings** — verifies the math: totalAnnualSavings === totalMonthlySavings * 12

5. **Handles multiple tools and sums savings correctly** — verifies that with multiple tools, totalMonthlySavings equals the sum of all individual tool savings