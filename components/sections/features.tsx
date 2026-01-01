import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Zap, Shield, Palette, Code, Smartphone, Rocket } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "빠른 개발",
    description: "사전 구성된 컴포넌트와 레이아웃으로 개발 시간을 대폭 단축하세요.",
  },
  {
    icon: Shield,
    title: "타입 안정성",
    description: "TypeScript와 Zod를 사용한 완벽한 타입 안전성과 검증 시스템을 제공합니다.",
  },
  {
    icon: Palette,
    title: "다크모드 지원",
    description: "next-themes를 사용한 완벽한 다크모드 지원과 테마 커스터마이징이 가능합니다.",
  },
  {
    icon: Code,
    title: "재사용 가능",
    description: "모든 컴포넌트는 다양한 프로젝트에서 재사용할 수 있도록 설계되었습니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description: "모바일, 태블릿, 데스크톱 모든 디바이스에서 완벽하게 동작합니다.",
  },
  {
    icon: Rocket,
    title: "프로덕션 레디",
    description: "SEO 최적화, 접근성, 성능 최적화가 모두 적용된 프로덕션 준비 코드입니다.",
  },
]

export function Features() {
  return (
    <Section id="features" variant="muted">
      <Container>
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            강력한 기능들
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[700px]">
            모던 웹 개발에 필요한 모든 것이 준비되어 있습니다
          </p>
        </div>

        {/* 기능 카드 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
