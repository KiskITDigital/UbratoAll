import { tableClassNames } from "@/consts/table";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useState } from "react";

type Group = {
  id: string;
  purpose: string;
  members: number;
  date: string;
};

const mockGroups: Group[] = [
  {
    id: "1",
    purpose: "Development Team",
    members: 10,
    date: "2024-09-10",
  },
  {
    id: "2",
    purpose: "Marketing Team",
    members: 8,
    date: "2024-08-15",
  },
  {
    id: "3",
    purpose: "Sales Team",
    members: 15,
    date: "2024-07-20",
  },
  {
    id: "4",
    purpose: "HR Team",
    members: 5,
    date: "2024-06-30",
  },
  {
    id: "5",
    purpose: "Support Team",
    members: 12,
    date: "2024-05-25",
  },
];

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "purpose",
    label: "Назначение",
  },
  {
    key: "members",
    label: "Кол-во сотрудников",
  },
  {
    key: "date",
    label: "Дата создания",
  },
];

export default function GroupsTable() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);

  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-lg font-bold">Добавить сотрудника в группы</h3>
      <Table
        selectionMode="multiple"
        aria-label="Groups"
        classNames={tableClassNames}
        checkboxesProps={{
          classNames: {
            wrapper: "m-0",
          },
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={groups} emptyContent={"Нет групп"}>
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
