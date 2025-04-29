"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { tableClassNames } from "@/consts/table";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  getKeyValue,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { apiTenders } from "@/api/services/tenders";
import { Tender } from "@/api/types/tenders";
import { getTimestampDate } from "../../../helpers/formatters/timestamp";
import { useQuery } from "@tanstack/react-query";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Название",
  },
  {
    key: "price",
    label: "Стоимость",
  },
  {
    key: "reception_end",
    label: "Прием откликов",
  },
  {
    key: "work_start",
    label: "Оказание услуг",
  },
  {
    key: "verification_status",
    label: "Статус",
  },
];

export default function TendersPage() {
  const router = useRouter();
  // const [filterValue, setFilterValue] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const rowsPerPage = 5;

  const tenders = useQuery({
    queryKey: ["tenders", page],
    queryFn: async () => {
      const response = await apiTenders.getTenders({
        query: undefined,
        params: {
          verified: true,
          page: page - 1,
          per_page: rowsPerPage,
        },
        body: undefined,
      });
      setPages(response.data.pagination.pages)
      return response.data;
    },
  });

  const renderCell = useCallback((data: Tender, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Tender];

    switch (columnKey) {
      case "verification_status":
        switch (data.verification_status) {
          case "approved":
            return <p>Подтвержден</p>;
          case "declined":
            return <p>Отклонён</p>;
          case "in_review":
            return <p>На рассмотрении</p>;
          case "unverified":
            return <p>Не подтвержден</p>;
        }
      case "reception_end":
        return (
          <p>
            {getTimestampDate(data.reception_start)} -{" "}
            {getTimestampDate(data.reception_end)}
          </p>
        );
      case "work_start":
        return (
          <p>
            {getTimestampDate(data.work_start)} -{" "}
            {getTimestampDate(data.work_end)}
          </p>
        );
      default:
        return <p>{cellValue?.toString()}</p>;
    }
  }, []);

  return (
    <>
      {tenders.isFetched && (
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-bold">Тендер</h2>
          {/* <div className="flex justify-between">
        <Input
          isClearable
          className="w-full max-w-[300px]"
          placeholder="Поиск..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onFilterClear}
          onValueChange={onSearchChange}
        />
      </div> */}
          <Table
            selectionMode="multiple"
            aria-label="Tenders"
            classNames={tableClassNames}
            checkboxesProps={{
              classNames: {
                wrapper: "m-0",
              },
            }}
            onRowAction={(key) => router.push(`/tenders/${key}`)}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={tenders.data?.data} emptyContent={"Нет тендеров"}>
              {(item) => (
                <TableRow key={item.id} className="cursor-pointer">
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex w-full justify-center">
            <Pagination
              showControls
              showShadow
              page={page}
              total={pages}
              size="sm"
              onChange={(page) => setPage(page)}
            />
          </div>
        </div>
      )}
    </>
  );
}
