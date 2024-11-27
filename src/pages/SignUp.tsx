import { AuthForm } from '@/components/auth/AuthForm';

export default function SignUp() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <AuthForm mode="signup" />
    </div>
  );
} 