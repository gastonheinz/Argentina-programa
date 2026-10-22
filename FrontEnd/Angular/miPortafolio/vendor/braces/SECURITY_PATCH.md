# Local security backport

Source: braces 3.0.3 from npm (MIT license retained). Local version 3.0.3-security.0, not an upstream release.

GHSA-vfj7-8cjw-p6xm / CVE-2026-93687 has no published fix as of 2026-10-22. The parser now limits its stack to 64 levels before recursive cleanup. All AST walkers validate depth, cycles and node count iteratively, including callers supplying an AST directly. Normal patterns retain the upstream implementation. Extremely deep glob patterns are intentionally rejected with SyntaxError instead of crashing the process with RangeError.

The root npm override directs every transitive braces dependency to this checked-in package; no postinstall script is required. Run `npm run test:security` after `npm ci`. Replace the backport with an upstream fixed release when available and keep the regression test.
