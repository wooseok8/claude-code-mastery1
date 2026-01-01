import * as React from "react"

interface VisuallyHiddenProps {
  children: React.ReactNode
}

/**
 * VisuallyHidden 컴포넌트
 *
 * 화면에는 보이지 않지만 스크린 리더가 읽을 수 있는 콘텐츠를 제공합니다.
 * 접근성(WCAG)을 위해 필수적인 정보를 시각적으로 숨길 때 사용합니다.
 *
 * @example
 * <VisuallyHidden>
 *   <DialogTitle>다이얼로그 제목</DialogTitle>
 * </VisuallyHidden>
 */
export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}
