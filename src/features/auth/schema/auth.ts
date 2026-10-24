import { z } from 'zod';

const emailSchema = z.email({ error: 'Введите корректный email' }).trim().toLowerCase();
const passwordSchema = z.string().min(6, { error: 'Пароль должен быть не менее 6 символов' });
const confirmPasswordSchema = z.string().min(1, { error: 'Повторите пароль' });
const displayNameSchema = z
  .string()
  .trim()
  .min(1, { error: 'Введите имя' })
  .max(40, { error: 'Имя должно быть не длиннее 40 символов' });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    displayName: displayNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    error: 'Пароли не совпадают',
  });
