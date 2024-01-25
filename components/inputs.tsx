'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { categoriesData } from '@/config/site';
import { Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { IconDownload } from '@tabler/icons-react';

export function CategoriesFeels({ control, register }) {
  return (
    <Controller
      control={control}
      rules={{ required: true }}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => {
        return (
          <Select
            {...register('categories')}
            name="categories"
            label="Categories"
            selectionMode="multiple"
            value={value}
            placeholder="Select categories"
            className="max-w-xs"
            onChange={(event) =>
              onChange(
                event.target.value === ''
                  ? undefined
                  : event.target.value.split(','),
              )
            }
            errorMessage={<strong>{error?.message}</strong>}
            color={
              value === undefined
                ? 'default'
                : error?.message
                  ? 'danger'
                  : 'success'
            }
          >
            {categoriesData.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
        );
      }}
      name="categories"
    />
  );
}

export function ImageFeels({ register, errors, watch }) {
  const [fileName, setFileName] = useState('Select file');
  const file = watch('file');
  useEffect(() => {
    if (file && file.length > 0) {
      setFileName(file[0].name);
    } else {
      setFileName('One file must be selected');
    }
  }, [file]);
  return (
    <label
      htmlFor="file_input"
      className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <IconDownload size={60} />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX.SIZE 3mb)
        </p>
      </div>
      <input
        {...register('file', {
          required: 'File is required',
        })}
        id="file_input"
        accept="image/*"
        type="file"
        name="file"
        className="hidden"
      />

      <p className="text-sm text-gray-900 pb-3 cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400">
        {fileName}
      </p>

      <p className={errors.file ? 'text-danger' : 'text-success'}>
        {errors.file
          ? errors.file.message
          : watch('file', [])?.length
            ? 'Image uploaded'
            : ''}
      </p>
    </label>
  );
}
