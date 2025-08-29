// src/app/login/page.tsx
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">BatSignal Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}