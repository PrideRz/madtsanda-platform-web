"use client";

import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { lookupManagedUser, resetManagedUserPassword } from "@/features/dashboard/profile/services";

export function PasswordResetForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [target, setTarget] = useState<{ id: string; username: string; role: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function findUser(event: FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      try {
        const response = await lookupManagedUser(username.trim());
        if (!response?.data) {
          setTarget(null);
          toast.error("Akun tidak ditemukan.");
          return;
        }
        setTarget(response.data);
      } catch {
        setTarget(null);
        toast.error("Akun tidak ditemukan atau Anda tidak memiliki akses.");
      }
    });
  }

  function savePassword(event: FormEvent) {
    event.preventDefault();
    if (!target || password.length < 6) {
      toast.error("Pilih akun dan gunakan password minimal 6 karakter.");
      return;
    }
    startTransition(async () => {
      try {
        await resetManagedUserPassword(target.id, password);
        setPassword("");
        toast.success(`Password ${target.username} berhasil diatur ulang.`);
      } catch {
        toast.error("Reset password gagal.");
      }
    });
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Reset Password Akun</CardTitle>
        <p className="text-sm text-muted-foreground">Cari username, lalu tetapkan password baru secara langsung kepada pengguna.</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <form onSubmit={findUser} className="space-y-2" aria-labelledby="find-account-title">
          <h2 id="find-account-title" className="text-sm font-medium">Cari akun</h2>
          <label htmlFor="reset-username" className="text-sm">Username</label>
          <div className="flex gap-2">
            <Input id="reset-username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
            <Button type="submit" disabled={pending}>Cari</Button>
          </div>
        </form>
        {target && (
          <form onSubmit={savePassword} className="space-y-2 border-t pt-4" aria-labelledby="set-password-title">
            <h2 id="set-password-title" className="text-sm font-medium">Akun ditemukan: {target.username} ({target.role})</h2>
            <label htmlFor="reset-password" className="text-sm">Password baru</label>
            <Input id="reset-password" name="password" type="password" autoComplete="new-password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />
            <Button type="submit" disabled={pending}>Simpan password baru</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
