# Publishing Instructions for webapp-template-cli

## Before Publishing

1. **Test the CLI locally**:
   ```bash
   npm test
   ```

2. **Update package.json metadata**:
   - Change `author` from "Your Name" to your actual name
   - Update `version` if needed
   - Add `repository`, `homepage`, and `bugs` URLs if publishing to GitHub

3. **Verify all template files are included**:
   ```bash
   npm run test:cli
   ```

## Publishing to NPM

1. **Login to NPM** (if not already logged in):
   ```bash
   npm login
   ```

2. **Publish the package**:
   ```bash
   npm publish
   ```

## Usage After Publishing

Users can then use your CLI in these ways:

### Global Installation
```bash
npm install -g webapp-template-cli
create-webapp-template my-app
```

### One-time Usage
```bash
npx webapp-template-cli my-app
```

## Local Development

To test the CLI locally without publishing:

```bash
# Install dependencies
npm install

# Test the CLI
npm test

# Create a test project
node src/index.js my-test-app

# Test the generated project
cd my-test-app
npm install
npm run dev
```

## Package Contents

The published package includes:
- `src/index.js` - Main CLI script
- `bin/create-webapp-template.js` - Binary entry point
- `templates/` - All template files for the generated project
- `package.json` - Package configuration
- `README.md` - Documentation

## Generated Project Features

Each generated project includes:
- React 18 + TypeScript
- Vite for development
- Tailwind CSS with shadcn/ui-ready config
- Zustand for state management
- React Router with declarative config
- i18next for internationalization
- ESLint + Prettier
- Zod for validation
- Complete folder structure
- Environment variables setup
- Git ignore rules

## Troubleshooting

If users report issues with dependency installation:
1. Ensure they have Node.js 16+ installed
2. Try clearing npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`