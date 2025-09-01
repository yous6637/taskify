import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import z, { Schema } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


 // Lightweight Zod resolver to avoid extra dependency
export const zodResolver = (schema: z.ZodObject<any, any, any> ) => React.useCallback(
  async (values: unknown) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} } as any;
    }
    const fieldErrors = result.error.flatten().fieldErrors;
    const errors: Record<string, any> = {};
    Object.entries(fieldErrors).forEach(([key, messages]) => {
      if (messages && messages.length > 0) {
        errors[key] = { type: 'zod', message: messages[0] };
      }
    });
    return { values: {}, errors } as any;
  },
  []
);