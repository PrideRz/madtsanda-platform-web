"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createManagedUser, deleteManagedUser, resetManagedUserPassword, updateManagedUser } from "@/features/dashboard/profile/services";
import type { UserDTO } from "@/types/dto/user";

const roles: UserDTO["role"][] = ["teacher", "student", "administrator", "admin", "super_user"];

function roleLabel(role: UserDTO["role"]) {
  return {
    admin: "Admin",
    administrator: "Administrator",
    super_user: "Master",
    student: "Siswa",
    teacher: "Guru",
  }[role];
}

function roleClass(role: UserDTO["role"]) {
  return role === "super_user" ? "bg-red-600" : role === "administrator" ? "bg-amber-600" : role === "admin" ? "bg-blue-600" : role === "teacher" ? "bg-emerald-600" : "bg-indigo-600";
}

export function AccountManager({ initialUsers }: { initialUsers: UserDTO[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [pending, startTransition] = useTransition();
  const [passwords, setPasswords] = useState<Record<string, string>>({});
  const [newUsername, setNewUsername] = useState("");
  const [newRole, setNewRole] = useState<UserDTO["role"]>("teacher");
  const router = useRouter();

  function saveUser(user: UserDTO, payload: { role?: UserDTO["role"]; active?: boolean }) {
    startTransition(async () => {
      try {
        const response = await updateManagedUser(user.id, payload);
        if (!response || !("data" in response)) throw new Error("failed");
        setUsers((current) => current.map((item) => item.id === user.id ? { ...item, ...payload } : item));
        toast.success("Akun diperbarui.");
        router.refresh();
      } catch {
        toast.error("Perubahan akun gagal disimpan.");
      }
    });
  }

  function resetPassword(user: UserDTO) {
    const password = passwords[user.id]?.trim();
    if (!password || password.length < 6) {
      toast.error("Password baru minimal 6 karakter.");
      return;
    }
    startTransition(async () => {
      try {
        const response = await resetManagedUserPassword(user.id, password);
        if (!response || !("data" in response)) throw new Error("failed");
        setPasswords((current) => ({ ...current, [user.id]: "" }));
        toast.success("Password baru berhasil disimpan.");
      } catch {
        toast.error("Reset password gagal.");
      }
    });
  }

  function removeUser(user: UserDTO) {
    if (!window.confirm(`Hapus akun ${user.username}? Data profil akademik lama tetap harus dicadangkan terlebih dahulu.`)) return;
    startTransition(async () => {
      try {
        const response = await deleteManagedUser(user.id);
        if (!response || !("data" in response)) throw new Error("failed");
        setUsers((current) => current.filter((item) => item.id !== user.id));
        toast.success("Akun dihapus.");
      } catch {
        toast.error("Akun gagal dihapus.");
      }
    });
  }

  function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      try {
        const response = await createManagedUser({ username: newUsername.trim(), role: newRole });
        if (!response?.data?.user) throw new Error("failed");
        setUsers((current) => [...current, response.data.user]);
        setNewUsername("");
        toast.success(`Akun ${response.data.user.username} dibuat. Password awal sama dengan username.`);
      } catch {
        toast.error("Akun gagal dibuat. Pastikan username unik.");
      }
    });
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Kelola Akun</CardTitle>
        <p className="text-sm text-muted-foreground">Master dan Administrator dapat mengatur akun. Password lama tidak pernah ditampilkan.</p>
      </CardHeader>
      <CardContent>
        <form className="mb-5 grid gap-3 rounded-lg border bg-muted/20 p-4 sm:grid-cols-[1fr_1fr_auto]" onSubmit={createUser} aria-labelledby="new-account-title">
          <h2 id="new-account-title" className="sm:col-span-3 text-sm font-semibold">Tambah akun</h2>
          <div><label htmlFor="new-username" className="text-sm">Username</label><Input id="new-username" name="username" required value={newUsername} onChange={(event) => setNewUsername(event.target.value)} autoComplete="username" /></div>
          <div><label htmlFor="new-role" className="text-sm">Role</label><select id="new-role" name="role" className="min-h-10 w-full rounded-md border bg-background px-3" value={newRole} onChange={(event) => setNewRole(event.target.value as UserDTO["role"])}><option value="teacher">Guru</option><option value="student">Siswa</option><option value="administrator">Administrator</option><option value="admin">Admin</option></select></div>
          <Button type="submit" className="self-end min-h-10" disabled={pending}>Buat akun</Button>
        </form>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Daftar akun">
          <Table>
            <caption className="sr-only">Daftar akun pengguna</caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Pengguna</TableHead>
                <TableHead scope="col">Role</TableHead>
                <TableHead scope="col">Status</TableHead>
                <TableHead scope="col">Reset password</TableHead>
                <TableHead scope="col">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="min-w-52">
                    <div className="font-medium">{user.username}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    <select
                      aria-label={`Role ${user.username}`}
                      className="min-h-10 rounded-md border bg-background px-2 text-sm"
                      value={user.role}
                      disabled={user.role === "super_user"}
                      onChange={(event) => saveUser(user, { role: event.target.value as UserDTO["role"] })}
                    >
                      {roles.map((role) => <option key={role} value={role}>{roleLabel(role)}</option>)}
                    </select>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      className="min-h-10"
                      aria-pressed={user.active !== false}
                      onClick={() => saveUser(user, { active: user.active === false })}
                    >
                      <Badge className={user.active === false ? "bg-slate-500" : roleClass(user.role)}>
                        {user.active === false ? "Nonaktif" : "Aktif"}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell className="min-w-56">
                    <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); resetPassword(user); }}>
                      <label htmlFor={`password-${user.id}`} className="sr-only">Password baru {user.username}</label>
                      <Input
                        id={`password-${user.id}`}
                        type="password"
                        autoComplete="new-password"
                        minLength={6}
                        value={passwords[user.id] ?? ""}
                        onChange={(event) => setPasswords((current) => ({ ...current, [user.id]: event.target.value }))}
                        placeholder="Password baru"
                      />
                      <Button type="submit" variant="outline" disabled={pending}>Simpan</Button>
                    </form>
                  </TableCell>
                  <TableCell>
                    <Button type="button" variant="destructive" disabled={pending || user.role === "super_user"} onClick={() => removeUser(user)}>
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
