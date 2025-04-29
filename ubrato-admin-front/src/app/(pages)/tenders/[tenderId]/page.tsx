"use client";

import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Tender } from "@/api/types/tenders";
import { apiTenders } from "@/api/services/tenders";
import { getTimestampDatetime } from "@/helpers/formatters/timestamp";

export default function TenderPage({
  params,
}: {
  params: { tenderId: number };
}) {
  const [tender, setTender] = useState<Tender>();

  async function getData() {
    const response = await apiTenders.getTender({
      query: { tenderID: params.tenderId },
      params: undefined,
      body: undefined,
    });
    setTender(response.data.data);
    console.log(response.data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <Link href="/tenders" className="flex items-center gap-2">
        <MoveLeftIcon className="min-w-6" strokeWidth={1} />
        <p>К списку тендеров</p>
      </Link>
      {tender && (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex gap-5">
              <p className="text-text/50">Тендер №{tender.id}</p>
              {/* <p className="text-text/50">Статус: {tender.status}</p> */}
            </div>
            <h3 className="text-2xl font-semibold">{tender.name}</h3>
            <div className="flex w-full gap-5">
              <div className="flex w-full flex-col gap-3">
                <p className="text-xl font-medium">Прием откликов</p>
                <Divider className="h-[2px] w-full rounded-lg" />
                <div className="flex gap-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-text/50">Начало</p>
                    {getTimestampDatetime(tender.reception_start)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-text/50">Начало</p>
                    {getTimestampDatetime(tender.reception_end)}
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3">
                <p className="text-xl font-medium">Стоимость</p>
                <Divider className="h-[2px] w-full rounded-lg" />
                <p>{tender.price} ₽</p>
              </div>

              <div className="flex w-full flex-col gap-3">
                <p className="text-xl font-medium">Оказание услуг</p>
                <Divider className="h-[2px] w-full rounded-lg" />
                <div className="flex gap-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-text/50">Начало</p>
                    {getTimestampDatetime(tender.work_start)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-text/50">Начало</p>
                    {getTimestampDatetime(tender.work_end)}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid w-full grid-cols-[min-content_auto] gap-y-5 *:border-t *:border-border *:pt-5 *:even:pr-20">
              <p>Город:</p>
              <p>
                {tender.city.name}
                {tender.city.region?.name && `, ${tender.city.region?.name}`}
              </p>

              <p>Объект:</p>
              <div className="flex gap-3">
                {tender.objects.map((object) => object.name)}
              </div>

              <p>Услуги:</p>
              <div className="flex gap-3">
                {tender.services.map((service) => service.name)}
              </div>

              <p>Площадь:</p>
              <p>{tender.floor_space} кв. м.</p>

              <p>Описание:</p>
              <p>{tender.description}</p>

              <p>Пожелания:</p>
              <p>{tender.wishes}</p>

              {tender.attachments && tender.attachments.length > 0 && (
                <>
                  <p>Вложения:</p>
                  <p>{tender.attachments.map((attachment) => attachment)}</p>
                </>
              )}
            </div>
          </div>

          {/* <div className="flex gap-5 *:w-full">
            <Button variant="bordered" color="danger">
              Отклонить
            </Button>
            <Button variant="solid" color="primary">
              Отклонить
            </Button>
          </div> */}
        </div>
      )}
    </div>
  );
}
