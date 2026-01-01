import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

/**
 * 날짜를 한국어 형식으로 포맷팅합니다
 * @param date - 포맷팅할 날짜
 * @param formatStr - 날짜 형식 문자열 (예: 'yyyy년 MM월 dd일', 'PPP' 등)
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date, formatStr: string = 'PPP'): string {
  return format(date, formatStr, { locale: ko })
}

/**
 * 상대적인 시간을 반환합니다 (예: "2시간 전", "3일 전")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) {
    return '방금 전'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`
  } else {
    return formatDate(date, 'yyyy년 MM월 dd일')
  }
}
