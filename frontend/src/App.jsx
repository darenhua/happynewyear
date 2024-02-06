import { useState, useEffect } from "react";
import PaginatedEmailsTable from "./components/PaginatedEmailsTable";
import EmailForm from "./components/EmailForm";
import Navbar from "./components/Navbar";
import Hero from "@/components/Hero";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";
import { Link } from "@/components/catalyst/link";

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
        <div className="min-h-screen ">
            <Navbar />
            <div className="mx-64">
                <Hero />
                <div id="about" className="scroll-mt-48 mt-24 mb-48">
                    <div className="flex gap-14 items-center">
                        <div className="w-1/2 flex justify-center">
                            <img
                                className="h-32 w-auto dark:invert"
                                src="logo.svg"
                                alt="Your Company"
                            />
                        </div>
                        <div className="w-1/2">
                            <Heading>About</Heading>
                            <Subheading>
                                Fill out the form in the dialog box below to
                                send an email to a friend. No emails or
                                sensitive data is stored. The email states that
                                you sent the mail, contains pretty lunar new
                                year images, and has a description of the
                                recipient&apos;s fortune based on their Zodiac
                                sign. The mockup next to this paragraph shows
                                what the email would look like.
                            </Subheading>

                            <Subheading>
                                This website is a fun project made by{" "}
                                <Link href="https://darenhua.netlify.app/">
                                    Daren Hua
                                </Link>{" "}
                                in the spirit of Chinese New Year. Made with
                                React, Flask, and{" "}
                                <Link
                                    href="https://resend.com/"
                                    target="_blank"
                                >
                                    resend
                                </Link>
                                .
                            </Subheading>
                        </div>
                    </div>
                </div>
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
