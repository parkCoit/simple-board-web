import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BoardPagination } from "@/components/common/BoardPagination";

import { useNavigate, useLocation } from "react-router-dom";
import { boardData } from "@/api";

export type Payment = {
  custom_id: string;
  time: string;
  author_id: string;
  title: string;
  author_nickname : string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "author_id",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          닉네임(이메일)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.original.author_nickname}({row.getValue("author_id")})
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "제목",
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "time",
    header: () => <div className="text-right">작성 시간</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("time")}</div>;
    },
  },
];

export function Board() {
  const [data, setData] = React.useState<Payment[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams: any = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get("page")) || 1;

  React.useEffect(() => {
    setCurrentPage(pageParam);

    boardData({ page: pageParam })
      .then((res) => {
        setData(res.data.data);
        setTotalPages(res.data.total_pages);
        console.log(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [pageParam]);

  const handleSearch = () => {
    navigate("./edit");
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

//   if (pageParam > totalPages) {
//     return (
//       <div className="w-full flex flex-col items-center justify-center py-10">
//         <h2 className="text-lg font-semibold">페이지가 없습니다.</h2>
//         <Button variant="secondary" onClick={() => navigate(`/?page=1`)}>
//           첫 페이지로 이동
//         </Button>
//       </div>
//     );
//   }
//   if (pageParam > totalPages && totalPages !== 0) {
//     return (
//       <div className="w-full flex flex-col items-center justify-center py-10">
//         <h2 className="text-lg font-semibold">페이지가 없습니다.</h2>
//         <Button variant="secondary" onClick={() => navigate(`/?page=1`)}>
//           첫 페이지로 이동
//         </Button>
//       </div>
//     );
//   }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 ">
        <Input
          placeholder="Filter Titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button className="ml-auto" onClick={handleSearch}>
          글쓰기
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => {
                    navigate(`/view/${row.original.custom_id}`);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <BoardPagination
          table={table}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
