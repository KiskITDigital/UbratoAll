"use client";

import authStore from "@/store/authStore";
import { observer } from "mobx-react-lite";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = authStore.isAuth;
  if (!isAuth) return null;

  return <>{children}</>;
}

export default observer(ProtectedRoute);
