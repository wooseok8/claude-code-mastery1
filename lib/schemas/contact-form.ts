import { z } from 'zod'

/**
 * 문의 폼 스키마
 * react-hook-form과 함께 사용하기 위한 zod 스키마 예제
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(50, '이름은 최대 50자까지 입력 가능합니다'),

  email: z
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .min(1, '이메일은 필수 항목입니다'),

  phone: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호 형식이 아닙니다')
    .optional()
    .or(z.literal('')),

  subject: z
    .string()
    .min(5, '제목은 최소 5자 이상이어야 합니다')
    .max(100, '제목은 최대 100자까지 입력 가능합니다'),

  message: z
    .string()
    .min(10, '메시지는 최소 10자 이상이어야 합니다')
    .max(1000, '메시지는 최대 1000자까지 입력 가능합니다'),

  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: '개인정보 처리방침에 동의해주세요',
    }),
})

/**
 * 문의 폼 데이터 타입
 * zod 스키마로부터 자동으로 생성된 TypeScript 타입
 */
export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * 뉴스레터 구독 스키마
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .min(1, '이메일은 필수 항목입니다'),
})

export type NewsletterData = z.infer<typeof newsletterSchema>
