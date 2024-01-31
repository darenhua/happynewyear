import { Badge } from "@/components/catalyst/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/catalyst/table";

export default function EmailsTable({ tableData, className }) {
    const columnHeaders = ["Name", "Recipient", "Time Sent", "Status"];
    return (
        <Table striped className={className}>
            <TableHead>
                <TableRow>
                    {columnHeaders.map((name, id) => (
                        <TableHeader key={id}>{name}</TableHeader>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.map((row) => (
                    <TableRow
                        key={row.timestamp}
                        className="dark:text-zinc-200"
                    >
                        <TableCell className="font-medium">
                            <span
                                className={
                                    row.private
                                        ? "select-none text-gray-700 bg-gray-700 dark:text-slate-500 dark:bg-slate-500 px-3 py-0.5 rounded-lg"
                                        : ""
                                }
                            >
                                {row.name}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span
                                className={
                                    row.private
                                        ? "select-none text-gray-700 bg-gray-700 dark:text-slate-500 dark:bg-slate-500 px-3 py-0.5 rounded-lg"
                                        : ""
                                }
                            >
                                {row.target}
                            </span>
                        </TableCell>
                        <TableCell className="dark:text-zinc-500">
                            <span
                                className={
                                    row.private
                                        ? "select-none text-gray-700 bg-gray-700 dark:text-slate-500 dark:bg-slate-500 px-3 py-0.5 rounded-lg"
                                        : ""
                                }
                            >
                                {row.timestamp}
                            </span>
                        </TableCell>
                        <TableCell>
                            {row.sent ? (
                                <Badge color="green">Sent</Badge>
                            ) : (
                                <Badge color="red">Pending</Badge>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
