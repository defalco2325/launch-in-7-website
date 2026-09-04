---
name: Database timing tests
description: Timing constraint for smoke tests that coordinate through the project's remote database.
---

Use realistic expiry windows when smoke-testing behavior coordinated through the remote database. Millisecond-scale windows are not reliable for multi-query assertions.

**Why:** Network round trips can outlast an artificially tiny window, making a later request correctly start a new window while the test incorrectly treats it as part of the old one.

**How to apply:** Keep deterministic expiry unit tests on an injected clock. For database-backed smoke checks, use a window comfortably longer than several query round trips, then wait for that window before asserting expiry.