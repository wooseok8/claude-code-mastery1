"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Mail, Send } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact-form"

export function Contact() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      agreeToTerms: false,
    },
  })

  async function onSubmit(data: ContactFormData) {
    try {
      // 실제 API 호출 예시
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })

      // 데모용: 콘솔에 출력
      console.log("문의 내용:", data)

      // 성공 토스트
      toast.success("문의가 성공적으로 전송되었습니다!", {
        description: "빠른 시일 내에 답변드리겠습니다.",
      })

      // 폼 리셋
      form.reset()
    } catch {
      toast.error("문의 전송에 실패했습니다.", {
        description: "잠시 후 다시 시도해주세요.",
      })
    }
  }

  return (
    <Section id="contact" variant="default">
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* 섹션 헤더 */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              문의하기
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              궁금한 점이 있으시면 언제든지 문의해주세요. 빠르게 답변드리겠습니다.
            </p>
          </div>

          {/* 문의 폼 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 이름 */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름 *</FormLabel>
                    <FormControl>
                      <Input placeholder="홍길동" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 이메일 & 전화번호 */}
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일 *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>전화번호 (선택)</FormLabel>
                      <FormControl>
                        <Input placeholder="010-1234-5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* 제목 */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목 *</FormLabel>
                    <FormControl>
                      <Input placeholder="문의 제목을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 메시지 */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>메시지 *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="문의 내용을 상세히 적어주세요"
                        className="min-h-[150px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      최소 10자 이상 입력해주세요
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 개인정보 동의 */}
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        개인정보 처리방침에 동의합니다 *
                      </FormLabel>
                      <FormDescription>
                        문의 처리를 위해 개인정보를 수집 및 이용하는 것에 동의합니다.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* 제출 버튼 */}
              <Button
                type="submit"
                className="w-full group"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  "전송 중..."
                ) : (
                  <>
                    문의 보내기
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </Section>
  )
}
