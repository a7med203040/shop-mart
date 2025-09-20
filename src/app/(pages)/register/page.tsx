'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/\d/, 'Password must contain a number')
    .regex(/[@$!%*?&]/, 'Password must contain a special character'),
  rePassword: z.string(),
  phone: z
    .string()
    .min(7, 'Phone must be at least 7 digits')
    .max(20, 'Phone is too long'),
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ['rePassword'], // error shows on confirmPassword
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
  });

  async function onSubmit(values: RegisterFormData) {
    try {
      // Adjust endpoint to your real register API
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          rePassword :values.rePassword,
          phone: values.phone,
        }),
      });

      const payload = await res.json();

      if (!res.ok) {
        // Show server error; you can improve UX by showing in UI
        alert(payload?.message || 'Registration failed');
        return;
      }

      // Success — redirect or show message
      reset();
      // Example: go to login page
      router.push('/login');
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <label className="block">
          <span className="text-sm font-medium">Full name</span>
          <input
            {...register('name')}
            type="text"
            placeholder="Your full name"
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.name ? 'border-red-500 ring-red-100' : 'border-gray-200 ring-blue-50'}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </label>

        {/* Email */}
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.email ? 'border-red-500 ring-red-100' : 'border-gray-200 ring-blue-50'}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </label>

        {/* Password */}
        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.password ? 'border-red-500 ring-red-100' : 'border-gray-200 ring-blue-50'}`}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </label>

        {/* Confirm password */}
        <label className="block">
          <span className="text-sm font-medium"> repassword</span>
          <input
            {...register('rePassword')}
            type="password"
            placeholder="Repeat password"
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.rePassword ? 'border-red-500 ring-red-100' : 'border-gray-200 ring-blue-50'}`}
            aria-invalid={!!errors.rePassword}
            aria-describedby={errors.rePassword ? 'confirm-error' : undefined}
          />
          {errors.rePassword && <p id="confirm-error" className="mt-1 text-sm text-red-600">{errors.rePassword.message}</p>}
        </label>

        {/* Phone */}
        <label className="block">
          <span className="text-sm font-medium">Phone</span>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+20 10 1234 5678"
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${errors.phone ? 'border-red-500 ring-red-100' : 'border-gray-200 ring-blue-50'}`}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </label>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white px-4 py-2 font-medium hover:bg-black disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  );
}
