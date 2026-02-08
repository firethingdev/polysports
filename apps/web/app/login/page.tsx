import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <div className='container flex items-center justify-center min-h-[calc(100vh-200px)] py-12'>
      <AuthForm
        type='login'
        title='Welcome Back'
        description='Enter your credentials to access your account'
      />
    </div>
  );
}
