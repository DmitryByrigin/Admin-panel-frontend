import { z } from 'zod';

export const schema = z.object({
  email: z.string().nonempty('Email is required.').email('The email must be @.'),
  name: z
    .string()
    .nonempty('Name is required.')
    .regex(/^[a-zA-Z0-9_]*$/, 'Only alphanumeric and underscore characters.')
    .min(2, 'Name must be at least 2 character.')
    .max(50, 'Name must be less than 50 characters.')
    .refine((name) => /[A-Z]/.test(name), 'Password name must be at least 1 uppercase letter.'),

  surname: z
    .string()
    .nonempty('Last name is required.')
    .regex(/^[a-zA-Z0-9_]*$/, 'Only alphanumeric and underscore characters.')
    .min(2, 'Last name must be at least 2 characters.')
    .max(50, 'Last name must be less than 50 characters.')
    .refine(
      (surname) => /[A-Z]/.test(surname),
      'Password name must be at least 1 uppercase letter.',
    ),
  password: z
    .string()
    .nonempty('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .max(50, 'Password must be less than 50 characters.')
    .refine(
      (password) => /[A-Z]/.test(password),
      'Password name must be at least 1 uppercase letter.',
    )
    .refine((password) => /[0-9]/.test(password), 'Password must be at least 1 number.')
    .refine(
      (password) => /[_+!]/.test(password),
      'Password must be at least 1 special character (_+!).',
    ),

  // message: z.string()
  //     .nonempty('Message is required.')
  //     .min(6, 'Message must be at least 6 characters.')
  //     .max(500, 'Message must be less than 500 characters.'),
});

export const schemaLogin = z.object({
  email: z.string().nonempty('Email is required.').email('The email must be @.'),

  password: z
    .string()
    .nonempty('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .max(50, 'Password must be less than 50 characters.')
    .refine(
      (password) => /[A-Z]/.test(password),
      'Password name must be at least 1 uppercase letter.',
    )
    .refine((password) => /[0-9]/.test(password), 'Password must be at least 1 number.')
    .refine(
      (password) => /[_+!]/.test(password),
      'Password must be at least 1 special character (_+!).',
    ),

  // message: z.string()
  //     .nonempty('Message is required.')
  //     .min(6, 'Message must be at least 6 characters.')
  //     .max(500, 'Message must be less than 500 characters.'),
});
