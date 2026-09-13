import { z } from 'zod';

const emailSchema = z.email({ error: 'Введите корректный email' }).trim().toLowerCase();
const passwordSchema = z.string().min(6, { error: 'Пароль должен быть не менее 6 символов' });
const displayNameSchema = z
  .string()
  .trim()
  .min(1, { error: 'Введите имя' })
  .max(40, { error: 'Имя должно быть не длиннее 40 символов' });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const signUpSchema = z.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema,
});
export const signUpFormSchema = signUpSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ['confirmPassword'],
    error: 'Пароли не совпадают',
  });

export type TSignInInput = z.infer<typeof signInSchema>;
export type TSignUpInput = z.infer<typeof signUpSchema>;
