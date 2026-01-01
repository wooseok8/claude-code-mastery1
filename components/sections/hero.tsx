import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"

export function Hero() {
  return (
    <Container className="flex flex-col items-center gap-8 py-24 text-center md:py-32 lg:py-40">
      {/* 배지 */}
      <Badge variant="secondary" className="px-4 py-1">
        🎉 새로운 스타터킷이 출시되었습니다
      </Badge>

      {/* 메인 타이틀 */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          모던 웹 개발을
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            빠르게 시작하세요
          </span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Next.js 15, TypeScript, TailwindCSS, ShadcnUI로 구성된 프로덕션 레디 스타터킷.
          검증된 라이브러리와 재사용 가능한 컴포넌트로 개발 속도를 높이세요.
        </p>
      </div>

      {/* CTA 버튼 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button size="lg" className="group">
          시작하기
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button size="lg" variant="outline">
          컴포넌트 보기
        </Button>
      </div>

      {/* 소셜 프루프 */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">25+</span>
          <span>UI 컴포넌트</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">100%</span>
          <span>TypeScript</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">0</span>
          <span>설정 필요</span>
        </div>
      </div>
    </Container>
  )
}
