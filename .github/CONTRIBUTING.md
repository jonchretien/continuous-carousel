# Contributing

Thanks for your interest in contributing to Continuous Carousel!

## Setup

```bash
git clone https://github.com/jonchretien/continuous-carousel.git
cd continuous-carousel
npm ci
```

## Development

```bash
npm run dev       # Watch mode
npm run build     # Full build
npm test          # Run tests
npm run docs:dev  # Local docs site
```

## Commit Convention

Format: `type: description`

| Type | Use |
|------|-----|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code refactoring |
| `docs:` | Documentation |
| `test:` | Test updates |
| `chore:` | Tooling, deps |
| `ci:` | CI/CD changes |

Examples:
- `feat: add pause on hover option`
- `fix: vertical carousel spacing issue`

## Pull Requests

1. Fork the repo and create a feature branch
2. Make your changes in `src/`
3. Add/update tests as needed
4. Run `npm test` and `npm run lint`
5. Submit a PR with a clear description
