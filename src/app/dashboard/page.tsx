"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {session?.user?.name}!
        </h2>
        <p className="text-gray-600 mb-4">
          This is your personal dashboard for Stia. From here you can manage
          your properties, reservations, and more.
        </p>

        {/* Dashboard content will go here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Properties</h3>
            <p className="text-sm text-gray-600">Manage your properties</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Reservations</h3>
            <p className="text-sm text-gray-600">View upcoming reservations</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Maintenance</h3>
            <p className="text-sm text-gray-600">Track maintenance tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
