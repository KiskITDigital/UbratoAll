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
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { GetUsersResponse, User } from "@/api/types/users";
import { apiUsers } from "@/api/services/users";
import toast from "react-hot-toast";
import { Employee } from "../../../api/types/employee";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BaseTableRequest } from "@/api/types/base";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "first_name",
    label: "ФИО",
  },
  {
    key: "position",
    label: "Должность",
  },
  {
    key: "role",
    label: "Роль",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Телефон",
  },
  {
    key: "created_at",
    label: "Дата создания",
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState<string>("");
  const [tableProps, setTableProps] = useState<BaseTableRequest>();

  const users = useQuery({
    queryKey: ["users", tableProps],
    queryFn: async () => {
      const data = await apiUsers.getUsers({
        query: undefined,
        params: { ...tableProps },
        body: undefined,
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });

  const getNameLetter = useCallback((name: string) => {
    return name.slice(0, 1).toUpperCase();
  }, []);

  const renderCell = useCallback(
    (user: User | Employee, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof (User | Employee)];

      switch (columnKey) {
        case "first_name":
          return (
            <p>
              {user.last_name} {getNameLetter(user.first_name)}.{" "}
              {getNameLetter(user.middle_name)}.
            </p>
          );
        default:
          return <p>{cellValue?.toString()}</p>;
      }
    },
    [],
  );

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
  const pages = Math.ceil(users.data?.data.data.length || 1 / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.data?.data.data.slice(start, end);
  }, [page, users]);

  function handleSortChange(sortDescriptor: SortDescriptor) {
    console.log(sortDescriptor);
    if (sortDescriptor.column && sortDescriptor.direction)
      setTableProps({
        ...tableProps,
        sort: sortDescriptor.column.toString(),
        direction: sortDescriptor.direction === "ascending" ? "ASC" : "DESC",
      });
  }

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-semibold">Список сотрудников</h3>
      <div className="page-box flex flex-col gap-5 p-4">
        <div className="flex justify-between">
          {/* <Input
          isClearable
          className="w-full max-w-[300px]"
          placeholder="Поиск..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onFilterClear}
          onValueChange={onSearchChange}
        /> */}
          <div />
          <Link href="/users/create">
            <Button color="primary">Создать пользователя +</Button>
          </Link>
        </div>
        <Table
          selectionMode="multiple"
          aria-label="Users"
          classNames={tableClassNames}
          checkboxesProps={{
            classNames: {
              wrapper: "m-0",
            },
          }}
          onSortChange={(sortDescriptor) => handleSortChange(sortDescriptor)}
          onRowAction={(key) => router.push(`/users/${key}`)}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                // allowsSorting
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            // items={users.data?.data.data || []}
            items={items || []}
            emptyContent={"Нет пользователей"}
            loadingState={users.isLoading ? "loading" : "idle"}
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
            color="primary"
            total={pages}
            size="sm"
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
