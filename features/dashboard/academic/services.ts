"use server";

import { request } from "@/lib/request";

export interface AcademicClass {
  id: string;
  name: string;
  grade: string;
  active: boolean;
  qrToken?: string;
  homeroomTeacherUserId?: string | null;
}

export interface Subject {
  id: string;
  name: string;
  code?: string | null;
}

export interface Schedule {
  id: string;
  classId: string;
  subjectId: string;
  teacherUserId: string;
  dayOfWeek: number;
  startPeriod: number;
  endPeriod: number;
  schoolYear: string;
}

export interface ClassAnnouncement {
  id: string;
  classId: string;
  teacherUserId: string;
  title: string;
  body: string;
  dueAt?: string | null;
  createdAt: string;
}

export interface TeacherChoice { id: string; username: string; }

async function safeRequest<T>(endpoint: string, options?: Parameters<typeof request<T>>[1]): Promise<T[]> {
  try {
    const response = await request<{ data: T[] }>(endpoint, options);
    return Array.isArray(response?.data) ? response.data : [];
  } catch {
    return [];
  }
}

export async function getAcademicClasses() { return safeRequest<AcademicClass>("/academic/classes"); }
export async function getSubjects() { return safeRequest<Subject>("/academic/subjects"); }
export async function getSchedules() { return safeRequest<Schedule>("/academic/schedules"); }
export async function getAnnouncements() { return safeRequest<ClassAnnouncement>("/academic/announcements"); }
export async function getJournals() { return safeRequest<Record<string, unknown>>("/academic/journals"); }
export async function getTeachers() {
  try {
    const response = await request<{ data: Array<{ user?: { id: string; username: string } }> }>("/teacher");
    return (response.data ?? []).flatMap((item) => item.user ? [{ id: item.user.id, username: item.user.username }] : []);
  } catch { return []; }
}

export async function createAcademicClass(payload: { name: string; grade: string }) {
  return request<{ data: AcademicClass }>("/academic/classes", { method: "POST", body: payload });
}

export async function createJournal(payload: {
  classId: string;
  subjectId: string;
  journalDate: string;
  startPeriod: number;
  endPeriod: number;
  qrToken: string;
  content: string;
}) {
  return request<{ data: Record<string, unknown> }>("/academic/journals", { method: "POST", body: payload });
}

export async function createSubject(payload: { name: string; code?: string }) {
  return request<{ data: Subject }>("/academic/subjects", { method: "POST", body: payload });
}

export async function createSchedule(payload: { classId: string; subjectId: string; teacherUserId: string; dayOfWeek: number; startPeriod: number; endPeriod: number; schoolYear: string }) {
  return request<{ data: Schedule }>("/academic/schedules", { method: "POST", body: payload });
}

export async function createAnnouncement(payload: { classId: string; title: string; body: string; dueAt?: string }) {
  return request<{ data: ClassAnnouncement }>("/academic/announcements", { method: "POST", body: payload });
}
