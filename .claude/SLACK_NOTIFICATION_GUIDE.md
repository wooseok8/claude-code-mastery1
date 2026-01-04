# Claude Code Slack 알림 설정 가이드

Claude Code에서 Slack으로 알림을 받을 수 있도록 설정하는 초보자용 가이드입니다.

## 📋 개요

이 설정을 통해 다음 상황에서 모바일 Slack 앱으로 알림을 받을 수 있습니다:

1. **권한 요청 알림** (`Notification` 이벤트)
   - Claude Code가 특정 작업을 수행하기 위해 권한을 요청할 때

2. **작업 완료 알림** (`Stop` 이벤트)
   - Claude Code가 응답을 완료했을 때

---

## 🚀 설치 완료된 항목

이미 다음 항목들이 설정되어 있습니다:

### ✅ 1. 환경변수 파일 (.env)
```bash
.env
```
- 위치: 프로젝트 루트
- Slack Webhook URL이 저장되어 있습니다
- ⚠️ **주의**: 이 파일은 Git에 커밋되지 않습니다 (.gitignore에 추가됨)

### ✅ 2. Slack 알림 스크립트
```bash
.claude/hooks/slack-notify.sh
```
- Claude Code Hooks에서 호출되는 스크립트
- 실행 권한이 설정되어 있습니다

### ✅ 3. Claude Code Hooks 설정
```json
.claude/settings.local.json
```
- `Notification` 이벤트: 권한 요청 시 알림
- `Stop` 이벤트: 작업 완료 시 알림

---

## 🔧 작동 방식

### 1. Notification 이벤트 (권한 요청)

Claude Code가 권한을 요청하면:

```
🔔 Claude Code - 권한 요청

[제목]
[본문]
```

오렌지색 알림이 Slack으로 전송됩니다.

### 2. Stop 이벤트 (작업 완료)

Claude Code가 작업을 완료하면:

```
✅ Claude Code - 작업 완료

대화 턴: N회
```

녹색 알림이 Slack으로 전송됩니다.

---

## 📱 테스트 방법

### 방법 1: 간단한 명령어로 테스트

Claude Code에서 다음 명령어를 실행해보세요:

```bash
ls -la
```

작업이 완료되면 Slack으로 "작업 완료" 알림이 전송됩니다.

### 방법 2: 수동 스크립트 테스트

터미널에서 직접 스크립트를 테스트할 수 있습니다:

```bash
# Notification 이벤트 테스트
echo '{
  "event_type": "Notification",
  "notification": {
    "title": "테스트 알림",
    "body": "Slack 알림 테스트입니다"
  }
}' | .claude/hooks/slack-notify.sh

# Stop 이벤트 테스트
echo '{
  "event_type": "Stop",
  "conversation_turns": 5
}' | .claude/hooks/slack-notify.sh
```

---

## 🛠️ 문제 해결

### 알림이 오지 않을 때

1. **환경변수 확인**
   ```bash
   cat .env
   ```
   SLACK_WEBHOOK_URL이 제대로 설정되어 있는지 확인하세요.

2. **스크립트 실행 권한 확인**
   ```bash
   ls -la .claude/hooks/slack-notify.sh
   ```
   `-rwx--x--x`로 실행 권한이 있어야 합니다.

3. **스크립트 직접 실행 테스트**
   ```bash
   echo '{"event_type":"Stop","conversation_turns":1}' | .claude/hooks/slack-notify.sh
   ```

4. **Webhook URL 확인**
   - Slack Webhook URL이 만료되지 않았는지 확인
   - URL 형식: `https://hooks.slack.com/services/...`

### 디버깅 모드

스크립트가 제대로 작동하는지 확인하려면:

```bash
# 에러 메시지 확인
echo '{"event_type":"Stop"}' | bash -x .claude/hooks/slack-notify.sh
```

---

## 🔐 보안 주의사항

### ⚠️ 절대로 하지 말아야 할 것

1. **`.env` 파일을 Git에 커밋하지 마세요**
   - Webhook URL은 민감한 정보입니다
   - 이미 `.gitignore`에 추가되어 있습니다

2. **Webhook URL을 공개 저장소에 노출하지 마세요**
   - 누구나 이 URL을 사용해 메시지를 보낼 수 있습니다

3. **`.env` 파일을 공유하지 마세요**
   - 팀원에게는 별도로 Webhook URL을 전달하세요

### ✅ 권장 사항

- 팀 프로젝트의 경우 `.env.example` 파일을 만들어 형식만 공유:
  ```bash
  # .env.example
  SLACK_WEBHOOK_URL=your_webhook_url_here
  ```

---

## 🔄 다른 프로젝트에서 사용하기

### 1. 파일 복사

다른 프로젝트에서도 동일한 설정을 사용하려면:

```bash
# 다른 프로젝트로 이동
cd /path/to/other/project

# 필요한 파일 복사
cp /Users/wooseok/Documents/claude-nextjs-starters/.env .
cp -r /Users/wooseok/Documents/claude-nextjs-starters/.claude/hooks .claude/
```

### 2. Claude Code 설정 업데이트

`.claude/settings.local.json`에 hooks 설정 추가:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/slack-notify.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/slack-notify.sh"
          }
        ]
      }
    ]
  }
}
```

---

## 📚 추가 커스터마이징

### 다른 이벤트에도 알림 추가하기

`.claude/settings.local.json`에 다른 이벤트를 추가할 수 있습니다:

```json
{
  "hooks": {
    "SubagentStop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/slack-notify.sh"
          }
        ]
      }
    ]
  }
}
```

### 알림 메시지 커스터마이징

`.claude/hooks/slack-notify.sh` 파일을 수정하여 메시지를 변경할 수 있습니다:

```bash
# 예: 이모지 변경, 색상 변경, 추가 정보 포함 등
```

---

## 📞 지원

문제가 발생하면:

1. 이 가이드의 "문제 해결" 섹션을 확인하세요
2. `.claude/hooks/slack-notify.sh` 스크립트의 주석을 확인하세요
3. Claude Code 공식 문서를 참조하세요: https://code.claude.com/docs

---

## ✨ 요약

현재 설정된 내용:

- ✅ `.env` 파일에 Slack Webhook URL 저장
- ✅ `.claude/hooks/slack-notify.sh` 스크립트 작성
- ✅ Claude Code Hooks 설정 완료 (Notification, Stop)
- ✅ 실행 권한 설정 완료
- ✅ Git 보안 설정 완료 (.gitignore)

**이제 Claude Code를 사용하면 자동으로 Slack 알림을 받게 됩니다!** 🎉
