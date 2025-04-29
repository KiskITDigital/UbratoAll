import {
  FC,
  // ReactNode,
  useEffect,
  useState,
} from 'react';
import Typesense from 'typesense';
import { fetchProduct } from '@/api';
import { Pagination, Select, SelectItem } from '@nextui-org/react';

import s from './styles.module.css';
import { getMe } from '@/api/getMe';
import { useTenderListState } from '@/store/tendersListStore';
import { generateTypesenseClient } from '@/components/FindExecutorComponents/generateSearchclient';
import { cn } from '@/utils/twMerge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  GlobalFilterTableState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

export interface TenderList {
  id: string;
  name: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  price: number;
  city: string;
}
interface Me {
  id: string;
}

interface myTenderToogle {
  myTender: boolean;
}

export const TenderListComp: FC<myTenderToogle> = ({ myTender }) => {
  const tenderListState = useTenderListState();

  const [allExecutorListLength, setAllExecutorListLength] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [defaultPerPage, setDefaultPerPage] = useState<number>(20);
  const [paginationPerPage, setPaginationPerPage] = useState(defaultPerPage);
  const [tenderList, setTenderList] = useState<TenderList[]>([]);
  const [sortingValue, setSortingValue] = useState('');
  const [meData, setMe] = useState<Me | null>(null);

  useEffect(() => {
    table.setPageSize(paginationPerPage);
  }, [paginationPerPage]);

  useEffect(() => {
    setPaginationPerPage(defaultPerPage);
  }, [defaultPerPage]);

  const paginationClassNames = {
    base: s.paginationBase,
    wrapper: s.wrapper,
    cursor: s.cursor,
    prev: s.prev,
    item: s.item,
    next: s.next,
  };

  const toDate = (date: string) => {
    const timestamp = date;
    const newDate = new Date(Date.parse(timestamp));
    newDate.setHours(0, 0, 0, 0);
    const formattedDate = newDate.toISOString().split('T')[0];
    return formattedDate;
  };

  const columns: ColumnDef<TenderList>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Название
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
    },
    {
      accessorKey: 'reception_end',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Дата приема заявок
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
      cell: ({ row }) => {
        return <p>{toDate(row.getValue('reception_end'))}</p>;
      },
    },
    {
      accessorKey: 'work_start',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Дата начала работ
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
      cell: ({ row }) => {
        return <p>{toDate(row.getValue('work_start'))}</p>;
      },
    },
    {
      accessorKey: 'work_end',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Дата окончания работ
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
      cell: ({ row }) => {
        return <p>{toDate(row.getValue('work_end'))}</p>;
      },
    },
    {
      accessorKey: 'price',
      size: 70,
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Цена
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
    },
  ];

  const fallbackData: Array<TenderList> = [];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<GlobalFilterTableState>();
  const table = useReactTable({
    data: tenderList || fallbackData,
    columns: columns,
    enableMultiSort: true,
    manualPagination: true,
    // pageCount: paginationTotal,
    // rowCount: paginationPerPage,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    // getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
  });

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const me = await getMe(token);
      if (me && 'id' in me) setMe(me.id as Me);
    })();

    const client = new Typesense.Client({
      apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
      nodes: [
        {
          host: `${import.meta.env.VITE_TYPESENSE_API_URI}`,
          port: import.meta.env.VITE_TYPESENSE_API_PORT,
          protocol: 'https',
          path: '',
        },
      ],
    });

    const filters = (() => {
      const filters = [];
      if (tenderListState.locationId)
        filters.push(`$city_index(id:=${tenderListState.locationId})`);
      if (tenderListState.objectTypesId.length)
        tenderListState.objectTypesId.forEach((object) =>
          filters.push(`$tender_object(object_type_id:=${object})`)
        );
      if (tenderListState.servicesTypesId.length)
        tenderListState.servicesTypesId.forEach((service) =>
          filters.push(`$tender_service(service_type_id:=${service})`)
        );
      if (tenderListState.fastFilterTexts)
        tenderListState.fastFilterTexts.forEach((filter) =>
          filters.push(
            `( name:=*${filter}* || name:=*${filter.toLocaleLowerCase()}* || name:=*${filter.toLocaleUpperCase()}*)`
          )
        );
      if (myTender) {
        filters.push(`( user_id:=${meData})`);
      }
      return filters.join(' && ');
    })();

    const searchParameters = {
      q: tenderListState.fastFilterTexts,
      query_by: 'name, description, wishes',
      per_page: paginationPerPage,
      page: paginationPage,
      filter_by: filters,
      sort_by: `${sorting.length ? `${sorting[0].id}:${sorting[0].desc ? 'desc' : 'asc'}` : ''}`,
    };

    (async () => {
      const hitsWithoutPagination = await generateTypesenseClient('tender_index', {
        filter_by: filters,
        per_page: 250,
      });
      setAllExecutorListLength(hitsWithoutPagination?.length || 0);
      setPaginationTotal(
        hitsWithoutPagination?.length
          ? Math.ceil(hitsWithoutPagination.length / paginationPerPage)
          : 0
      );
      // console.log(allExecutorListLength);
    })();

    client
      .collections('tender_index')
      .documents()
      .search(searchParameters)
      .then(async (response) => {
        // console.log(response.hits);

        const tenders = [] as TenderList[];
        setAllExecutorListLength(response.found);
        const promises = (response.hits || [])
          .map((res, index) => {
            const { id } = res.document as { id: string };
            if (!id) return null;
            return (async () => {
              const data = await fetchProduct(id);
              return {
                index,
                tenderData: {
                  id: data.id,
                  name: data.name,
                  reception_end: data.reception_end,
                  work_start: data.work_start,
                  work_end: data.work_end,
                  price: data.price,
                  user: data.user_id,
                  city: data.location,
                },
              } as { index: number; tenderData: TenderList };
            })();
          })
          .filter((promise) => promise !== null);

        const results = await Promise.all(promises);
        results
          .sort((a, b) => a!.index - b!.index)
          .forEach((result) => {
            // console.log(result?.tenderData);
            tenders.push(result!.tenderData);
          });
        setTenderList(tenders);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
    // console.log(allExecutorListLength);
  }, [
    paginationPage,
    paginationPerPage,
    tenderListState.fastFilterTexts,
    tenderListState.objectTypesId,
    tenderListState.locationId,
    tenderListState.servicesTypesId,
    meData,
    sortingValue,
    sorting,
    myTender,
  ]);

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="text-[24px]">Найдено тендеров: {allExecutorListLength}</div>
        <div className="w-fit flex items-center gap-2">
          <p className="whitespace-nowrap">Показывать на странице</p>
          <Select
            aria-label="Показывать на странице"
            defaultSelectedKeys={[20]}
            onChange={(e) => {
              console.log(Number(e.target.value));
              setDefaultPerPage(Number(e.target.value));
            }}
            onOpenChange={(e) => {
              console.log(e);
            }}
            classNames={{
              mainWrapper:
                'flex bg-red p-[5px] w-[70px] pt-[5px] border-solid border-accent border-[2px] rounded-[6px]',
              trigger: 'flex justify-between p-0',
              selectorIcon: 'z-10 relative data-[open]:rotate-180 duration-300 transition-all',
              popoverContent:
                'p-[5px] pt-[10px] ml-[-7px] mt-[-5px] w-[70px] border-solid border-accent border-[2px] border-t-0 rounded-b-[6px] bg-white',
            }}
          >
            <SelectItem key={20}>20</SelectItem>
            <SelectItem key={50}>50</SelectItem>
            <SelectItem key={100}>100</SelectItem>
          </Select>
        </div>
      </div>

      <div className="mt-[20px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
              <TableRow
                key={'h-group-' + headerGroupIndex}
                className="bg-slate-200/40 hover:bg-slate-200/40"
              >
                {headerGroup.headers.map((header, headerIndex) => {
                  return (
                    <TableHead
                      key={'h-' + headerGroupIndex + headerIndex}
                      style={{ width: header.getSize() }}
                      onClick={() => {
                        setSortingValue(header.column.id);
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={'row' + rowIndex}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(rowIndex % 2 !== 0 ? 'bg-slate-200/40' : '', 'cursor-pointer')}
                  onClick={() => navigate('/tender/' + row.original.id)}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell
                      key={'cell-' + rowIndex + cellIndex}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Ничего не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {allExecutorListLength > tenderList.length && (
        <div className="flex flex-col w-full pt-4 gap-2">
          {paginationPerPage < allExecutorListLength && (
            <button
              onClick={() => {
                setPaginationPage(1);
                setPaginationPerPage((prev) => prev + defaultPerPage);
              }}
              className={s.showMore}
            >
              Показать ещё
              <img src="/find-executor/arrow-down.svg" alt="" />
            </button>
          )}

          <div className="flex items-center justify-center">
            {/* <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button> */}
            {!!paginationTotal && (
              <Pagination
                classNames={paginationClassNames}
                total={paginationTotal}
                showControls
                initialPage={1}
                page={paginationPage}
                onChange={setPaginationPage}
              />
            )}
            {/* <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};
