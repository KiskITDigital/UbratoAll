"use client";

import { useEffect, useState } from "react";
import { FileIcon, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, Button } from "@nextui-org/react";
import { Verification } from "@/api/types/verifications";
import { apiVerifications } from "@/api/services/verifications";
import { Organization } from "@/api/types/organizations";
import toast from "react-hot-toast";

export default function VerifyClientPage({
  params,
}: {
  params: { requestId: number };
}) {
  const [verification, setVerification] = useState<Verification>();
  const [client, setClient] = useState<Organization>();

  async function getData() {
    const response = await apiVerifications.getVerification({
      query: { requestID: params.requestId },
      params: undefined,
      body: undefined,
    });
    if (response.data.data.object_type === "organization")
      setClient(response.data.data.object);
    setVerification(response.data.data);
    console.log(response.data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleDecline() {
    const loadingToast = toast.loading("Отклонение заявки...");
    try {
      const response = await apiVerifications.declineVerification({
        query: { requestID: params.requestId },
        params: undefined,
        body: undefined,
      });
      toast.dismiss(loadingToast);
      toast.success("Заявка отклонена!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Призошла ошибка при отклонении заявки.");
    }
  }

  async function handleApprove() {
    const loadingToast = toast.loading("Одобрение заявки...");
    try {
      const response = await apiVerifications.approveVerification({
        query: { requestID: params.requestId },
        params: undefined,
        body: undefined,
      });
      toast.dismiss(loadingToast);
      toast.success("Заявка одобрена!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Призошла ошибка при одобрении заявки.");
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <Link
        href="/clients/requests"
        className="flex items-center gap-2 font-extrabold text-primary"
      >
        <MoveLeftIcon className="min-w-6" />
        <p>К списку заявок</p>
      </Link>
      {client && (
        <>
          <div id="client-header" className="flex gap-10">
            <div className="flex flex-col gap-3">
              <Avatar alt="avatar" className="h-40 w-40" />
              {/* <div className="flex flex-col gap-1">
                <Link href={`/clients/requests`} className="w-full">
                  <Button color="primary" className="w-full font-bold">
                    Верификация
                  </Button>
                </Link>
                <Button
                  variant="light"
                  className="w-full font-bold text-primary"
                >
                  Заблокировать
                </Button>
              </div> */}
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

          <div className="flex gap-5">
            {verification?.attachments.map((attachment, attachmentIndex) => (
              <a href={attachment.url} target="_blank" download>
                <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-border px-5 py-3">
                  <FileIcon strokeWidth={1.5} />
                  {attachment.name}
                </div>
              </a>
            ))}
          </div>

          <div className="flex gap-5 *:w-full">
            <Button variant="bordered" color="danger" onClick={handleDecline}>
              Отклонить
            </Button>
            <Button variant="solid" color="primary" onClick={handleApprove}>
              Одобрить
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
