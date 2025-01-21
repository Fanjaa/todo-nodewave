"use client";

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {

  return (
    <div className="flex-1 min-h-screen items-center p-4 bg-two-color">
      <div>
        <h1 className="text-[56px] font-poppins font-bold text-center mb-4 text-fontRegister">
          Register
        </h1>
        <p className="text-center font-roboto text-gray-500 mb-8">
          Let's Sign up first for enter into Square Website. Uh She Up!
        </p>
      </div>
      <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-loginForm overflow-hidden md:max-w-2xl">
        <div className="p-8">
        <RegisterForm />
        </div>
      </div>
    </div>
  );
}
