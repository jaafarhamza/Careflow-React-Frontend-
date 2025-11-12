# Configure Development Environment

## Acceptance Criteria ✅

- [x] Environment variables configured (.env.development, .env.production)
- [x] Docker setup for local development
- [x] Docker Compose configuration
- [x] VS Code workspace settings configured
- [x] Development scripts in package.json

## Technical Tasks ✅

- [x] Create .env.example with API_BASE_URL, API_TIMEOUT
- [x] Create Dockerfile for frontend
- [x] Create docker-compose.yml
- [x] Configure VS Code extensions recommendations
- [x] Add npm scripts: dev, build, preview, lint, format, test

## Environment Variables

Copy `.env.example` to `.env.development` and configure:
```bash
cp .env.example .env.development
```

## Docker Development

```bash
docker-compose up
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier