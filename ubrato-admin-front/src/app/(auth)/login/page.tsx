"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import authStore from "@/store/authStore";
import { apiAuth } from "@/api/services/auth";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { Button, Input } from "@nextui-org/react";

const Page = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = async () => {
    if (login && password)
      apiAuth
        .signin({
          query: undefined,
          params: undefined,
          body: { email: login, password },
        })
        .then((response) => {
          localStorage.setItem(
            "accessToken",
            response.data.data?.access_token,
          );
          authStore.setAuth(true);
          router.replace("/users");
        })
        .catch((error) => {
          if (isAxiosError(error)) {
            if (error.response?.data) {
              toast.error(error.response?.data.errors[0].detail);
            } else {
              toast.error(error.message);
            }
          }
        });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[url('/banner/login-bg.svg')] bg-cover bg-center bg-no-repeat md:pl-80">
      <div className="mx-5 flex w-full max-w-[350px] flex-col gap-10">
        <img className="h-[25px]" src="/logo/ubrato.svg" />
        <form action={handleLogin} className="flex flex-col gap-5">
          <Input
            placeholder="Логин"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Пароль"
              className="text-sm"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            <Link
              href="/recovery"
              className="w-fit self-end text-sm text-primary"
            >
              Забыли пароль?
            </Link>
          </div>
          <Button type="submit" className="bg-primary text-base text-white">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
