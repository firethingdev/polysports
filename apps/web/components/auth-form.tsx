'use client';

import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@workspace/ui/components/field';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { signIn, signUp } from '@/app/actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

interface AuthFormProps {
  type: 'login' | 'register';
  title: string;
  description: string;
}

export function AuthForm({ type, title, description }: AuthFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || undefined;

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setLoading(true);

      const formData = new FormData();
      formData.append('email', value.email);
      formData.append('password', value.password);
      if (redirectTo) {
        formData.append('redirectTo', redirectTo);
      }

      const result =
        type === 'register' ? await signUp(formData) : await signIn(formData);

      if (result && 'error' in result) {
        setServerError(result.error ?? 'An unexpected error occurred');
        setLoading(false);
      } else if (result && 'success' in result) {
        router.push(result.redirectTo || '/');
        router.refresh();
      }
    },
  });

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CardContent className='space-y-4'>
          {serverError && (
            <div className='p-3 text-sm text-rose-500 bg-rose-50 border border-rose-200 rounded-md'>
              {serverError}
            </div>
          )}
          <FieldGroup>
            <form.Field name='email'>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='name@example.com'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name='password'>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type='password'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='••••••••'
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
        <CardFooter className='flex flex-col space-y-4'>
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : type === 'register' ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </Button>
          <div className='text-sm text-center text-muted-foreground'>
            {type === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <Button
                  variant='link'
                  className='p-0 h-auto'
                  onClick={() => router.push('/register')}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Button
                  variant='link'
                  className='p-0 h-auto'
                  onClick={() => router.push('/login')}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
