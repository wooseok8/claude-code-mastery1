# Claude Code MCP 서버 설정 가이드 (초보자용)

## 🤔 MCP가 뭔가요?

MCP(Model Context Protocol)는 Claude Code에 **특별한 능력**을 추가하는 플러그인이라고 생각하면 됩니다.

**예시:**
- **playwright** MCP → 웹 브라우저를 자동으로 제어할 수 있게 됨
- **shadcn** MCP → UI 컴포넌트를 자동으로 추가할 수 있게 됨
- **context7** MCP → 웹사이트 정보를 분석할 수 있게 됨

---

## 📁 설정 파일이 왜 2개인가요?

Claude Code는 설정을 **2가지 목적**으로 나눕니다:

### 1. 팀 전체가 공유하는 설정 (Git에 올림)
- `.mcp.json` ← MCP 서버 목록
- `.claude/settings.json` ← 프로젝트 공통 설정

### 2. 나만 사용하는 개인 설정 (Git에 안 올림)
- `.claude/settings.local.json` ← 내 개인 권한, 훅 등

---

## 🔄 최초 설정 vs 권장 설정 비교

### 최초 설정 (문제 있음)

```
프로젝트/
└─ .claude/
   └─ settings.local.json
      ├─ permissions (개인 권한) ✅
      ├─ hooks (개인 훅) ✅
      └─ MCP 서버 설정 ❌ ← 여기가 문제!
```

**문제점:**
- MCP 서버 설정이 "개인용" 파일에 들어있음
- 회사에서 이 프로젝트를 받았을 때 MCP 서버 설정이 없음
- 팀원마다 다른 MCP 서버를 사용하게 됨

### 권장 설정 (올바름)

```
프로젝트/
├─ .mcp.json ← MCP 서버 목록 (팀 공유)
└─ .claude/
   ├─ settings.json ← 프로젝트 공통 설정 (팀 공유)
   └─ settings.local.json ← 내 개인 설정만
```

**장점:**
- MCP 서버 목록을 팀 전체가 공유함
- 회사에서 프로젝트를 받으면 자동으로 MCP 서버 설치됨
- 모든 팀원이 같은 환경에서 작업 가능

---

## 📝 각 파일의 역할 정리

### `.mcp.json` (루트 디렉토리)

**목적:** 이 프로젝트에서 사용할 MCP 서버 목록

**내용 예시:**
```
이 프로젝트는 다음 MCP 서버를 사용합니다:
- playwright (브라우저 자동화)
- shadcn (UI 컴포넌트)
- context7 (웹 분석)
- sequential-thinking (순차적 사고)
```

**누가 사용:** 팀 전체

**Git 관리:** 반드시 커밋해서 팀과 공유

---

### `.claude/settings.json` (프로젝트 공통 설정)

**목적:** 프로젝트에서 공통으로 사용할 설정

**내용 예시:**
```
enableAllProjectMcpServers: true
→ ".mcp.json에 있는 모든 MCP 서버를 자동으로 켜주세요"
```

**누가 사용:** 팀 전체

**Git 관리:** 커밋해서 팀과 공유

---

### `.claude/settings.local.json` (개인 설정)

**목적:** 나만 사용하는 개인 설정

**내용 예시:**
```
- permissions: 내가 허용한 권한 목록
- hooks: 내가 설정한 훅 (Slack 알림 등)
- 개인 환경 설정
```

**누가 사용:** 나만

**Git 관리:** 절대 커밋 안 함 (`.gitignore`에 포함)

---

## 🎯 프로젝트에서 MCP 서버 사용하는 올바른 방법

### 상황 1: 새 프로젝트 시작할 때

**단계:**
1. MCP 서버 설치
   ```bash
   claude mcp add playwright npx @playwright/mcp@latest --scope project
   ```
   → `.mcp.json` 파일이 자동으로 생성됨

2. 프로젝트 설정 파일 만들기
   ```
   .claude/settings.json 파일에
   enableAllProjectMcpServers: true 추가
   ```

3. Git에 커밋
   ```bash
   git add .mcp.json .claude/settings.json
   git commit -m "MCP 서버 설정 추가"
   git push
   ```

**결과:** 팀원들이 프로젝트를 받으면 자동으로 MCP 서버 사용 가능

---

### 상황 2: 회사에서 기존 프로젝트 받았을 때

**단계:**
1. 프로젝트 클론
   ```bash
   git clone [프로젝트 주소]
   ```

2. 확인
   ```bash
   claude mcp list
   ```
   → `.mcp.json`에 있는 MCP 서버들이 자동으로 보임

**결과:** 별도 설정 없이 바로 사용 가능

---

### 상황 3: 개인용 설정 추가할 때

**예시:** Slack 알림 받고 싶음

**단계:**
1. `.claude/settings.local.json`에만 추가
   ```
   hooks: {
     "Stop": [...]
   }
   ```

2. Git에 **절대 커밋 안 함**

**결과:** 나만 Slack 알림 받음 (팀원은 안 받음)

---

## 🚨 자주 하는 실수

### 실수 1: MCP 서버를 settings.local.json에 추가

**왜 안 되나요?**
- settings.local.json은 Git에 안 올라감
- 팀원들은 MCP 서버 목록을 못 봄
- 회사에서 프로젝트 받았을 때 MCP 서버가 없음

**해결:**
- `.mcp.json`에 MCP 서버 추가
- Git에 커밋해서 공유

---

### 실수 2: settings.json과 settings.local.json 헷갈림

**구분 방법:**

| 파일 | 누가 사용 | Git 관리 | 예시 |
|------|----------|---------|------|
| settings.json | 팀 전체 | 커밋함 | MCP 서버 활성화 설정 |
| settings.local.json | 나만 | 안 커밋 | 내 Slack 알림, 내 권한 |

---

### 실수 3: .mcp.json을 .claude 폴더 안에 넣음

**왜 안 되나요?**
- `.mcp.json`은 **반드시 프로젝트 루트**에 있어야 함
- Claude Code가 이 위치에서만 찾음

**올바른 위치:**
```
프로젝트/
├─ .mcp.json ← 여기! (루트)
└─ .claude/
   ├─ settings.json
   └─ settings.local.json
```

---

## 💡 간단 정리 (외우세요!)

### 팀과 공유하는 것 (Git 커밋)
1. `.mcp.json` → MCP 서버 목록
2. `.claude/settings.json` → 프로젝트 공통 설정

### 나만 사용하는 것 (Git 안 커밋)
1. `.claude/settings.local.json` → 개인 권한, 훅, 환경 설정

---

## ✅ 체크리스트: 제대로 설정했나요?

프로젝트에서 다음을 확인하세요:

- [ ] `.mcp.json` 파일이 **프로젝트 루트**에 있나요?
- [ ] `.mcp.json`에 사용할 MCP 서버가 **모두** 들어있나요?
- [ ] `.claude/settings.json`에 `enableAllProjectMcpServers: true`가 있나요?
- [ ] `.claude/settings.local.json`에는 **개인 설정만** 있나요?
- [ ] `.mcp.json`과 `.claude/settings.json`을 **Git에 커밋**했나요?

모두 체크되었다면 완벽합니다! 🎉

---

## 🔍 현재 프로젝트 설정 (참고용)

### 이 프로젝트의 MCP 서버
- playwright (웹 브라우저 자동화)
- context7 (웹사이트 분석)
- sequential-thinking (순차적 사고 지원)
- shadcn (UI 컴포넌트 관리)

### 파일 구조
```
claude-nextjs-starters/
├─ .mcp.json (팀 공유 - MCP 서버 목록)
├─ .env (개인용 - Slack Webhook URL, Git 제외)
└─ .claude/
   ├─ settings.json (팀 공유 - enableAllProjectMcpServers)
   ├─ settings.local.json (개인용 - 권한, 훅)
   ├─ hooks/
   │  └─ slack-notify.sh (팀 공유)
   └─ agents/
      └─ code-reviewer.md (팀 공유)
```

---

## 🎓 더 알아보기

궁금한 점이 있다면:
1. `claude mcp --help` 명령어로 도움말 보기
2. Claude Code 공식 문서: https://code.claude.com/docs
3. 팀원에게 물어보기

Happy Coding! 🚀
