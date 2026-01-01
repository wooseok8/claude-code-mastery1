"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Container } from "@/components/layout/container"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

const navItems = [
  { name: "홈", href: "/" },
  { name: "컴포넌트", href: "/components" },
  { name: "기능", href: "#features" },
  { name: "문의", href: "#contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">스타터킷</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 우측 액션 버튼 */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* 데스크톱 CTA */}
            <Button className="hidden md:flex" size="sm">
              시작하기
            </Button>

            {/* 모바일 메뉴 */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">메뉴</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <VisuallyHidden>
                  <SheetTitle>네비게이션 메뉴</SheetTitle>
                </VisuallyHidden>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-foreground/80"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button className="mt-4 w-full">시작하기</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}
