# Contributing

## Commit Convention

Format: `type: description`

Types: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `ci:`

## Development Workflow

1. Edit files in `src/`
2. `npm run build`
3. `npm test`
4. Commit with conventional commit prefix

## Common Tasks

**Add new configuration option:**
1. Add to `src/constants.ts` and `src/types.ts`
2. Update `ContinuousCarousel` constructor
3. Implement logic in relevant module
4. Add tests
5. Update README
6. Add example in `docs/examples/advanced.md`

**Fix bug:**
1. Write failing test
2. Fix in `src/`
3. Verify test passes
4. Commit with `fix:` prefix

**Add docs example page:**
1. Create markdown in `docs/examples/`
2. Use `<CarouselDemo>` Vue component for live demos
3. Add link in `docs/.vitepress/config.mjs` sidebar
4. Commit with `docs:` prefix
