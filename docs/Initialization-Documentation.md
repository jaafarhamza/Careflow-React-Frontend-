# Initialize Project Structure

## Acceptance Criteria ✅

- [x] Vite project initialized with React 18+ and TypeScript
- [x] Folder structure created (components/atoms, molecules, organisms, pages, layouts, services, hooks, store, utils, types)
- [x] ESLint and Prettier configured
- [x] Git repository initialized with .gitignore
- [x] README.md with setup instructions

## Technical Tasks ✅

- [x] Run `npm create vite@latest careflow-frontend -- --template react-ts`
- [x] Install dependencies: React Router, Redux Toolkit, React Query, Axios
- [x] Configure tsconfig.json
- [x] Set up folder structure
- [x] Configure ESLint rules
- [x] Configure Prettier rules

## Project Structure

```
careflow-frontend/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   └── types/
├── docs/
└── public/
```

## Dependencies

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.2
- React Router DOM 7.9.5
- Redux Toolkit 2.10.1
- React Query 5.90.8
- Axios 1.13.2

## Setup Commands

```bash
npm install
npm run dev
```