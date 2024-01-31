import { useState, useEffect } from "react";
import PaginatedEmailsTable from "./components/PaginatedEmailsTable";
import EmailForm from "./components/EmailForm";
import Navbar from "./components/Navbar";
import { Button } from "@/components/catalyst/button";

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

    const handlePending = (bool) => {
        setPending(bool);
    };

    return (
        <div className="min-h-screen ">
            <Navbar />
            <div className="mx-64">
                <div className="min-h-screen">
                    <div className="flex gap-14 items-center">
                        <div className="max-w-xl">
                            <h1 className="text-slate-900 dark:text-white mt-20 max-w-[36rem] text-3xl font-extrabold tracking-tight  sm:text-7xl xl:max-w-[43.5rem]">
                                Tell your friends{" "}
                                <span>Happy Year of the Dragon</span>
                            </h1>
                            <p className="mt-8 text-md text-slate-700 dark:text-slate-300">
                                Celebrate the lunar new year by sending your
                                loved ones a lucky email!
                            </p>
                            <Button className="my-8" outline>
                                <a href="#new-email-form">
                                    Send an email right now
                                </a>
                            </Button>
                        </div>
                        <img
                            className="h-32 w-auto dark:invert"
                            src="/src/assets/logo.svg"
                            alt="Your Company"
                        />
                    </div>
                </div>
                <EmailForm handlePending={handlePending} />
                <PaginatedEmailsTable tableData={tableData} />
            </div>
        </div>
    );
}
