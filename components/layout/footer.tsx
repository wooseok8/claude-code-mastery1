import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

import { Container } from "@/components/layout/container"

const footerLinks = {
  product: [
    { name: "기능", href: "#features" },
    { name: "가격", href: "#pricing" },
    { name: "문서", href: "#docs" },
    { name: "변경사항", href: "#changelog" },
  ],
  company: [
    { name: "소개", href: "#about" },
    { name: "블로그", href: "#blog" },
    { name: "채용", href: "#careers" },
    { name: "문의", href: "#contact" },
  ],
  legal: [
    { name: "개인정보처리방침", href: "#privacy" },
    { name: "이용약관", href: "#terms" },
    { name: "쿠키정책", href: "#cookies" },
  ],
}

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-12 lg:py-16">
        {/* 상단 영역: 로고 + 링크 그리드 */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {/* 로고 & 설명 */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">스타터킷</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Next.js, TypeScript, TailwindCSS, ShadcnUI 기반의 모던 웹 스타터킷
            </p>
            {/* 소셜 미디어 링크 */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 제품 링크 */}
          <div>
            <h3 className="text-sm font-semibold">제품</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 링크 */}
          <div>
            <h3 className="text-sm font-semibold">회사</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 법적 링크 */}
          <div>
            <h3 className="text-sm font-semibold">법적 고지</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 영역: 저작권 */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} 스타터킷. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
