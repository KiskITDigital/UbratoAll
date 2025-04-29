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
import { apiOrganizations } from "@/api/services/organizations";
import toast from "react-hot-toast";
import { Verification } from "@/api/types/verifications";

const columns = [
  {
    key: "inn",
    label: "ИНН",
  },
  {
    key: "short_name",
    label: "Название организации",
  },
  {
    key: "verification_status",
    label: "Верификация",
  },
];

export default function ClientsVerifyPage() {
  const [data, setData] = useState<Verification[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  async function getData() {
    try {
      const response = await apiOrganizations.getVerifications({
        query: undefined,
        params: {},
        body: undefined,
      });
      setData(response.data.data);
    } catch (error) {
      toast.error("Произошла ошибка при получении списка клиентов");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const renderCell = useCallback((data: Verification, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Verification];

    switch (columnKey) {
      case "verification_status":
        switch (data.status) {
          case "approved":
            return <>Подтвержден</>;
          case "declined":
            return <>Отклонён</>;
          case "in_review":
            return <>На рассмотрении</>;
          case "unverified":
            return <>Не подтвержден</>;
        }
      case "inn":
        if (data.object_type === "organization") return <>{data.object.inn}</>;
      case "short_name":
        if (data.object_type === "organization")
          return <>{data.object.short_name}</>;
      default:
        return <p>{cellValue?.toString()}</p>;
    }
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onFilterClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(data.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const router = useRouter();

  return (
    <>
      <div className="page-box flex flex-col gap-5 p-4">
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
          aria-label="ClientsRequests"
          classNames={tableClassNames}
          checkboxesProps={{
            classNames: {
              wrapper: "m-0",
            },
          }}
          onRowAction={(key) => router.push(`/clients/requests/${key}`)}
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
    </>
  );
}
