"use client";

import { apiAuth } from "@/api/services/auth";
import authStore from "@/store/authStore";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const router = useRouter();

  async function checkAuth() {
    try {
      const response = await apiAuth.refresh();
      localStorage.setItem("accessToken", response.data.data.access_token);
      authStore.setAuth(true);
    } catch (error) {
      authStore.setAuth(false);
      router.push("/login");
      // if (isAxiosError(error))
      //   toast.error(error.response?.data);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (!authChecked) return null;
  return (
    <NextUIProvider>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
    </NextUIProvider>
  );
}
