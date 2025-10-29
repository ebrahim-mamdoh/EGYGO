"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// ✅ التحميل الديناميكي بدون SSR
const loadBootstrap = () => import("bootstrap/dist/js/bootstrap.bundle.min.js");

export default function BootstrapClient() {
  useEffect(() => {
    // تحميل Bootstrap JS فقط على المتصفح
    loadBootstrap();
  }, []);

  return null;
}
