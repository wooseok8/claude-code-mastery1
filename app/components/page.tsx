"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

export default function ComponentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Section>
          <Container>
            <div className="flex flex-col gap-4 mb-12">
              <h1 className="text-4xl font-bold tracking-tight">컴포넌트 쇼케이스</h1>
              <p className="text-lg text-muted-foreground">
                설치된 모든 ShadcnUI 컴포넌트를 확인하고 테스트해보세요
              </p>
            </div>

            <Tabs defaultValue="basic" className="space-y-8">
              <TabsList>
                <TabsTrigger value="basic">기본 컴포넌트</TabsTrigger>
                <TabsTrigger value="forms">폼 컴포넌트</TabsTrigger>
                <TabsTrigger value="feedback">피드백</TabsTrigger>
              </TabsList>

              {/* 기본 컴포넌트 */}
              <TabsContent value="basic" className="space-y-8">
                {/* Buttons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>다양한 스타일의 버튼 컴포넌트</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-wrap gap-4">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                      <Button size="icon">⭐</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>상태 표시 및 태그를 위한 배지</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Cards */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cards</CardTitle>
                    <CardDescription>콘텐츠 그룹화를 위한 카드 컴포넌트</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>카드 제목</CardTitle>
                          <CardDescription>카드 설명이 여기에 표시됩니다</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">카드 내용이 여기에 들어갑니다.</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>또 다른 카드</CardTitle>
                          <CardDescription>카드는 다양한 용도로 사용할 수 있습니다</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">통계, 정보, 콘텐츠 등을 표시하기 좋습니다.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 폼 컴포넌트 */}
              <TabsContent value="forms" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Form Inputs</CardTitle>
                    <CardDescription>다양한 입력 필드 컴포넌트</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input id="email" type="email" placeholder="example@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">비밀번호</Label>
                      <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm font-normal">
                        이용약관에 동의합니다
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notifications" />
                      <Label htmlFor="notifications" className="text-sm font-normal">
                        알림 받기
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 피드백 컴포넌트 */}
              <TabsContent value="feedback" className="space-y-8">
                {/* Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Alerts</CardTitle>
                    <CardDescription>다양한 유형의 알림 메시지</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>정보</AlertTitle>
                      <AlertDescription>
                        일반 정보를 표시하는 알림입니다.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>경고</AlertTitle>
                      <AlertDescription>
                        중요한 경고 메시지를 표시합니다.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* Toast */}
                <Card>
                  <CardHeader>
                    <CardTitle>Toast Notifications</CardTitle>
                    <CardDescription>임시 알림 메시지 (Sonner)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Button onClick={() => toast.success("성공!", { description: "작업이 성공적으로 완료되었습니다." })}>
                        Success Toast
                      </Button>
                      <Button variant="destructive" onClick={() => toast.error("오류 발생!", { description: "작업을 완료할 수 없습니다." })}>
                        Error Toast
                      </Button>
                      <Button variant="secondary" onClick={() => toast.info("정보", { description: "이것은 정보 메시지입니다." })}>
                        Info Toast
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progress</CardTitle>
                    <CardDescription>진행률 표시 바</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>진행률</span>
                        <span>33%</span>
                      </div>
                      <Progress value={33} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>완료</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} />
                    </div>
                  </CardContent>
                </Card>

                {/* Skeleton */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skeleton</CardTitle>
                    <CardDescription>로딩 상태 표시</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-3/4" />
                      <Skeleton className="h-12 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
