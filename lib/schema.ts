import { TypeOf, z } from 'zod';

const MAX_FILE_SIZE = 3000000; // Максимальный размер файла в байтах (3MB)
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
];

const categorySchema = z.object({
  label: z.string(),
  description: z.string(),
  value: z.string(),
});

const fileValidator = (value) => {
  if (!value || !(value instanceof File)) {
    return 'File is required';
  }

  if (value.size > MAX_FILE_SIZE) {
    return 'Maximum file size is 3MB';
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(value.type)) {
    return 'Supported file formats are .jpg, .jpeg, .png, and .gif';
  }

  return true;
};

const categoriesSchema = z.array(categorySchema);

export const schema = z.object({
  email: z
    .string()
    .nonempty('Email is required.')
    .email('The email must be @.'),
  name: z
    .string()
    .nonempty('Name is required.')
    .regex(/^[a-zA-Z0-9_]*$/, 'Only alphanumeric and underscore characters.')
    .min(1, 'Name must be at least 2 character.')
    .max(50, 'Name must be less than 50 characters.')
    .refine(
      (name) => /[A-Z]/.test(name),
      'Password name must be at least 1 uppercase letter.',
    ),

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
    .refine(
      (password) => /[0-9]/.test(password),
      'Password must be at least 1 number.',
    )
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
  email: z.string().min(1, 'Email is required.').email('The email must be @.'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(50, 'Password must be less than 50 characters.')
    .refine(
      (password) => /[A-Z]/.test(password),
      'Password name must be at least 1 uppercase letter.',
    )
    .refine(
      (password) => /[0-9]/.test(password),
      'Password must be at least 1 number.',
    )
    .refine(
      (password) => /[_+!]/.test(password),
      'Password must be at least 1 special character (_+!).',
    ),

  // message: z.string()
  //     .nonempty('Message is required.')
  //     .min(6, 'Message must be at least 6 characters.')
  //     .max(500, 'Message must be less than 500 characters.'),
});

export const schemaPost = z.object({
  file: z
    .any()
    .refine(
      (file) => file[0]?.size <= MAX_FILE_SIZE,
      `Максимальный размер изображения - 3MB.`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      `Поддерживаются только форматы .jpg, .jpeg, .png и .gif.`,
    ),

  title: z.string().min(1, 'Title is required.'),

  content: z.string().min(50, 'Content must be at least 50 characters..'),

  categories: z.string().array(),
});

export type PostSchemaType = z.infer<typeof schemaPost>;
