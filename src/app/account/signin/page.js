'use client'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthForm } from "@/components/ui/auth-form";
// import { useAuth } from "@/lib/firebase/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignIn() {
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex my-auto flex-col items-center justify-center">
      <AuthForm
        title="Welcome back"
        description="Enter your email and password below"
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={false}
        register={register}
        errors={errors}
      />
    </div>
  );
}