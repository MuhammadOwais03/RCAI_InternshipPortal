"use client";

import Navbar from "../components/navbar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
export default function Page() {

  const router = useRouter();
    const pathname = usePathname();
  
    useEffect(() => {
      console.log("Pathname:", pathname);
      if (pathname === "/Admin") {
        router.push("/Login"); // Redirect to the login page
      }
    }, [pathname, router]);
  
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <p className="text-center text-gray-500 mt-40">Welcome to the Admin Panel</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }