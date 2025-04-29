"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { tableClassNames } from "@/consts/table";
import { useRouter } from "next/navigation";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { apiTenders } from "@/api/services/tenders";
import toast from "react-hot-toast";
import { Verification } from "@/api/types/verifications";
import { getTimestampDate } from "@/helpers/formatters/timestamp";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "status",
    label: "Статус",
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
];

export default function TendersRequestsPage() {
  const [data, setData] = useState<Verification[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  async function getData() {
    try {
      const response = await apiTenders.getVerifications({
        query: undefined,
        params: {},
        body: undefined,
      });
      setData(response.data.data);
    } catch (error) {
      toast.error("Произошла ошибка при получении списка тендеров");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const renderCell = useCallback((data: Verification, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Verification];

    switch (columnKey) {
      case "name":
        if (data.object_type === "tender") return <p>{data.object.name}</p>;
      case "price":
        if (data.object_type === "tender") return <p>{data.object.price}</p>;
      case "reception_end":
        if (data.object_type === "tender")
          return (
            <p>
              {getTimestampDate(data.object.reception_start)} -{" "}
              {getTimestampDate(data.object.reception_end)}
            </p>
          );
      case "work_start":
        if (data.object_type === "tender")
          return (
            <p>
              {getTimestampDate(data.object.work_start)} -{" "}
              {getTimestampDate(data.object.work_end)}
            </p>
          );
      case "verification_status":
        if (data.object_type === "tender") return <p>{data.object?.name}</p>;
      case "status":
        switch (data.status) {
          case "approved":
            return <p>Подтвержден</p>;
          case "declined":
            return <p>Отклонён</p>;
          case "in_review":
            return <p>На рассмотрении</p>;
          case "unverified":
            return <p>Не подтвержден</p>;
        }
      default:
        return <p>{cellValue?.toString()}</p>;
    }
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(data.length || 1 / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-bold">Тендерные заявки</h2>
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
        aria-label="TendersRequests"
        classNames={tableClassNames}
        checkboxesProps={{
          classNames: {
            wrapper: "m-0",
          },
        }}
        onRowAction={(key) => router.push(`/tenders/requests/${key}`)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent={"Нет заявок"}>
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
  );
}
