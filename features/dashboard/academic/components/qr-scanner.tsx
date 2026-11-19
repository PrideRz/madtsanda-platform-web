"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type ScanResult = { classId: string; token: string };
type Detector = { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>> };

function parsePayload(rawValue: string): ScanResult | null {
  try {
    const url = new URL(rawValue);
    const classId = url.pathname.split("/").filter(Boolean).pop();
    const token = url.searchParams.get("token");
    return classId && token ? { classId, token } : null;
  } catch {
    const match = rawValue.match(/class\/([^?]+)\?token=(.+)$/);
    return match ? { classId: match[1], token: match[2] } : null;
  }
}

export function QrScanner({ onDetected }: { onDetected: (result: ScanResult) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), []);

  async function stop() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setRunning(false);
  }

  async function start() {
    const BarcodeDetectorCtor = (window as Window & { BarcodeDetector?: new (options?: { formats: string[] }) => Detector }).BarcodeDetector;
    if (!BarcodeDetectorCtor) {
      setMessage("Browser ini belum mendukung pemindaian QR otomatis. Masukkan token secara manual.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      streamRef.current = stream;
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setRunning(true);
      setMessage("Arahkan kamera ke QR kelas.");
      const detector = new BarcodeDetectorCtor({ formats: ["qr_code"] });
      const scan = async () => {
        if (!streamRef.current || !videoRef.current) return;
        const result = (await detector.detect(videoRef.current))[0]?.rawValue;
        const parsed = result ? parsePayload(result) : null;
        if (parsed) {
          onDetected(parsed);
          await stop();
          return;
        }
        requestAnimationFrame(scan);
      };
      requestAnimationFrame(scan);
    } catch {
      setMessage("Kamera tidak dapat dibuka. Periksa izin kamera atau masukkan token secara manual.");
      await stop();
    }
  }

  return <div className="space-y-2 rounded-lg border p-3"><div className="flex flex-wrap items-center gap-2"><Button type="button" variant="outline" onClick={running ? stop : start}>{running ? "Hentikan kamera" : "Pindai QR kelas"}</Button><span className="text-xs text-muted-foreground">Izin kamera hanya diminta setelah tombol ditekan.</span></div><video ref={videoRef} muted playsInline className={running ? "aspect-video w-full rounded bg-black object-cover" : "hidden"} aria-label="Pratinjau kamera pemindai QR" />{message && <p className="text-xs text-muted-foreground" role="status">{message}</p>}</div>;
}
