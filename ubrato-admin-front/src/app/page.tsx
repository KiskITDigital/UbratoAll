"use client";

import authStore from "@/store/authStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!authStore.isAuth) {
      router.replace("/login");
    } else {
      router.replace("/users");
    }
  });

  return null;
}

export default observer(Home);
