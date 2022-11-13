import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowSquareOut } from "phosphor-react";

import { GithubRepo } from "../entities/GithubRepo";

interface ReposTableProps {
  repos: GithubRepo[]
}

const columnHelper = createColumnHelper<GithubRepo>()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: () => <span>ID</span>
  }),
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('html_url', {
    cell: info => (
      <a
        className="hover:text-blue-500"
        href={info.getValue()}
        target="_blank"
      >
        {info.row.original.full_name}
      </a>
    ),
    header: () => <span>URL</span>
  })
]

export function ReposTable({ repos }: ReposTableProps) {
  const table = useReactTable({
    data: repos,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
      <table className="w-full table-auto border-collapse border border-slate-500 rounded">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="border border-slate-600 p-1 rounded"
                >
                  {!header.isPlaceholder && flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="border border-slate-600 rounded p-1 text-sm"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  )
}