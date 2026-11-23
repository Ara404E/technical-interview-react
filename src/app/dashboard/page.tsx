import { useEffect, useState } from "react";
import { DashboardLayout } from "../layout";
import type { AuthResponse } from "../../service/auth/types";
import { getMeApi } from "../../service/auth";

export function DashboardPage() {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const data = await getMeApi();
      setUser(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch getMe",
      );
    }
    setLoading(false);
  };
  useEffect(() => {
    getMe();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="mb-4 text-xl font-bold text-white lg:mb-6 lg:text-3xl">
        Dashboard
      </h1>

      {loading && <p className="text-slate-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {user && (
        <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4 text-center lg:max-w-md lg:flex-row lg:gap-5 lg:p-6 lg:text-left">
          <img
            src={user.image}
            alt={user.username}
            className="h-20 w-20 rounded-full bg-slate-700 lg:h-24 lg:w-24"
          />
          <div className="min-w-0">
            <p className="text-lg font-semibold text-white lg:text-xl">
              {user.firstName} {user.lastName}
            </p>
            <p className="break-all text-sm text-slate-400 lg:text-base">
              {user.email}
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
