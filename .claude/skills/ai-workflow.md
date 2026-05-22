---
name: ai-workflow
description: AI 기반 개발 워크플로우. 설계 → 구현 → 리뷰 → 검증 → 커밋 루프를 강제. 기능 개발 시작 전 반드시 참고.
---

# AI 기반 개발 워크플로우

## 핵심 원칙
- **내가 설계 → AI가 구현 → 내가 검증 → commit**
- 설계 없이 AI에게 바로 요청하면 AI가 설계까지 해버림 → 코드를 이해 못 하게 됨
- 기능 하나 완료 = 즉시 commit (checkpoint)

## 개발 루프 (매 기능마다 반복)

### Step 1: 내가 먼저 설계
AI 실행 전 30초라도 생각:
- 이 기능이 무엇을 해야 하는가?
- 어떤 컴포넌트/함수가 필요한가?
- 데이터는 어디서 오는가?
- 완성 조건(Done Criteria)은 무엇인가?

### Step 2: AI에게 구체적으로 요청
나쁜 예: "카드 컴포넌트 만들어줘"
좋은 예: "React + TypeScript로 PostCard 컴포넌트 만들어줘.
         props: post: Post (types/index.ts 참고)
         위치: src/components/PostCard.tsx
         TailwindCSS 사용, 제목/요약/날짜/브랜치 태그 표시"

### Step 3: 코드 리뷰 (생략 금지)
- 내가 설계한 대로 만들었는가?
- 이해 안 되는 코드가 있는가? → 그 자리에서 물어보기
- 불필요하게 복잡한 부분은 없는가?
- 내가 요청하지 않은 것이 들어오지 않았는가?

### Step 4: 직접 확인
- 브라우저 또는 curl로 실제 동작 확인
- "됐다고 AI가 말했다"는 확인이 아님

### Step 5: commit
```bash
git add <specific-files>
git commit -m "feat: PostCard 컴포넌트 구현"
```

## 완료 조건 작성법
기능 구현 시작 전에 반드시 완료 조건을 정의:
- [ ] 저장소 목록이 실제 GitHub API에서 로드된다
- [ ] 로딩 중 스피너가 표시된다
- [ ] 오류 시 사용자 친화적 메시지가 표시된다

## 흔한 실수
| 실수 | 결과 |
|------|------|
| 설계 없이 AI에 요청 | AI가 이해 불가한 구조 선택 |
| 한 번에 여러 기능 요청 | 검증 불가, 커밋 단위 붕괴 |
| AI 코드 이해 없이 붙여넣기 | 버그 시 손도 못 댐 |
| alert()로 에러 처리 | 사용자 UX 파괴 |

## 이 프로젝트 규칙
- 백엔드: routes → controllers → services → repositories
- 프론트엔드 위자드 상태: useReducer (wizardReducer.ts)
- API 에러: ApiError 클래스 (api/client.ts)
- 커밋 단위: 기능 하나 + 그에 딸린 리팩토링
- .env는 절대 커밋 금지
