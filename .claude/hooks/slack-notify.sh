#!/bin/bash

# Slack 알림 스크립트
# Claude Code Hooks에서 호출됨

# 프로젝트 루트 디렉토리의 .env 파일에서 SLACK_WEBHOOK_URL 로드
if [ -f "$CLAUDE_PROJECT_DIR/.env" ]; then
  export $(cat "$CLAUDE_PROJECT_DIR/.env" | grep -v '^#' | xargs)
fi

# SLACK_WEBHOOK_URL이 설정되어 있는지 확인
if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "⚠️  SLACK_WEBHOOK_URL이 설정되지 않았습니다."
  exit 0
fi

# stdin에서 JSON 데이터 읽기
INPUT=$(cat)

# 이벤트 타입 추출
EVENT_TYPE=$(echo "$INPUT" | jq -r '.hook_event_name // "unknown"')

# 알림 메시지 구성
case "$EVENT_TYPE" in
  "Notification")
    # 권한 요청 알림
    NOTIFICATION_TYPE=$(echo "$INPUT" | jq -r '.notification_type // "unknown"')
    MESSAGE_TEXT=$(echo "$INPUT" | jq -r '.message // "Claude Code 알림"')

    MESSAGE="🔔 *Claude Code - Notification*\n\n타입: ${NOTIFICATION_TYPE}\n메시지: ${MESSAGE_TEXT}"
    COLOR="#FFA500"  # 오렌지색
    ;;

  "Stop")
    # 작업 완료 알림 - transcript 파일 분석
    TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // ""')
    SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')

    # transcript 파일에서 대화 턴 수 추출
    TURN_COUNT=0
    if [ -f "$TRANSCRIPT_PATH" ]; then
      # user_turn 타입의 메시지 개수 세기
      TURN_COUNT=$(jq -r 'select(.type == "user_turn")' "$TRANSCRIPT_PATH" 2>/dev/null | wc -l | xargs)
    fi

    MESSAGE="✅ *Claude Code - 작업 완료*\n\n세션: ${SESSION_ID}\n대화 턴: ${TURN_COUNT}회"
    COLOR="#36a64f"  # 녹색
    ;;

  *)
    # 기타 이벤트
    MESSAGE="ℹ️  *Claude Code 이벤트*\n\n타입: ${EVENT_TYPE}"
    COLOR="#808080"  # 회색
    ;;
esac

# Slack 웹훅으로 메시지 전송
curl -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d "{
    \"attachments\": [
      {
        \"color\": \"$COLOR\",
        \"text\": \"$MESSAGE\",
        \"footer\": \"Claude Code Hooks\",
        \"footer_icon\": \"https://www.anthropic.com/favicon.ico\",
        \"ts\": $(date +%s)
      }
    ]
  }" \
  --silent --show-error

exit 0
