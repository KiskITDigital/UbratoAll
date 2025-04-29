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
import { Organization } from "@/api/types/organizations";
import { apiOrganizations } from "@/api/services/organizations";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

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

export default function ClientsPage() {
  const router = useRouter();
  // const [filterValue, setFilterValue] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const rowsPerPage = 5;

  const clients = useQuery({
    queryKey: ["clients", page],
    queryFn: async () => {
      const response = await apiOrganizations.getOrganizations({
        query: undefined,
        params: {
          page: page - 1,
          per_page: rowsPerPage,
        },
        body: undefined,
      });
      return response.data;
    },
  });

  const renderCell = useCallback((data: Organization, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Organization];

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
      default:
        return <p>{cellValue.toString()}</p>;
    }
  }, []);

  // const onSearchChange = useCallback((value?: string) => {
  //   if (value) {
  //     setFilterValue(value);
  //     setPage(1);
  //   } else {
  //     setFilterValue("");
  //   }
  // }, []);

  // const onFilterClear = useCallback(() => {
  //   setFilterValue("");
  //   setPage(1);
  // }, []);

  return (
    <>
      {clients.isFetched && (
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
            aria-label="Clients"
            classNames={tableClassNames}
            checkboxesProps={{
              classNames: {
                wrapper: "m-0",
              },
            }}
            onRowAction={(key) => router.push(`/clients/${key}`)}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={clients.data?.data.organizations}
              emptyContent={"Нет клиентов"}
            >
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
