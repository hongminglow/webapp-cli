# WebApp Template CLI

A powerful command-line tool to quickly scaffold modern React TypeScript web applications with all the latest tools and best practices pre-configured.

## 🚀 Features

This CLI tool generates a complete React TypeScript web application with:

- ⚛️ **React 18** with TypeScript
- ⚡ **Vite** for lightning-fast development and building
- 🎨 **Tailwind CSS 4** for styling (with shadcn/ui-ready configuration)
- 🗂️ **Zustand** for state management
- 🧭 **React Router** with declarative routing configuration
- 🌍 **i18next** for internationalization (English & Spanish included)
- 📏 **ESLint & Prettier** pre-configured for code quality
- 🔍 **Zod** for schema validation
- 🎯 **Path mapping** (@/\* aliases)
- 📁 **Organized folder structure** following best practices

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g @ming99/react-starter-template
```

### One-time Usage

```bash
npx @ming99/react-starter-template my-app-name
```

## 🎯 Usage

### Basic Usage

```bash
create-webapp-template my-awesome-app
```

This will create a new directory `my-awesome-app` with your complete React TypeScript application.

### Advanced Usage

```bash
create-webapp-template my-app --directory custom-folder
```

## ✅ Important Note

Installing this package with `npm install` will only install the CLI into `node_modules` (that’s expected).
To scaffold a new app, you must run the CLI via `npx` or the `create-webapp-template` command.

## 📁 Generated Project Structure

```
my-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── icons/         # SVG icons
│   │   └── images/        # Images and media
│   ├── components/
│   │   ├── ui/            # Reusable UI components (Button, etc.)
│   │   └── Layout.tsx     # Main layout component
│   ├── context/
│   │   └── AppContext.tsx # React context providers
│   ├── hooks/
│   │   └── useAppStore.ts # Custom hooks for state management
│   ├── i18n/
│   │   ├── index.ts       # i18n configuration
│   │   └── locales/       # Translation files (en.json, es.json)
│   ├── pages/
│   │   ├── Home.tsx       # Home page component
│   │   └── About.tsx      # About page component
│   ├── router/
│   │   └── index.tsx      # Declarative router configuration
│   ├── services/
│   │   └── api.ts         # API services with Zod validation
│   ├── stores/
│   │   └── appStore.ts    # Zustand store configuration
│   ├── types/
│   │   └── index.ts       # TypeScript type definitions
│   ├── utils/
│   │   └── cn.ts          # Utility functions (className merger)
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles with Tailwind
├── .env                   # Environment variables
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .gitignore            # Git ignore rules
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Development Workflow

After generating your project:

```bash
cd my-awesome-app

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

## ⚙️ Pre-configured Tools

### State Management (Zustand)

- Global app store with persistence
- Type-safe state management
- Custom hooks for state access

### Routing (React Router)

- Declarative route configuration
- Simple navigation setup
- Ready for complex routing scenarios

### Styling (Tailwind CSS)

- Latest Tailwind CSS with shadcn/ui-compatible configuration
- Custom color palette and design tokens
- Responsive design utilities

### Internationalization (i18next)

- Multi-language support out of the box
- Language detection and persistence
- Ready-to-use English and Spanish translations

### Code Quality

- ESLint with React and TypeScript rules
- Prettier for consistent code formatting
- Pre-commit hooks ready for integration

### API Layer

- Zod schemas for runtime validation
- Type-safe API service layer
- Error handling patterns

## 🎨 Customization

### Environment Variables

The generated project includes these environment variables in `.env`:

```env
VITE_APP_NAME=my-awesome-app
VITE_API_URL=http://localhost:3001
```

### Adding More Languages

To add more languages for i18n:

1. Create a new locale file in `src/i18n/locales/`
2. Import and add it to the resources in `src/i18n/index.ts`

### Extending the Store

The Zustand store is easily extensible:

```typescript
// In src/stores/appStore.ts
interface AppStore extends AppState {
  // Add new state
  newProperty: string;

  // Add new actions
  setNewProperty: (value: string) => void;
}
```

## 🚀 Deployment

The generated project is ready for deployment to:

- **Vercel**: Zero-config deployment
- **Netlify**: Automatic builds from Git
- **GitHub Pages**: Static site hosting
- **Any CDN**: Pre-built static assets

## 📋 Requirements

- Node.js 16 or higher
- npm or yarn
- Modern browser with ES2020 support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📄 License

MIT License - feel free to use this tool for any project!

## 🙋 Support

If you encounter any issues or have questions:

1. Check the generated project's README for development guidelines
2. Ensure all dependencies are properly installed with `npm install`
3. Verify Node.js version compatibility
4. Check for any ESLint or TypeScript errors

---

**Happy coding!** 🎉

This CLI tool saves you hours of setup time and gives you a production-ready React TypeScript application with modern best practices built-in.
