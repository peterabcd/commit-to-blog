# commit-to-blog

GitHub 커밋을 분석해 한국어 개발 블로그를 자동 생성하는 서비스.

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + TailwindCSS + React Router v6 + Axios
- **Backend**: Node.js + Express 5 + better-sqlite3 + @anthropic-ai/sdk + @octokit/rest
- **LLM**: claude-haiku-4-5 (한국어 기술 블로그 생성)

## Architecture

```
Frontend (React:5173)
    ↕ /api/* proxy
Backend (Express:3001)
    ├── routes → controllers → services → repositories
    ├── /api/github/*  → GitHub REST API (Octokit, server-side token)
    ├── /api/blog/generate → Anthropic Claude API
    └── /api/posts/*  → SQLite (posts.db)
```

## Key Commands

```bash
cd backend && npm run dev   # port 3001
cd frontend && npm run dev  # port 5173
```

## Code Conventions

- 커밋 메시지: `feat / fix / refactor / docs / chore`
- 백엔드 계층: routes(URL매핑) → controllers(req/res) → services(비즈니스로직) → repositories(DB)
- 프론트엔드 복합 상태: useReducer 사용 (단순 단일 값은 useState 허용)
- API 에러: `ApiError` 클래스 (`frontend/src/api/client.ts`)
- TypeScript `any` 금지

## Security Rules

- API 토큰은 절대 프론트엔드 코드에 포함 금지
- `.env` 파일은 절대 커밋 금지
- 모든 GitHub API 요청은 Express 서버를 통해서만

## Environment Variables

`backend/.env` (see `.env.example`):
- `GITHUB_TOKEN` — GitHub Personal Access Token
- `ANTHROPIC_API_KEY` — Anthropic API key
- `PORT` — default 3001
- `FRONTEND_URL` — CORS origin, default http://localhost:5173

## AI Workflow

개발 루프: **설계 → AI 구현 → 리뷰 → 검증 → commit**

상세 가이드: `/ai-workflow` 스킬 참고
