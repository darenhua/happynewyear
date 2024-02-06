import EmailsTable from "./EmailsTable";
import { useState, useEffect } from "react";
import {
    Pagination,
    PaginationGap,
    PaginationList,
    PaginationNext,
    PaginationPage,
    PaginationPrevious,
} from "@/components/catalyst/pagination";
import Subheading from "@/components/Subheading";

export default function PaginatedEmailsTable({ tableData, recordCount }) {
    const [currentPageNum, setCurrentPageNum] = useState(0);

    const pageSize = 10;
    const numPages = Math.ceil(tableData.length / pageSize);
    const lastPage = numPages - 1;

    const setPaginationData = () => {
        const start = currentPageNum * pageSize;
        const end = (currentPageNum + 1) * pageSize;
        return tableData.slice(start, end);
    };

    const setPaginationRange = () => {
        const range = [];
        if (numPages <= 6) {
            for (let i = 1; i <= numPages; i++) {
                range.push(i);
            }
        } else {
            // Always include the first page
            range.push(1);

            // Determine the start and end range based on current page
            let start = Math.max(2, currentPageNum - 1);
            let end = Math.min(numPages - 1, currentPageNum + 1);

            // Adjust start and end if current page is near the beginning or end
            if (currentPageNum <= 3) {
                end = 3;
            } else if (currentPageNum >= numPages - 2) {
                start = numPages - 2;
            }

            // Include ellipsis if there's a gap between start and the second page
            if (start > 2) {
                range.push("...");
            }

            // Add page numbers in the determined range
            for (let i = start; i <= end; i++) {
                range.push(i);
            }

            // Include ellipsis if there's a gap between end and the second-last page
            if (end < numPages - 1) {
                range.push("...");
            }

            // Always include the last page
            range.push(numPages);
        }
        return range;
    };

    const currentPageData = setPaginationData();
    const currentPageRange = setPaginationRange();

    if (recordCount === 0) {
        return (
            <div className="flex flex-col items-center w-full min-h-[200px] relative">
                <Subheading>
                    Something went wrong, please try again later.
                </Subheading>
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center w-full min-h-[700px] relative">
            <EmailsTable tableData={currentPageData} className="w-full" />
            <Pagination className="absolute bottom-0 mb-6">
                <PaginationPrevious
                    handleClick={() => {
                        setCurrentPageNum((prev) => prev - 1);
                    }}
                    disabled={currentPageNum === 0}
                />
                <PaginationList>
                    {currentPageRange.map((pageNum, id) => {
                        if (pageNum === "...") {
                            return <PaginationGap key={id} />;
                        }
                        return (
                            <PaginationPage
                                handleClick={() => {
                                    setCurrentPageNum(pageNum - 1);
                                }}
                                current={currentPageNum === pageNum - 1}
                                key={id}
                            >
                                {pageNum}
                            </PaginationPage>
                        );
                    })}
                </PaginationList>
                <PaginationNext
                    handleClick={() => {
                        setCurrentPageNum((prev) => prev + 1);
                    }}
                    disabled={currentPageNum === lastPage}
                />
            </Pagination>
        </div>
    );
}
