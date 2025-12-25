#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

async function createWebAppTemplate(projectName, options) {
  const targetDir = options.directory || projectName;
  const fullPath = path.resolve(process.cwd(), targetDir);

  console.log(chalk.blue(`🚀 Creating webapp template: ${projectName}`));
  
  // Create project directory
  const spinner = ora('Creating project directory...').start();
  await fs.ensureDir(fullPath);
  spinner.succeed('Project directory created');

  // Create folder structure
  spinner.start('Creating folder structure...');
  const folders = [
    'src/assets/icons',
    'src/assets/images', 
    'src/services',
    'src/components/ui',
    'src/context',
    'src/hooks',
    'src/pages',
    'src/stores',
    'src/utils',
    'src/types',
    'src/router',
    'src/i18n/locales',
    'public'
  ];

  for (const folder of folders) {
    await fs.ensureDir(path.join(fullPath, folder));
  }
  spinner.succeed('Folder structure created');

  // Copy template files
  spinner.start('Setting up project files...');
  await copyTemplateFiles(fullPath, projectName);
  spinner.succeed('Project files created');

  // Install dependencies
  spinner.start('Installing dependencies...');
  process.chdir(fullPath);
  
  try {
    execSync('npm install', { stdio: 'inherit' });
    spinner.succeed('Dependencies installed');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    throw error;
  }

  // Setup additional tools
  spinner.start('Setting up Tailwind CSS...');
  try {
    execSync('npx tailwindcss init -p', { stdio: 'inherit' });
    spinner.succeed('Tailwind CSS configured');
  } catch (error) {
    spinner.warn('Could not auto-configure Tailwind (config files already exist)');
  }

  console.log(chalk.green('✨ Project created successfully!'));
  console.log(chalk.blue(`📁 Project location: ${fullPath}`));
  console.log(chalk.yellow('🏃 Next steps:'));
  console.log(chalk.gray(`  cd ${targetDir}`));
  console.log(chalk.gray('  npm run dev'));
}

async function copyTemplateFiles(targetPath, projectName) {
  const templatePath = path.join(__dirname, '../templates');
  
  // Create package.json
  const packageJson = {
    name: projectName,
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc && vite build",
      lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      preview: "vite preview",
      "lint:fix": "eslint . --ext ts,tsx --fix",
      "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.20.1",
      zustand: "^4.4.7",
      zod: "^3.22.4",
      "react-i18next": "^13.5.0",
      i18next: "^23.7.6",
      "i18next-browser-languagedetector": "^7.2.0",
      "lucide-react": "^0.294.0",
      clsx: "^2.0.0",
      "tailwind-merge": "^2.2.0"
    },
    devDependencies: {
      "@types/react": "^18.2.43",
      "@types/react-dom": "^18.2.17",
      "@typescript-eslint/eslint-plugin": "^6.14.0",
      "@typescript-eslint/parser": "^6.14.0",
      "@vitejs/plugin-react": "^4.2.1",
      autoprefixer: "^10.4.16",
      eslint: "^8.55.0",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.5",
      postcss: "^8.4.32",
      prettier: "^3.1.1",
      "tailwindcss": "^3.3.6",
      typescript: "^5.2.2",
      vite: "^5.0.8"
    }
  };

  await fs.writeJSON(path.join(targetPath, 'package.json'), packageJson, { spaces: 2 });

  // Copy all other template files
  const files = [
    'vite.config.ts',
    'tsconfig.json',
    'tsconfig.node.json',
    'tailwind.config.js',
    'postcss.config.js',
    '.eslintrc.js',
    '.prettierrc',
    '.gitignore',
    '.env',
    'README.md',
    'index.html',
    'src/main.tsx',
    'src/App.tsx',
    'src/index.css',
    'src/vite-env.d.ts',
    'src/utils/cn.ts',
    'src/stores/appStore.ts',
    'src/types/index.ts',
    'src/hooks/useAppStore.ts',
    'src/context/AppContext.tsx',
    'src/services/api.ts',
    'src/components/ui/Button.tsx',
    'src/components/Layout.tsx',
    'src/pages/Home.tsx',
    'src/pages/About.tsx',
    'src/router/index.tsx',
    'src/i18n/index.ts',
    'src/i18n/locales/en.json',
    'src/i18n/locales/es.json',
    'public/vite.svg'
  ];

  for (const file of files) {
    const sourcePath = path.join(templatePath, file);
    const targetFilePath = path.join(targetPath, file);
    
    // Ensure directory exists
    await fs.ensureDir(path.dirname(targetFilePath));
    
    if (await fs.pathExists(sourcePath)) {
      await fs.copy(sourcePath, targetFilePath);
    } else {
      // Create the file with content based on the template
      await createTemplateFile(targetFilePath, file, projectName);
    }
  }
}

async function createTemplateFile(filePath, fileName, projectName) {
  const content = getTemplateContent(fileName, projectName);
  if (content) {
    await fs.writeFile(filePath, content, 'utf-8');
  }
}

function getTemplateContent(fileName, projectName) {
  switch (fileName) {
    case 'index.html':
      return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

    case 'vite.config.ts':
      return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`;

    case 'tsconfig.json':
      return `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

    case 'tsconfig.node.json':
      return `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`;

    case 'tailwind.config.js':
      return `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}`;

    case 'postcss.config.js':
      return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    case '.eslintrc.js':
      return `module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'prefer-const': 'warn',
  },
}`;

    case '.prettierrc':
      return `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}`;

    case '.gitignore':
      return `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Temporary files
.tmp
.temp`;

    case '.env':
      return `VITE_APP_NAME=${projectName}
VITE_API_URL=http://localhost:3001
`;

    case 'README.md':
      return `# ${projectName}

A modern React TypeScript web application scaffolded with webapp-template-cli.

## Features

- ⚛️ React 18 with TypeScript
- ⚡ Vite for fast development and building
- 🎨 Tailwind CSS for styling
- 🗂️ Zustand for state management
- 🧭 React Router for navigation
- 🌍 Internationalization with react-i18next
- 📏 ESLint and Prettier for code quality
- 🔍 Zod for schema validation
- 🎯 Path mapping for clean imports

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
\`\`\`

## Project Structure

\`\`\`
src/
├── assets/          # Static assets
│   ├── icons/       # Icon files
│   └── images/      # Image files
├── components/      # Reusable components
│   └── ui/          # UI component library
├── context/         # React contexts
├── hooks/           # Custom hooks
├── i18n/            # Internationalization
│   └── locales/     # Translation files
├── pages/           # Page components
├── router/          # Router configuration
├── services/        # API services
├── stores/          # Zustand stores
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint
- \`npm run lint:fix\` - Fix ESLint issues
- \`npm run format\` - Format code with Prettier

## Environment Variables

Copy \`.env\` and modify as needed:

\`\`\`env
VITE_APP_NAME=${projectName}
VITE_API_URL=http://localhost:3001
\`\`\`
`;

    default:
      return null;
  }
}

program
  .name('create-webapp-template')
  .description('Create a modern React TypeScript web application')
  .version('1.0.0');

program
  .argument('<project-name>', 'Name of the project')
  .option('-d, --directory <directory>', 'Target directory (defaults to project name)')
  .action(async (projectName, options) => {
    try {
      await createWebAppTemplate(projectName, { ...options, name: projectName });
    } catch (error) {
      console.error(chalk.red('Error creating project:'), error);
      process.exit(1);
    }
  });

program.parse();