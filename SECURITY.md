# Security Policy

## Supported versions

GradientCraft is a client-side static tool with no backend and no user accounts. Security fixes land on the latest `main`; there are no maintained release branches.

## Reporting a vulnerability

Please **do not** open a public issue for a security problem.

Instead, use GitHub's private vulnerability reporting:
**Security → Report a vulnerability** on the repository, or open a [private security advisory](https://github.com/Nandhu125/gradient-craft/security/advisories/new).

Include steps to reproduce and the affected browser/version. You can expect an initial response within a few days.

## Scope

The app runs entirely in the browser and exports plain CSS. The most relevant surfaces are:

- The `?s=` share token and `?template=` param decoded in `src/lib/studio-share.ts` (untrusted input parsed into Studio state).
- SVG data URIs generated for noise and pattern layers in `src/lib/studio-css.ts`.

Reports about these are especially welcome.
