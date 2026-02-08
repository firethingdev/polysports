import { AuthForm } from '@/components/auth-form';

export default function RegisterPage() {
  return (
    <div className='container flex items-center justify-center min-h-[calc(100vh-200px)] py-12'>
      <AuthForm
        type='register'
        title='Create an Account'
        description='Join PolySports today to start shopping'
      />
    </div>
  );
}
