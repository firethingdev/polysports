'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@workspace/ui/components/field';
import { Product } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@workspace/ui/components/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

const productSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  category: z.string().min(2, { message: 'Category is required.' }),
  price: z.coerce
    .number()
    .min(0.01, { message: 'Price must be at least 0.01.' }),
  stock: z.coerce
    .number()
    .int()
    .min(0, { message: 'Stock cannot be negative.' }),
  imageUrl: z
    .string()
    .url({ message: 'Please enter a valid image URL.' })
    .or(z.literal('')),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
});

interface ProductFormProps {
  initialData?: Product;
  onSave: (data: Partial<Product>) => void;
  title: string;
}

export function ProductForm({ initialData, onSave, title }: ProductFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      imageUrl:
        initialData?.images?.[0] ||
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=800&fit=crop',
      description: initialData?.description || '',
    },
    validators: {
      onSubmit: productSchema,
    },
    onSubmit: async ({ value }) => {
      const data: Partial<Product> = {
        name: value.name,
        category: value.category,
        price: value.price,
        stock: value.stock,
        description: value.description,
        images: [value.imageUrl || ''],
      };
      onSave(data);
    },
  });

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='mb-6'>
        <Link href='/admin/products'>
          <Button variant='ghost' size='sm' className='gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Back to Products
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>{title}</CardTitle>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardContent className='space-y-4'>
            <FieldGroup>
              <form.Field name='name'>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Product Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder='e.g. Professional Basketball'
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <div className='grid grid-cols-2 gap-4'>
                <form.Field name='category'>
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder='e.g. Basketball'
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name='price'>
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Price ($)</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type='number'
                          step='0.01'
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <form.Field name='stock'>
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Stock Level
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type='number'
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name='imageUrl'>
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder='https://images.unsplash.com/...'
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>

              <form.Field name='description'>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        placeholder='Describe the product...'
                        className='min-h-[120px]'
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className='flex justify-end gap-4 border-t pt-6 bg-muted/30'>
            <Link href='/admin/products'>
              <Button variant='outline' type='button'>
                Cancel
              </Button>
            </Link>
            <Button type='submit' className='gap-2'>
              <Save className='h-4 w-4' />
              Save Product
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
