import { Badge } from "@/components/catalyst/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/catalyst/table";

function Redacted({ isPrivate, children }) {
    return (
        <span
            className={
                isPrivate
                    ? "select-none text-gray-700 bg-gray-700 dark:text-slate-500 dark:bg-slate-500 px-3 py-0.5 rounded-lg"
                    : ""
            }
        >
            {children}
        </span>
    );
}

export default function EmailsTable({ tableData, className }) {
    const columnHeaders = [
        "Name",
        "Recipient Name",
        "Zodiac",
        "Time Sent",
        "Status",
    ];
    return (
        <Table dense striped className={className}>
            <TableHead>
                <TableRow>
                    {columnHeaders.map((name, id) => (
                        <TableHeader key={id}>{name}</TableHeader>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.map((row, id) => (
                    <TableRow key={id} className="dark:text-zinc-200">
                        <TableCell>
                            <Redacted isPrivate={row.private}>
                                {row.name}
                            </Redacted>
                        </TableCell>
                        <TableCell>
                            <Redacted isPrivate={row.private}>
                                {row?.target_name}
                            </Redacted>
                        </TableCell>
                        <TableCell>
                            <Redacted isPrivate={row.private}>
                                <span
                                    className={
                                        row?.target_zodiac === "Dragon"
                                            ? "text-red-500 font-bold"
                                            : ""
                                    }
                                >
                                    {row?.target_zodiac}
                                </span>
                            </Redacted>
                        </TableCell>
                        <TableCell className="dark:text-zinc-500">
                            <Redacted isPrivate={row.private}>
                                {row.timestamp}
                            </Redacted>
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
