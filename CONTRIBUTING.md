# Contributing to JobShield

Thank you for considering contributing to JobShield! We welcome all contributions — bug fixes, new features, documentation improvements, and more.

## Getting Started

1. **Fork** the repository and clone your fork:
   ```bash
   git clone https://github.com/your-username/jobshield.git
   cd jobshield
   ```

2. **Install dependencies** for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Set up environment variables** by copying `.env.example` to `.env` and filling in your values.

## Branching Strategy

- `main` — production-ready code only
- `dev` — integration branch; merge features here first
- `feat/<feature-name>` — new features
- `fix/<bug-name>` — bug fixes
- `docs/<topic>` — documentation updates

## Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructure without behaviour change |
| `a11y` | Accessibility improvements |
| `test` | Adding or updating tests |
| `chore` | Tooling, dependencies |

**Example:** `feat(Scanner): add URL scanner tab`

## Pull Request Guidelines

- Keep PRs focused — one logical change per PR.
- Write a clear description explaining **what** changed and **why**.
- Reference any related issues with `Closes #<issue-number>`.
- Ensure your code passes linting before submitting.

## Code Style

- **Frontend**: Follow React best practices. Use functional components and hooks.
- **Backend**: Follow Express.js conventions. Keep controllers thin — business logic belongs in services.
- Avoid `console.log` in production code; use proper error handling.

## Reporting Issues

Use [GitHub Issues](../../issues) to report bugs or request features. Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser/Node version if relevant

---

We appreciate every contribution, big or small. Thank you! 🙏
