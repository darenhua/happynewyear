import { Button } from "@/components/catalyst/button";
import { MoonIcon } from "@heroicons/react/16/solid";
import useDarkMode from "../hooks/useDarkMode";
import { Link } from "./catalyst/link";

export default function Navbar() {
    const { toggleDarkMode } = useDarkMode();

    return (
        <div className="bg-white sticky top-0 mb-10 dark:bg-black/75 dark:backdrop-blur-sm z-50 w-full shadow">
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex justify-between w-full px-2 lg:px-0">
                        <Link
                            href="/"
                            className="flex flex-shrink-0 items-center"
                        >
                            <img
                                className="h-8 w-auto dark:invert"
                                src="/src/assets/logo.svg"
                                alt="Your Company"
                            />
                        </Link>
                        <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                            <Link
                                href="#new-email-form"
                                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-black dark:text-gray-200 hover:border-gray-300 transition-colors hover:text-gray-800"
                            >
                                Send a new message
                            </Link>
                            <Link
                                href="#about"
                                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-black dark:text-gray-200 hover:border-gray-300 transition-colors hover:text-gray-800"
                            >
                                About
                            </Link>
                        </div>
                        <Button
                            className="self-center"
                            onClick={toggleDarkMode}
                        >
                            <MoonIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
