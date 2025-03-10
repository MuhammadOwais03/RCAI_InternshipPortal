"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login screen after 3 seconds
    const timer = setTimeout(() => {
      router.push("/Login"); // Redirect to the login page
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 animate-bounce">
          Internify
        </h1>
        <p className="text-xl text-gray-200">Your Gateway to Career Growth</p>
        <div className="mt-8">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
}