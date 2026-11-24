import React, { useState } from "react";
import { AuthLayout } from "./layout";
import { authApi } from "../../service/auth";
import { useNavigate } from "react-router";

export function LoginPage() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi({
        username,
        password,
        expiersInMins: 30,
      });
      localStorage.setItem("token", res.accessToken);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Authentication Failed",
      );
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      {/* //* Mobile UI */}
      <div className="lg:hidden w-full max-w-md px-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to continue</p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-2xl">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm text-slate-200">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="username"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm text-slate-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="**********"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full cursor-pointer rounded-lg bg-yellow-400 px-4 py-3 font-bold text-slate-950 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>

      {/* //* Desktop UI */}

      {/* Desktop UI */}
      <div className="hidden lg:block w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to continue</p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username-desktop"
                className="text-sm text-slate-200"
              >
                Username
              </label>

              <input
                id="username-desktop"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="username"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password-desktop"
                className="text-sm text-slate-200"
              >
                Password
              </label>

              <input
                id="password-desktop"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="**********"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-lg bg-yellow-400 px-4 py-3 font-bold text-slate-950 hover:bg-yellow-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
