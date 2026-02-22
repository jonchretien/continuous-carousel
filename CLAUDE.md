# Claude Code Context

Lightweight vanilla JS carousel library with CSS animations supporting horizontal/vertical scrolling.

## Commands

```bash
npm run build       # Build JS (Rolldown) + CSS (PostCSS)
npm run build:js    # JS only
npm run build:css   # CSS only
npm test            # Vitest
npm run dev         # Watch mode
npm run docs:dev    # VitePress dev server
```

## Key Constraints

- Don't break the factory function call syntax: `ContinuousCarousel('id', options)`
- No `new` keyword — factory function pattern

## Detail Docs

- [Architecture](.claude/docs/ARCHITECTURE.md) — source structure, build system, deployment
- [Code Style](.claude/docs/CODE_STYLE.md) — early returns, flat control flow
- [Contributing](.claude/docs/CONTRIBUTING.md) — commit convention, workflow, common tasks
- [Testing](.claude/docs/TESTING.md) — Vitest setup and patterns
