"use client";

import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Organization } from "@/api/types/organizations";
import { apiOrganizations } from "@/api/services/organizations";

export default function ClientPage({
  params,
}: {
  params: { clientId: number };
}) {
  const [client, setClient] = useState<Organization>();

  async function getData() {
    const response = await apiOrganizations.getOrganization({
      query: { organizationID: params.clientId },
      params: undefined,
      body: undefined,
    });
    setClient(response.data.data);
    console.log(response.data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <Link
        href="/clients"
        className="flex items-center gap-2 font-extrabold text-primary"
      >
        <MoveLeftIcon className="min-w-6" />
        <p>К списку клиентов</p>
      </Link>
      {client && (
        <>
          <div id="client-header" className="flex gap-10">
            <div className="flex flex-col gap-3">
              <Avatar alt="avatar" className="h-40 w-40" />
              <div className="flex flex-col gap-1">
                <Link
                  href={`/clients/requests`}
                  className="w-full"
                >
                  <Button color="primary" className="w-full font-bold">
                    Верификация
                  </Button>
                </Link>
                {/* <Button
                  variant="light"
                  className="w-full font-bold text-primary"
                >
                  Заблокировать
                </Button> */}
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <h3 className="text-xl font-bold">{client?.short_name}</h3>
              <div className="flex w-full gap-10">
                <div className="flex w-full min-w-[200px] flex-col gap-4">
                  <h4 className="text-lg font-bold">Данные компании</h4>
                  <div className="grid gap-x-5 gap-y-3 opacity-60 [grid-template-columns:auto_auto] [&>*:nth-child(odd)]:font-bold">
                    <p>Название</p>
                    <p>{client.full_name}</p>
                    <p>Роль</p>
                    <p>{client.is_contractor ? "Исполнитель" : "Заказчик"}</p>
                    <p>ИНН</p>
                    <p>{client.inn}</p>
                    {/* <p>Статус ФНС</p>
                    <p>{client.}</p> */}
                  </div>
                </div>
                {/* <div className="flex w-full min-w-[200px] flex-col gap-4">
                  <h4 className="text-lg font-bold">Контактное лицо</h4>
                  <div className="grid gap-x-5 gap-y-3 opacity-60 [grid-template-columns:auto_auto] *:truncate [&>*:nth-child(odd)]:font-bold">
                    <p>Фио</p>
                    <p>{client.contact}</p>
                    <p>Телефон</p>
                    <p>{client.phone}</p>
                    <p>Email</p>
                    <p>{client.email}</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div id="client-header" className="flex flex-col gap-5">
            <h4 className="text-lg font-bold">Описание компании</h4>
            <p className="text-opacity-60">{client.description}</p>
          </div> */}
        </>
      )}
    </div>
  );
}
