import z from 'zod';

const operationSchema = z.object({
  amount: z.coerce.number().int().positive({ error: 'Введите сумму' }),
  category: z.string().uuid({ error: 'Выберите категорию' }),
  date: z.date({ error: 'Выберите дату' }),
  time: z.date({ error: 'Выберите время' }),
  comment: z.string().trim().optional(),
});

type TCreateOperationFormValues = {
  amount: string;
  category: string;
  date: Date | null;
  time: Date | null;
  comment: string;
};

export const checkOperationSchema = (data: TCreateOperationFormValues) => {
  const result = operationSchema.safeParse(data);
  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    return {
      ok: false as const,
      fieldErrors: {
        amount: fieldErrors.amount?.[0] ?? '',
        category: fieldErrors.category?.[0] ?? '',
        date: fieldErrors.date?.[0] ?? '',
        time: fieldErrors.time?.[0] ?? '',
      },
    };
  }
  return {
    ok: true as const,
    data: result.data,
  };
};
