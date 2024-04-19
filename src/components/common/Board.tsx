
import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BoardPagination } from "@/components/common/BoardPagination"

import { useNavigate } from "react-router-dom"
import { boardData } from "@/api"

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     time: 316,
//     author_id: "success",
//     title: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     time: 242,
//     author_id: "success",
//     title: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     time: 837,
//     author_id: "processing",
//     title: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     time: 874,
//     author_id: "success",
//     title: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     time: 721,
//     author_id: "failed",
//     title: "carmella@hotmail.com",
//   },
//   {
//     id: "derv1ws0",
//     time: 837,
//     author_id: "processing",
//     title: "Monserrat44@gmail.com",
//   },
//   {
//     id: "m5gr84i9",
//     time: 316,
//     author_id: "success",
//     title: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     time: 242,
//     author_id: "success",
//     title: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     time: 837,
//     author_id: "processing",
//     title: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     time: 874,
//     author_id: "success",
//     title: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     time: 721,
//     author_id: "failed",
//     title: "carmella@hotmail.com",
//   },
//   {
//     id: "derv1ws0",
//     time: 837,
//     author_id: "processing",
//     title: "Monserrat44@gmail.com",
//   },
//   {
//     id: "m5gr84i9",
//     time: 316,
//     author_id: "success",
//     title: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     time: 242,
//     author_id: "success",
//     title: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     time: 837,
//     author_id: "processing",
//     title: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     time: 874,
//     author_id: "success",
//     title: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     time: 721,
//     author_id: "failed",
//     title: "carmella@hotmail.com",
//   },
//   {
//     id: "derv1ws0",
//     time: 837,
//     author_id: "processing",
//     title: "Monserrat44@gmail.com",
//   },
// ]

export type Payment = {
  custom_id: string
  time: { date: string; time: string }; 
  author_id: string
  title: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "author_id",
    header: ({ column }) => {
        return (
          <Button className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("author_id")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "title",
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "time",
    header: () => <div className="text-right">time</div>,
    cell: ({ row }) => {
        const timeData = row.getValue<{ date: string; time: string }>("time");

        return <div className="text-right">{`${timeData.date} ${timeData.time}`}</div>;

    },
  }
]

export function Board() {
  const [data, setData] = React.useState<Payment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const navigate = useNavigate()

  React.useEffect(() => {
    boardData()
    .then((res) => {
        let resData = [...res.data].reverse()
        setData(resData)
    })
    .catch((err) => {
        alert(err)
    })
   
}, []); 

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
  })

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

        <Button className="ml-auto" onClick={() => {navigate('./edit')}}>글쓰기</Button>

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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                onClick={() => {navigate(`/view/${row.original.custom_id}`)}}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <BoardPagination table={table}/>
      </div>
    </div>
  )
}