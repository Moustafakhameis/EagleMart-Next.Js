import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
