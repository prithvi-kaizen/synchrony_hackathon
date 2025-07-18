# Contributing to Next.js 15 + Supabase Starter 2025

Thank you for considering contributing to this project! We welcome contributions from everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what behavior you expected
- Include screenshots if helpful
- Include your environment details (OS, browser, Node.js version)

### Suggesting Features

Feature suggestions are welcome! Please:

- Use a clear and descriptive title
- Provide a detailed description of the suggested feature
- Explain why this feature would be useful
- Consider the scope - keep it focused and achievable

### Contributing Code

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** following our style guidelines
4. **Add tests** for any new functionality
5. **Ensure all tests pass**: `npm test`
6. **Run linting**: `npm run lint`
7. **Run type checking**: `npm run typecheck`
8. **Test the build**: `npm run build`
9. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/nextjs-supabase-2025-starter.git
cd nextjs-supabase-2025-starter

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript checks
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Pull Request Process

1. **Follow the branch naming convention**:
   - `feature/description` for new features
   - `fix/description` for bug fixes
   - `docs/description` for documentation
   - `refactor/description` for refactoring

2. **Update documentation** if needed

3. **Ensure CI passes** - all tests, linting, and type checking must pass

4. **Fill out the PR template** completely

5. **Request review** from maintainers

6. **Address feedback** promptly and professionally

### PR Guidelines

- Keep PRs focused and atomic (one feature/fix per PR)
- Write clear, descriptive commit messages
- Include tests for new functionality
- Update documentation as needed
- Ensure backward compatibility unless it's a breaking change
- Add screenshots for UI changes

## Style Guidelines

### Code Style

- **TypeScript**: Use strict type checking
- **ESLint**: Follow the configured rules
- **Prettier**: Code formatting is handled automatically
- **File naming**: Use kebab-case for files, PascalCase for components
- **Imports**: Use absolute imports with the `@/` alias

### Component Guidelines

- Use functional components with hooks
- Export components as default exports
- Use `'use client'` directive for client components
- Include proper TypeScript interfaces
- Follow the existing component structure

### Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
- `feat(components): add dark mode toggle`
- `fix(auth): resolve login redirect issue`
- `docs(readme): update installation instructions`

### CSS Guidelines

- Use Tailwind CSS utility classes
- Follow the design system variables in `globals.css`
- Use responsive design principles (mobile-first)
- Maintain consistent spacing and typography

## Testing

- Write unit tests for utility functions
- Write integration tests for components
- Test responsive design across devices
- Test dark/light mode functionality
- Ensure accessibility standards are met

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update component documentation
- Include examples for new features

## Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Participate in discussions constructively

## Questions?

If you have questions about contributing, please:

1. Check existing issues and discussions
2. Create a new discussion for general questions
3. Create an issue for bug reports or feature requests
4. Reach out to maintainers for urgent matters

## Recognition

Contributors will be recognized in the project's README and releases. We appreciate all forms of contribution, from code to documentation to testing!

Thank you for contributing! 🚀