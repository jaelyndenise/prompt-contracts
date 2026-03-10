# Are You Vibe Coding? 10 Signs (and How to Fix Each One)

Vibe coding: the practice of prompting an AI with vibes instead
of specifications, then crossing your fingers and hoping the output
doesn't catch fire in production.

If any of these sound familiar, you're vibe coding.

## 1. Your prompt starts with "Build me a..."

**The vibe:** "Build me a login page"

**The fix:** A login page for what? With which auth provider?
What happens on failure? Where does the user go after login?
What loading state do they see? What if they're already logged in?

A prompt contract answers all of these before Claude writes
a single line.

## 2. You iterate more than twice

**The vibe:** "Actually, can you also add..." → "Wait, that
broke the..." → "No, I meant..." → "OK let's start over"

**The fix:** If you're past iteration two, the problem isn't
the AI. The problem is the spec. Stop iterating. Write a
contract. Get it right in one shot.

Claude Code is not slow. Your specification is incomplete.

## 3. You accept code you don't fully understand

**The vibe:** "I don't know what this middleware does but it works"

**The fix:** If you can't explain every section of the output,
your contract was too vague. A good contract produces code where
every line traces back to a constraint or edge case you specified.

Code you don't understand is code you can't debug.

## 4. Claude installed packages you didn't ask for

**The vibe:** `npm install lodash moment axios` — none of which
were in your requirements.

**The fix:** Add to Constraints: "MUST NOT install new dependencies.
Use only: [list your actual stack]."

Every uninvited package is a dependency you'll maintain forever.

## 5. There's no loading state

**The vibe:** The data appears instantly in development because
your database is local. In production, users see a white flash
for 800ms.

**The fix:** Add to Edge Cases: "Data is loading: show skeleton
loader. Data is undefined but not loading: show placeholder."
Add to Acceptance Criteria: "No layout shift between loading
and loaded states."

Claude Code almost never generates loading states unless you
explicitly ask. It defaults to assuming data is always available.

## 6. You have no idea what happens with bad input

**The vibe:** "It works with the sample data" — and you've never
tested an empty string, a zero, a null, a 50,000-character input,
or a duplicate.

**The fix:** The Edge Cases section exists for exactly this. List
every ugly input you can imagine. Be the attacker. Be the user
who puts `javascript:alert(1)` in the URL field.

## 7. Your error handling is `catch (e) { console.log(e) }`

**The vibe:** Errors get logged. Nobody reads the logs. The app
fails silently. Users see a blank page. You find out three days later.

**The fix:** Add to Constraints: "MUST return structured error
responses. MUST NOT expose internal errors to clients." Add to
Edge Cases: "API call fails: [specific behavior]. Database
unreachable: [specific behavior]."

## 8. You test in production

**The vibe:** "It worked on localhost" → deploy → break → hotfix →
deploy → break differently → hotfix → deploy → give up → roll back

**The fix:** Acceptance Criteria should be binary conditions you
can verify before deploying. If you can't test it locally, you
can't deploy it safely.

## 9. The code works but you don't know why

**The vibe:** You asked Claude to fix a bug. It changed 47 lines
across 6 files. The bug is gone. You have no idea what 40 of those
lines do. You merge it.

**The fix:** A prompt contract scopes the change. "MUST modify
only [file]. MUST NOT change [other files]." When the output
matches the contract, you know exactly what changed and why.

## 10. You've said "Claude will figure it out"

**The vibe:** Trusting the AI to make architectural decisions,
choose your database schema, decide your auth flow, pick your
state management pattern.

**The fix:** Claude won't "figure it out." Claude will produce
something plausible. Plausible is not correct. Plausible is the
uncanny valley of code — close enough to look right, wrong enough
to break at scale.

You decide. You specify. Claude executes. That's the deal.

## The Pattern

Every item on this list has the same root cause: **underspecification**.

The prompt contract is the fix. Five sections. Takes 5-15 minutes
to write. Saves hours of iteration, debugging, and "why does this
break in production?"

**[Get the cheatsheet](prompt-contract-cheatsheet.md)** — the full
five-section format on one page.

**[Grab a template](../templates/)** — copy, fill in, ship.

---

From *[Prompt Contracts](https://www.amazon.com/dp/PLACEHOLDER)* —
Chapter 1 covers the full framework. Chapter 4 walks through a
complete SaaS build using nothing but contracts.
