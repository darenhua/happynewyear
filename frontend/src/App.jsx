import { useState, useEffect } from "react";
import PaginatedEmailsTable from "./components/PaginatedEmailsTable";
import EmailForm from "./components/EmailForm";
import Navbar from "./components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";

export default function App() {
    const [tableData, setTableData] = useState([]);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const getEmails = async () => {
            const endpoint = `${import.meta.env.VITE_API_URL}/history`;

            try {
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(
                        `Server responded with ${response.status}: ${errorText}`
                    );
                }

                const data = await response.json();
                setTableData(data);
            } catch (error) {
                if (error.response) {
                    console.error(`Response error: ${error.message}`);
                } else {
                    console.error(`Network or other error: ${error.message}`);
                }
                throw error;
            }
        };

        getEmails();
    }, [pending]);
    console.log(tableData);

    const handlePending = (bool) => {
        setPending(bool);
    };

    const recordCount = tableData.length;

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="mx-64 -xl:mx-32 -sm:mx-16 -md:mx-20">
                <Hero />
                <About />
                <div className="mb-32">
                    <Heading>Form</Heading>
                    <Subheading>
                        Click the &quot;New email&quot; button to spread the
                        luck.
                    </Subheading>
                    <EmailForm handlePending={handlePending} />
                </div>
                <div className="">
                    <Heading>Table</Heading>
                    <Subheading>
                        We&apos;ve sent{" "}
                        <span className="font-extrabold text-xl text-red-500">
                            {recordCount}
                        </span>{" "}
                        Year of the Dragon emails to date.
                    </Subheading>
                    <PaginatedEmailsTable
                        tableData={tableData}
                        recordCount={recordCount}
                    />
                </div>
            </div>
        </div>
    );
}
