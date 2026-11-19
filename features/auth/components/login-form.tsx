"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/types/dto/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { handleLogin } from "../actions/login";
import { toast } from "sonner";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const result = await handleLogin(data);

    // Cek apakah ada error dari server
    if (result && result.data && result.data.code) {
      const errorMessage =
        result.data.message || "Login gagal. Silakan coba lagi.";

      // Tampilkan toast error
      toast.error(errorMessage);

      // Set error di form (react-hook-form)
      form.setError("password", {
        type: "server",
        message: errorMessage,
      });

      // Atau kalau mau pakai root error:
      // form.setError("root", { type: "server", message: errorMessage })
    }

    // Kalau sukses → handleLogin sudah melakukan redirect, jadi baris ini tidak akan dijalankan
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onChange",
    mode: "onSubmit",
    resetOptions: {
      keepErrors: true,
      keepValues: true,
    },
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Input Username */}
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <FieldLabel
                htmlFor={field.name}
                className="text-zinc-700 dark:text-zinc-300"
              >
                Username
              </FieldLabel>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Input
                {...field}
                id={field.name}
                type="text"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Masukkan username"
                className={`h-10 rounded-xl border-zinc-200 bg-white/70 text-sm focus-visible:border-emerald-400 dark:border-zinc-700 dark:bg-zinc-800/70 ${
                  fieldState.invalid
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </motion.div>
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      {/* Input Password */}
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <FieldLabel
                htmlFor={field.name}
                className="text-zinc-700 dark:text-zinc-300"
              >
                Kata Sandi
              </FieldLabel>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="relative"
            >
              <Input
                {...field}
                id={field.name}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Masukkan kata sandi"
                className={`font-mono h-10 rounded-xl border-zinc-200 bg-white/70 pr-10 text-sm focus-visible:border-emerald-400 dark:border-zinc-700 dark:bg-zinc-800/70 ${
                  fieldState.invalid
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </motion.div>
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <motion.div
        initial={{ opacity: 0, y: 10, rotate: 10 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 1.6 }}
      >
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="group mt-1 h-11 w-full rounded-xl bg-emerald-500 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all active:scale-[0.98]"
        >
          {form.formState.isSubmitting ? (
            "Memproses..."
          ) : (
            <span className="flex items-center gap-2">
              <LogIn /> Login
            </span>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
