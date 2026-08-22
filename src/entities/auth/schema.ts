import { z } from 'zod';

const emailSchema = z.email({ error: 'Введите корректный email' }).trim().toLowerCase();
const passwordSchema = z.string().min(6, { error: 'Пароль должен быть не менее 6 символов' });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ['confirmPassword'],
    error: 'Пароли не совпадают',
  });

export type TSignInInput = z.infer<typeof signInSchema>;
export type TSignUpInput = z.infer<typeof signUpSchema>;
